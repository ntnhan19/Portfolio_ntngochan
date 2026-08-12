## Bối cảnh

DHLCinema là hệ thống đặt vé xem phim trực tuyến hỗ trợ chọn ghế thời gian thực, đặt vé, thanh toán và quản trị rạp chiếu. Trọng tâm của dự án là duy trì tính nhất quán về trạng thái ghế ngồi khi có nhiều người dùng cùng lúc nỗ lực đặt chung một vị trí.

## Tính năng chính

**Đặt vé thời gian thực:** Trạng thái ghế ngồi được phản hồi ngay lập tức cho toàn bộ người dùng đang xem cùng một suất chiếu.
**Thanh toán tích hợp:** Cổng thanh toán VNPay Sandbox được nhúng trực tiếp, hỗ trợ webhook xác thực giao dịch.
**Tự động đồng bộ dữ liệu:** Hệ thống tự động thu thập phim đang chiếu từ TMDB API và tự động sinh lịch chiếu mới mỗi ngày.

## Đóng góp của tôi

- **Thiết kế** cơ chế khóa ghế bằng Database Transaction (Prisma) kết hợp bộ định tuyến thời gian để giải quyết bài toán tranh chấp.
- **Xây dựng** kiến trúc đồng bộ thời gian thực bằng Socket.io cho Frontend và Backend.
- **Tích hợp** cổng thanh toán VNPay Sandbox, xây dựng luồng Webhook để xác thực chữ ký (HMAC SHA512) trước khi chốt vé.
- **Phát triển** các Cron job chạy ngầm trên Node.js để tự động hóa luồng đồng bộ dữ liệu phim và dọn dẹp hệ thống.

## Kiến trúc

Hệ thống sử dụng kiến trúc phân tách hiện đại:
- **Client**: Ứng dụng React.js SPA quản lý giao diện và trạng thái.
- **Server**: API Node.js & Express, kết hợp Socket.io cho giao tiếp hai chiều.
- **Database**: PostgreSQL (qua Prisma ORM) cho toàn bộ trạng thái dữ liệu ổn định và an toàn.
- **Automation Engine**: Node-Cron tích hợp chặt chẽ với API TMDb để tạo luồng dữ liệu tự động.

## Thách thức Kỹ thuật

**Xử lý tranh chấp ghế đồng thời (Concurrency):**
- **Bối cảnh:** Khi nhiều người dùng chọn cùng một ghế ở cùng một thời điểm, cơ sở dữ liệu thông thường sẽ bị lỗi đặt trùng (Double-booking).
- **Giải pháp:** Sử dụng cơ chế Transaction của cơ sở dữ liệu để đảm bảo tính toàn vẹn. Trạng thái ghế được kiểm tra và cập nhật nguyên tử (atomically) trong Database.
- **Thách thức phát sinh:** Người dùng có thể khóa ghế nhưng không bao giờ thanh toán, dẫn đến việc ghế bị "giam" vĩnh viễn.
- **Cách khắc phục:** Thiết lập thời gian khóa (TTL) là 5 phút trong cơ sở dữ liệu, đồng thời xây dựng tiến trình dọn dẹp (Cleanup Job) chạy ngầm để giải phóng các ghế quá hạn.

**Đồng bộ trạng thái thời gian thực:**
- **Bối cảnh:** Mỗi suất chiếu là một phòng (Socket.io room).
- **Vấn đề:** Khi một ghế được đặt, các client khác trong phòng cần biết ngay lập tức để cập nhật giao diện mà không cần làm mới trang.
- **Cách giải quyết:** Server sử dụng WebSockets (qua Socket.io) để phát sóng (broadcast) sự kiện thay đổi trạng thái ghế đến tất cả người dùng khác đang xem cùng suất chiếu đó.

## Quyết định Kỹ thuật

**Đồng bộ dữ liệu phim tự động (Automated Data Sync):**
- **Vấn đề:** Các dự án Demo thường hiển thị dữ liệu cũ rích hoặc trống rỗng sau vài tháng bị bỏ quên. 
- **Quyết định:** Tích hợp Node-Cron kết hợp API của The Movie Database (TMDb). 
- **Triển khai:** Mỗi ngày vào lúc 1 giờ sáng, hệ thống tự động kéo danh sách phim mới nhất, sinh hàng ngàn ghế ngồi cho các suất chiếu và dọn dẹp vé cũ (trước 7 ngày). 
- **Lý do:** Giữ cho dự án luôn sống động và sẵn sàng để demo mà không tốn chi phí bảo trì hệ thống thủ công.

**Quản lý giao dịch E-commerce:**
- **Vấn đề:** Làm sao để không phát hành vé nếu người dùng thanh toán thất bại, nhưng cũng không giữ ghế vĩnh viễn. 
- **Quyết định:** Tách luồng "Giữ chỗ" và "Thanh toán". 
- **Triển khai:** Ghế chỉ được đánh dấu "Đã bán" trong Database khi và chỉ khi Webhook từ VNPay gửi tín hiệu thành công về Server, được xác thực bằng chữ ký hash (HMAC SHA512) an toàn tuyệt đối.

## Kết quả

- **Xử lý đồng thời**: Triển khai thành công cơ chế khóa ghế và xử lý hết hạn an toàn hoàn toàn dựa trên Database.
- **Đồng bộ thời gian thực**: Cập nhật giao diện ghế ngồi nhanh chóng thông qua Socket.io.
- **Thanh toán an toàn**: Tích hợp thành công VNPay Sandbox với luồng xác thực chữ ký chặt chẽ.
- **Tự động hóa**: Hệ thống tự động đồng bộ dữ liệu phim từ TMDB, giúp dự án luôn trong trạng thái tươi mới để trải nghiệm.
