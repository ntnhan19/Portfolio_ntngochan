## Bối cảnh

Sinh viên và giảng viên thường phải đọc hàng trăm trang tài liệu để tìm kiếm một thông tin cụ thể nào đó. DocMentor giải quyết vấn đề này với 파イ프라인 RAG — chỉ cần tải tài liệu lên một lần, đặt câu hỏi bằng ngôn ngữ tự nhiên, và nhận lại câu trả lời kèm theo trích dẫn nguồn.

Đây là đồ án môn học **Đồ án chuyên ngành** (Học kỳ 1 / 2025), được xây dựng bởi nhóm 3 sinh viên.

## Kiến trúc Hệ thống

```text
Upload PDF/DOCX
    → Trích xuất văn bản (PyMuPDF)
    → Chia nhỏ / Chunking (RecursiveCharacterTextSplitter, 512 tokens, overlap 50)
    → Nhúng / Embedding (Sentence Transformers: all-MiniLM-L6-v2)
    → Lưu trữ → Pinecone Vector DB

User Query
    → Embed câu truy vấn
    → Tìm kiếm tương đồng (top-k=5)
    → Xây dựng prompt (chunks + câu hỏi)
    → Gemini Pro → Trả về dạng Streaming SSE
```

## Quyết định Kỹ thuật Chính

**Chiến lược Chunking:** Bắt đầu với fixed-size chunking — kết quả khá tệ vì các câu văn bị cắt ngang giữa chừng. Sau đó chuyển sang dùng RecursiveCharacterTextSplitter với độ trùm (overlap) là 50 tokens; độ chính xác cải thiện đáng kể.

**Kiểm soát ảo giác (Hallucination):** Đôi khi Gemini tự bịa ra thông tin không có trong tài liệu. Khắc phục bằng cách áp dụng system prompt cứng rắng: *"CHỈ trả lời dựa trên ngữ cảnh được cung cấp. Nếu câu trả lời không có trong ngữ cảnh, hãy nói 'Tôi không có đủ thông tin.'"*

**Tối ưu chi phí:** Caching (lưu trữ tạm) các vector embedding theo mã băm của file (MD5) — tránh việc phải gọi hàm nhúng lại khi người dùng tải lên một file đã từng được tải.

## Kết quả

- Xử lý thành công 95% trên 50 tài liệu kiểm thử.
- Thời gian phản hồi: 3–5 giây (bao gồm cả hiệu ứng streaming).
- Điểm số đồ án: 9/10
