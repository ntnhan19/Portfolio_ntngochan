## Bối cảnh

Smart Media Analytics (SMA) là hệ thống quản lý tài sản truyền thông (Media Asset Management) tích hợp AI. Dự án giải quyết bài toán tốn thời gian khi phải tìm kiếm thủ công trong thư viện video khổng lồ bằng cách cho phép người dùng tìm kiếm ngữ nghĩa (Semantic Search) bằng ngôn ngữ tự nhiên, đồng thời trả về kết quả chính xác đến từng giây của phân cảnh.

## Tính năng chính

- **Tìm kiếm ngữ nghĩa (Semantic Search):** Tìm kiếm nội dung video/hình ảnh bằng ngôn ngữ tự nhiên (ví dụ: "cảnh hoàng hôn trên biển").
- **Seek theo Timestamp:** Kết quả tìm kiếm liên kết trực tiếp đến đúng giây xảy ra phân cảnh trong video.
- **Nhận diện phân cảnh tự động (Scene Detection):** Sử dụng PySceneDetect để cắt video thành các đoạn có ý nghĩa trước khi index.
- **Phiên mã âm thanh (Audio Transcription):** Trích xuất hội thoại từ audio thông qua mô hình AI Whisper.
- **Cập nhật thời gian thực:** Dashboard tự động phản ánh trạng thái tiến trình xử lý pipeline của từng video nhờ WebSocket.

## Đóng góp của tôi

- **Thiết kế** kiến trúc AI Worker phân tách hoàn toàn khỏi Backend API để cô lập các tác vụ xử lý nặng, tránh gây nghẽn luồng (blocking).
- **Triển khai** AI pipeline lên AWS ECS Fargate với cơ chế gọi theo yêu cầu (on-demand), giúp tự động mở rộng và tiết kiệm chi phí.
- **Thiết lập** AWS Step Functions và Amazon EventBridge để điều phối luồng xử lý AI bất đồng bộ (Asynchronous processing).
- **Xây dựng** tích hợp WebSocket trên Backend FastAPI để báo cáo tiến trình xử lý media thời gian thực cho Frontend.
- **Cấu hình** luồng CI/CD qua GitHub Actions để tự động kiểm thử, đóng gói Docker và deploy lên môi trường Cloud.
- **Viết** bộ Unit Test toàn diện (Pytest) cho các luồng Ingest và Search APIs.

## Kiến trúc

Hệ thống sử dụng kiến trúc Hướng sự kiện (Event-driven) phân tán:
- **Client**: Ứng dụng React 19 SPA quản lý giao diện (Vite, Tailwind CSS).
- **Backend API**: Node trung tâm bằng FastAPI (Python) quản lý định tuyến, tương tác cơ sở dữ liệu và WebSocket.
- **AI Worker**: Tác vụ độc lập trên AWS ECS Fargate chứa mô hình Whisper và Computer Vision (Ollama).
- **Database**: PostgreSQL (qua `pgvector` extension) lưu trữ vector nhúng (embeddings) và metadata.
- **Storage**: Amazon S3 lưu trữ các tệp media gốc và siêu dữ liệu.

## Thách thức Kỹ thuật

**Xử lý Video dung lượng lớn không gây nghẽn API (Non-blocking AI Pipeline):**
- **Bối cảnh:** Nhận diện phân cảnh, trích xuất audio và chạy mô hình AI trên video rất tốn tài nguyên. Nếu xử lý đồng bộ trên API Server sẽ dẫn đến timeout và sập hệ thống.
- **Giải pháp:** Tách biệt AI Pipeline thành một Worker độc lập. Backend API chỉ làm nhiệm vụ nhận file, lưu vào S3, lưu metadata tạm thời và gửi sự kiện (Event) kích hoạt Worker.
- **Thách thức phát sinh:** Quản lý hạ tầng để worker tự động mở rộng (scale) khi có nhiều video tải lên nhưng không tốn chi phí khi hệ thống nhàn rỗi.
- **Cách khắc phục:** Triển khai Worker lên AWS ECS Fargate dưới dạng các tác vụ (tasks) On-demand. Hệ thống sẽ tự động cấp phát tài nguyên khi có sự kiện từ EventBridge và tự tắt khi xử lý xong.

## Quyết định Kỹ thuật

**Cập nhật tiến trình thời gian thực (Real-time Progress Updates):**
- **Vấn đề:** Quá trình phân tích video kéo dài nhiều phút, người dùng cần biết chính xác tiến trình hiện tại (Đang tải lên, Cắt cảnh, Phiên mã, Lập chỉ mục).
- **Quyết định:** Sử dụng WebSocket trên FastAPI để phát (broadcast) trạng thái.
- **Triển khai:** AI Worker liên tục gửi cập nhật tiến trình (Progress Status) về Backend API. Backend sau đó đẩy sự kiện này qua kết nối WebSocket tới đúng Client đang theo dõi Job ID đó.
- **Lý do:** Giúp giao diện mượt mà và trực quan, loại bỏ việc Client phải liên tục HTTP Polling gây quá tải server.

**Chuyển đổi Vector Database sang pgvector:**
- **Vấn đề:** Ban đầu hệ thống sử dụng ChromaDB riêng lẻ. Tuy nhiên, việc phải duy trì cả Cơ sở dữ liệu quan hệ (PostgreSQL) và Vector DB riêng biệt gây phức tạp trong việc đồng bộ hóa dữ liệu và sao lưu.
- **Quyết định:** Gộp cả hai vào PostgreSQL sử dụng extension `pgvector`.
- **Triển khai:** Lưu trữ cấu trúc quan hệ (asset, metadata, scenes) và embeddings (vector nhúng) trong cùng một cơ sở dữ liệu duy nhất trên Amazon RDS.
- **Lý do:** Giảm thiểu độ trễ truy vấn qua mạng, tận dụng được tính năng ACID của SQL và đơn giản hóa kiến trúc lưu trữ.

## Kết quả

- **Xử lý bất đồng bộ:** Tách biệt thành công luồng xử lý AI nặng, giúp API Server luôn đạt tốc độ phản hồi rất nhanh (dưới 100ms) ngay cả khi đang có video render.
- **Tối ưu hạ tầng Cloud:** Mô hình Serverless với ECS Fargate giúp loại bỏ hoàn toàn chi phí máy chủ nhàn rỗi (idle compute cost).
- **Đồng bộ thời gian thực:** Trạng thái xử lý video được cập nhật ngay lập tức đến Frontend qua WebSocket.
- **Vận hành tự động:** Triển khai CI/CD pipeline tự động hóa hoàn toàn quy trình đóng gói và triển khai hệ thống.
