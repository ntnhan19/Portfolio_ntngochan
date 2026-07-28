## Bối cảnh

Smart Media Analytics (SMA) là một nền tảng toàn diện quản lý và tìm kiếm media bằng AI. Được xây dựng bởi nhóm 4 người từ tháng 4 đến tháng 7 năm 2026, dự án giải quyết bài toán tốn thời gian khi phải lướt qua hàng giờ video thủ công bằng cách tự động trích xuất các phân cảnh, phiên mã âm thanh và tạo các thẻ tag ngữ nghĩa (semantic tags).

## Kiến trúc Hệ thống

Hệ thống được chia thành 3 phần chính:
1. **Frontend (React)**: Giao diện người dùng để tải lên media, xem dashboard và tìm kiếm ngữ nghĩa.
2. **Backend API (FastAPI)**: Xử lý định tuyến, tương tác cơ sở dữ liệu, và điều phối AI pipeline.
3. **AI Worker (ECS Fargate)**: Tác vụ độc lập dùng để xử lý nặng (Phiên mã bằng Whisper, phát hiện phân cảnh bằng OpenCV).

## Quyết định Kỹ thuật Chính

**Phân tách trách nhiệm (Separation of Concerns):** Tách biệt quá trình xử lý AI nặng nề ra khỏi Backend API để tránh gây tắc nghẽn (blocking). AI Worker chạy như một container hoàn toàn độc lập.

**Tối ưu Đám mây (Cloud Optimization):** Triển khai AI pipeline lên AWS ECS Fargate với cơ chế gọi theo yêu cầu (on-demand), giúp giảm chi phí tính toán nhàn rỗi bằng cách tự động tắt các tác vụ sau khi xử lý xong.

**Lựa chọn Cơ sở dữ liệu:** Chuyển đổi từ ChromaDB nội bộ sang pgvector trên Amazon RDS để đảm bảo khả năng tìm kiếm vector mạnh mẽ và sẵn sàng cho môi trường production.

## Kết quả

- Container hóa backend, frontend, và AI pipeline bằng Docker Compose, mang lại môi trường đồng nhất cho toàn bộ thành viên nhóm, không còn lỗi xung đột thư viện.
- Thiết lập thành công luồng CI/CD với GitHub Actions để tự động deploy mỗi khi push code lên nhánh main.
- Giải quyết vấn đề cập nhật realtime bằng cách fix lỗi race condition của WebSocket.
- Viết unit test (pytest) cho Ingest và Search APIs nhằm đảm bảo tính ổn định của pipeline.
