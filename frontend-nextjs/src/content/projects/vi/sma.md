## Bối cảnh

Việc tìm kiếm một đoạn nội dung cụ thể trong video thường đòi hỏi editor phải xem lại lượng lớn footage và xác định thủ công từng scene. SMA được xây dựng nhằm tự động hóa quá trình này bằng cách phân tích video, phát hiện scene, trích xuất nội dung thoại và tạo metadata có thể tìm kiếm. 

Người dùng chỉ cần upload video, hệ thống sẽ đưa video vào pipeline xử lý bất đồng bộ để thực hiện scene detection, transcription và AI-based content analysis trước khi lập chỉ mục nội dung cho việc tìm kiếm.

## Điểm nổi bật

- 🎬 **Automatic Scene Detection** — phân tách video thành các scene dựa trên thay đổi hình ảnh.
- 🎙️ **Speech-to-Text** — chuyển nội dung thoại thành transcript bằng Whisper.
- 🧠 **AI Scene Understanding** — sử dụng vision model để tạo mô tả/metadata cho từng scene.
- 🔎 **Semantic Search** — lập chỉ mục embedding để tìm scene dựa trên nội dung thay vì chỉ matching keyword.
- ⚡ **Asynchronous Processing** — tách các tác vụ AI nặng khỏi request lifecycle.
- 📡 **Realtime Progress** — cập nhật tiến trình ingestion cho frontend thông qua WebSocket/Redis Pub/Sub.

## Tính năng chính

**01 — Upload & Ingestion**
Người dùng upload video qua giao diện, backend khởi tạo tài sản (asset) và đưa vào pipeline xử lý bất đồng bộ.

**02 — Video Processing**
Video được luân chuyển qua luồng xử lý độc lập: `FFmpeg` / `OpenCV` cắt khung hình, `PySceneDetect` nhận diện cảnh, `Whisper` phiên mã âm thanh và Vision Model phân tích nội dung hình ảnh.

**03 — Scene Intelligence**
Mỗi phân cảnh (scene) được làm giàu thông qua: mô tả hình ảnh, transcript hội thoại, siêu dữ liệu (metadata) và embedding vector.

**04 — Search**
Người dùng có thể tìm kiếm nội dung bằng ngôn ngữ tự nhiên và truy xuất ngay tới đúng phân cảnh tương ứng trong video.

**05 — Realtime Progress**
Frontend nhận báo cáo tiến trình xử lý từ Backend thông qua kết nối WebSocket, thay vì phải polling HTTP liên tục.

## Đóng góp của tôi

**Backend & API**
Xây dựng FastAPI backend và các API phục vụ quản lý asset, scene, media stream và luồng ingestion (ingestion workflow).

**Realtime Processing**
Thiết kế luồng cập nhật tiến trình xử lý thông qua Redis Pub/Sub và WebSocket giữa AI pipeline, backend và frontend.

**Data & Search**
Tích hợp PostgreSQL/pgvector cho việc lưu trữ và truy xuất vector data, đồng thời xây dựng adapter phục vụ semantic search.

**Cloud & Deployment**
Tham gia containerization và triển khai các thành phần của hệ thống trên AWS trong giai đoạn tham gia chương trình FCAJ.

**Team Engineering**
Tham gia xây dựng API contract, sprint planning/task tracking và review/testing để đồng bộ giữa Backend, Frontend và AI.

## Thách thức Kỹ thuật

**Challenge 1 — Long-running AI Processing**
- **Problem:** Video processing và AI inference có thời gian xử lý dài, không phù hợp với synchronous HTTP request.
- **Solution:** Tách ingestion khỏi quá trình xử lý, cho phép pipeline chạy bất đồng bộ và backend theo dõi trạng thái job.

**Challenge 2 — Realtime Progress**
- **Problem:** Người dùng cần biết video đang ở bước nào (uploading → scene detection → transcription → AI analysis → completed).
- **Solution:** Sử dụng Redis Pub/Sub để truyền trạng thái giữa processing services và backend, sau đó WebSocket đẩy progress tới frontend.

**Challenge 3 — Multi-stage AI Pipeline**
- **Problem:** Pipeline gồm nhiều bước phụ thuộc lẫn nhau. Một video không thể chỉ chạy một model duy nhất.
- **Solution:** Thiết kế pipeline theo từng processing stage, giúp các bước scene detection, transcription và visual analysis có thể được xử lý độc lập.

**Challenge 4 — Deployment / Cost**
- **Problem:** AI workload và cloud infrastructure có chi phí vận hành đáng kể đối với student project.
- **Decision:** AWS được sử dụng trong chương trình FCAJ để validate/deploy hệ thống, sau đó shutdown khi kết thúc giai đoạn cần thiết và định hướng self-host để giảm recurring cost.

## Quyết định Kỹ thuật

**Why Docker?**
Containerize các service để đảm bảo môi trường chạy nhất quán giữa development và deployment.

**Why WebSocket + Redis Pub/Sub?**
WebSocket chịu trách nhiệm giao tiếp realtime với client, trong khi Redis Pub/Sub giúp tách việc phát sinh progress event khỏi consumer phía backend.

**Why PostgreSQL + pgvector?**
Dùng PostgreSQL cho persistent application data và pgvector để lưu/truy xuất vector embedding trong cùng một hệ sinh thái dữ liệu, tránh phân mảnh.

**Why Self-host?**
Không cần duy trì cloud infrastructure liên tục (và tốn kém) khi project không có traffic ở môi trường production.

## Trạng thái dự án

**Development / Archived Cloud Deployment**
SMA đã hoàn thành giai đoạn phát triển và deployment trên AWS trong chương trình FCAJ. Cloud infrastructure hiện được shutdown để tránh chi phí duy trì không cần thiết.

*Next step: self-host the containerized system for future demonstrations and continued development.*

## Kết quả đạt được

- Xây dựng end-to-end video ingestion pipeline từ bước upload đến lúc phân tích AI.
- Tự động phân tách video thành các scene và enrich scene bằng transcript cùng AI-generated metadata.
- Đồng bộ processing progress theo thời gian thực giữa backend và frontend.
- Containerize các thành phần chính để phục vụ local development và deployment.
- Hoàn thiện cloud deployment trong giai đoạn FCAJ.
- Thiết kế hướng self-hosting nhằm giảm chi phí vận hành sau giai đoạn cloud deployment.
