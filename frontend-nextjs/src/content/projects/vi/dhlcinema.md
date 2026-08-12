## Bối cảnh

Dự án được xây dựng với mục tiêu giải quyết một trong những bài toán hóc búa nhất của hệ thống thương mại điện tử: xử lý lưu lượng truy cập cao (high concurrency) và tính toàn vẹn dữ liệu thời gian thực. Khi hàng trăm người dùng truy cập cùng lúc, các cơ chế khóa cơ sở dữ liệu thông thường thường bị quá tải hoặc tạo ra nút thắt cổ chai (bottlenecks).

## Kiến trúc

Hệ thống sử dụng kiến trúc phân tách hiện đại:
- **Client**: Ứng dụng React.js SPA quản lý kết nối websocket thời gian thực.
- **Server**: API Node.js & Express, sử dụng mạnh mẽ Socket.io cho giao tiếp hai chiều.
- **Database**: PostgreSQL (qua Prisma ORM) lưu trữ dữ liệu vĩnh viễn, và Redis cho bộ đệm (cache) phân tán và khóa nguyên tử (atomic locks).
- **Automation Engine**: Service chạy ngầm Node-Cron tích hợp chặt chẽ với API TMDb để tạo luồng dữ liệu tự phục hồi.

## Quyết định

**Bài toán tranh chấp ghế (Race Condition):**
Nếu 100 người dùng chọn cùng một ghế ở cùng một phần nghìn giây, cơ sở dữ liệu thông thường có thể gặp lỗi đặt trùng. Chúng tôi đã triển khai **Khóa phân tán Redis (Distributed Lock)** (`SET NX EX`) để đảm bảo tính nguyên tử tuyệt đối. Chiếc ghế được khóa trên RAM ngay lập tức, và Socket.io phát tín hiệu cập nhật cho toàn bộ client khác, biến ghế đó thành màu xám theo thời gian thực.

**Vấn đề "Dự án ma" trên Portfolio:**
Các dự án Demo thường hiển thị dữ liệu cũ rích sau vài tháng bị bỏ quên. Chúng tôi đã xây dựng **Kiến trúc Tự phục hồi (Self-Healing Architecture)**. Khi nhà tuyển dụng truy cập trang web, backend đang ngủ đông sẽ thức dậy, tự kéo các bộ phim "Đang chiếu" mới nhất từ TMDb, tự sinh hàng ngàn ghế ngồi mới và dọn dẹp vé cũ. Dự án duy trì 100% tự động vận hành và luôn luôn tươi mới.

## Kết quả

- **Không bao giờ trùng ghế**: Vượt qua thành công bài kiểm thử tải bằng Artillery với 100 yêu cầu đặt vé đồng thời.
- **Hiệu suất cao**: Đạt thời gian phản hồi p95 ở mức 187ms dưới tải nặng.
- **Tự vận hành**: Hệ thống đã chạy liên tục không cần can thiệp thủ công kể từ khi deploy, tự động đồng bộ dữ liệu phim thế giới thực.
