## Bối cảnh

Dự án được xây dựng với mục tiêu giải quyết một trong những bài toán hóc búa nhất của hệ thống thương mại điện tử: xử lý lưu lượng truy cập cao (high concurrency) và tính toàn vẹn dữ liệu thời gian thực. Khi hàng trăm người dùng truy cập cùng lúc, các cơ chế khóa cơ sở dữ liệu thông thường thường bị quá tải hoặc tạo ra nút thắt cổ chai (bottlenecks).

## Kiến trúc

Hệ thống sử dụng kiến trúc phân tách hiện đại:
- **Client**: Ứng dụng React.js SPA quản lý kết nối websocket thời gian thực.
- **Server**: API Node.js & Express, sử dụng mạnh mẽ Socket.io cho giao tiếp hai chiều.
- **Database**: PostgreSQL (qua Prisma ORM) lưu trữ dữ liệu vĩnh viễn, và Redis cho bộ đệm (cache) phân tán và khóa nguyên tử (atomic locks).
- **Automation Engine**: Service chạy ngầm Node-Cron tích hợp chặt chẽ với API TMDb để tạo luồng dữ liệu tự phục hồi.

## Quyết định

**Xử lý tranh chấp ghế (Redis Distributed Lock):**
Nếu 100 người dùng chọn cùng một ghế ở cùng một phần nghìn giây, cơ sở dữ liệu thông thường sẽ bị lỗi đặt trùng. Giải pháp là dùng Khóa phân tán (`SET NX EX`) để đảm bảo tính nguyên tử tuyệt đối. Chiếc ghế được khóa trên RAM ngay lập tức. *Thách thức:* Ban đầu thiết lập TTL là 30s, nhưng nếu server sập giữa chừng, ghế bị khóa cứng. Khắc phục bằng cách giảm TTL xuống 10s và dùng cơ chế heartbeat để gia hạn lock liên tục.

![Demo Đặt ghế Real-time](/images/projects/dhlcinema/realtime-booking.gif)

**Đồng bộ thời gian thực (Socket.io):**
Mỗi suất chiếu là một phòng (room). Khi người dùng chọn ghế, trạng thái mới được broadcast cho toàn bộ người trong phòng ngay lập tức — loại bỏ hoàn toàn polling. *Thách thức:* Mất mạng và reconnect sẽ làm mất trạng thái ghế. Khắc phục: Khi client join lại phòng, server tự động emit toàn bộ sơ đồ ghế hiện tại đang lưu trong Redis.

**Tích hợp thanh toán (VNPay Sandbox):**
Đảm bảo giao dịch an toàn bằng cách đấu nối cổng thanh toán VNPay. Xử lý luồng callback/webhook để xác thực giao dịch thành công từ ngân hàng trước khi chốt vé vào Database, đảm bảo tính toàn vẹn của quy trình E-commerce.

![VNPay Integration Placeholder](https://placehold.co/800x450/e2e8f0/64748b?text=VNPay+Integration+Screenshot)

**Vận hành tự động (Self-Healing Architecture):**
Các dự án Demo thường hiển thị dữ liệu cũ rích sau vài tháng bị bỏ quên. Chúng tôi đã tích hợp Node-Cron và API của TMDb (The Movie Database). Khi nhà tuyển dụng truy cập, backend đang ngủ đông sẽ thức dậy, tự kéo phim mới, sinh hàng ngàn ghế ngồi mới và dọn dẹp vé cũ. Hệ thống tự động vận hành 100% không cần bảo trì.

![Cron Job Logs Placeholder](https://placehold.co/800x450/e2e8f0/64748b?text=Self-Healing+Cron+Job+Logs)

## Kết quả

- **Không bao giờ trùng ghế**: Vượt qua thành công bài kiểm thử tải bằng Artillery với 100 yêu cầu đặt vé đồng thời.
- **Hiệu suất cao**: Đạt thời gian phản hồi p95 ở mức 187ms dưới tải nặng.
- **Tự vận hành**: Hệ thống đã chạy liên tục không cần can thiệp thủ công kể từ khi deploy, tự động đồng bộ dữ liệu phim thế giới thực.
