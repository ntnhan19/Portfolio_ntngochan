## Bối cảnh

DHLCinema là hệ thống đặt vé xem phim trực tuyến thời gian thực được thiết kế để xử lý lưu lượng truy cập cao (high concurrency) và tính toàn vẹn dữ liệu. Khi hàng trăm người dùng truy cập cùng lúc, các cơ chế khóa cơ sở dữ liệu thông thường thường bị quá tải hoặc tạo ra nút thắt cổ chai (bottlenecks). Hệ thống giải quyết triệt để bài toán này thông qua khóa phân tán và kiến trúc hướng sự kiện (event-driven).

## Tính năng chính

**Đặt vé thời gian thực:** Trạng thái ghế ngồi được phản hồi ngay lập tức cho toàn bộ người dùng đang xem cùng một suất chiếu mà không cần reload trang.
**Thanh toán tích hợp:** Cổng thanh toán VNPay được nhúng trực tiếp, hỗ trợ callback xác thực giao dịch an toàn.
**Dữ liệu tự phục hồi (Self-healing):** Hệ thống tự động thu thập phim đang chiếu từ TMDB API và tự động sinh lịch chiếu mới mỗi ngày mà không cần admin can thiệp.

## Đóng góp của tôi

- **Thiết kế** và triển khai hệ thống Khóa phân tán (Distributed Lock) bằng Redis để xử lý bài toán tranh chấp ghế.
- **Xây dựng** kiến trúc đồng bộ thời gian thực bằng Socket.io cho cả Backend và Frontend, tối ưu hóa băng thông bằng cách quản lý theo từng phòng (Room).
- **Tích hợp** cổng thanh toán VNPay Sandbox, xây dựng luồng Webhook để xác thực tính hợp lệ của giao dịch trước khi chốt vé.
- **Phát triển** các Cron job chạy ngầm trên Node.js để tự động hóa hoàn toàn luồng lấy dữ liệu từ TMDB và dọn dẹp vé quá hạn.

## Kiến trúc

Hệ thống sử dụng kiến trúc phân tách hiện đại:
- **Client**: Ứng dụng React.js SPA quản lý kết nối websocket thời gian thực.
- **Server**: API Node.js & Express, sử dụng mạnh mẽ Socket.io cho giao tiếp hai chiều.
- **Database**: PostgreSQL (qua Prisma ORM) lưu trữ dữ liệu vĩnh viễn, và Redis cho bộ đệm (cache) phân tán và khóa nguyên tử (atomic locks).
- **Automation Engine**: Service chạy ngầm Node-Cron tích hợp chặt chẽ với API TMDb để tạo luồng dữ liệu tự phục hồi.

## Thách thức Kỹ thuật

**Xử lý tranh chấp ghế đồng thời (Race Condition):**
Khi 100 người dùng chọn cùng một ghế ở cùng một phần nghìn giây, cơ sở dữ liệu thông thường sẽ bị lỗi đặt trùng. Giải pháp là dùng Khóa phân tán (`SET NX EX`) trên Redis để đảm bảo tính nguyên tử tuyệt đối. Chiếc ghế được khóa trên RAM ngay lập tức. *Thách thức phát sinh:* Ban đầu thiết lập TTL là 30s, nhưng nếu server sập hoặc client mất mạng giữa chừng, ghế bị khóa cứng không ai đặt được. *Cách giải quyết:* Giảm TTL xuống 10s và xây dựng cơ chế Heartbeat từ client để gia hạn lock liên tục chừng nào người dùng còn đang thao tác.

**Mất đồng bộ trạng thái khi rớt mạng:**
Mỗi suất chiếu là một phòng (Socket.io room). *Vấn đề:* Khi người dùng rớt mạng và kết nối lại, họ sẽ mất toàn bộ các sự kiện ghế bị người khác đặt trong khoảng thời gian mất mạng đó. *Cách giải quyết:* Thay vì chỉ phát sóng (broadcast) sự kiện thay đổi, server sẽ tự động gửi toàn bộ sơ đồ ghế hiện tại đang lưu trong Redis cho client ngay khi họ join lại phòng. *Sự đánh đổi:* Tốn thêm một chút băng thông khi reconnect, nhưng đảm bảo tính nhất quán dữ liệu 100% trên giao diện.

## Quyết định Kỹ thuật

**Vận hành tự động (Self-Healing Architecture):**
*Vấn đề:* Các dự án Demo thường hiển thị dữ liệu cũ rích hoặc trống rỗng sau vài tháng bị bỏ quên. *Quyết định:* Tích hợp Node-Cron kết hợp API của The Movie Database (TMDb). *Triển khai:* Khi nhà tuyển dụng truy cập, backend đang ngủ đông sẽ thức dậy, tự động kéo danh sách phim mới nhất, sinh hàng ngàn ghế ngồi cho các suất chiếu và dọn dẹp vé cũ. *Lý do:* Giữ cho dự án luôn sống động và sẵn sàng để demo mà không tốn chi phí bảo trì hệ thống.

**Quản lý giao dịch E-commerce:**
*Vấn đề:* Làm sao để không phát hành vé nếu người dùng thanh toán thất bại, nhưng cũng không giữ ghế vĩnh viễn. *Quyết định:* Tách luồng "Giữ chỗ" và "Thanh toán". *Triển khai:* Ghế chỉ được đánh dấu "Đã bán" trong Database khi và chỉ khi Webhook từ VNPay gửi tín hiệu thành công về Server, xác thực bằng chữ ký hash an toàn.

## Kết quả

- **Tính toàn vẹn dữ liệu**: Vượt qua thành công bài kiểm thử tải bằng Artillery với 100 yêu cầu đặt vé đồng thời vào cùng một ghế mà không xảy ra double-booking.
- **Hiệu suất**: Đạt thời gian phản hồi p95 ở mức 187ms dưới tải nặng nhờ đưa toàn bộ logic check ghế lên Redis.
- **Tự vận hành**: Hệ thống đã chạy liên tục không cần can thiệp thủ công kể từ khi deploy, tự động đồng bộ dữ liệu phim thế giới thực.
