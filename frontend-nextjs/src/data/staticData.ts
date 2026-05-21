// src/data/staticData.ts

// 👇 KHAI BÁO BIẾN NÀY ĐỂ QUẢN LÝ ĐƯỜNG DẪN ẢNH DỄ HƠN
const BASE_PATH = '/Portfolio_ntngochan';

export interface Project {
  id: number;
  title: string;
  description: string;
  content: string;
  tech_stack: string;
  category: string;
  repo_url?: string;
  demo_url?: string;
  image_url: string;
  highlights?: string;
  duration?: string;
  team_size?: string;
}

export const profile = {
  full_name: "Nguyễn Trần Ngọc Hân",
  title: "Sinh viên Kỹ thuật Phần mềm | Ứng viên Backend Developer Intern",
  bio: `Là sinh viên năm 4 chuyên ngành Kỹ thuật Phần mềm tại HUTECH, tôi đã xây dựng nền tảng vững chắc về Backend Development thông qua các dự án học thuật và tự học.

**Điểm mạnh:**
- Xây dựng RESTful API với Go (Gin) và Node.js (Express)
- Thiết kế database schema và tối ưu query với PostgreSQL
- Xử lý real-time communication với WebSocket/Socket.io
- Làm việc với AI/LLM: RAG pipeline, Vector Database (Pinecone)

**Mục tiêu:** Tìm kiếm vị trí Backend Developer Intern tại các công ty công nghệ để học hỏi kinh nghiệm thực tế về hệ thống quy mô lớn, microservices architecture và best practices từ các senior developers.`,
  email: "ngochanpt2018@gmail.com",
  github: "https://github.com/ntnhan19",
  linkedin: "https://linkedin.com/in/nguyentranngochan",
  avatar: `${BASE_PATH}/images/avatar.jpg`
};

export const projects: Project[] = [
  {
    id: 1,
    title: "DocMentor - AI RAG Knowledge Assistant",
    description: "Ứng dụng AI Assistant hỗ trợ trả lời câu hỏi từ tài liệu PDF/DOCX sử dụng công nghệ RAG và Vector Database. Đồ án môn Trí tuệ nhân tạo.",
    content: `## 🎯 Bối cảnh dự án

Đây là dự án của học phần **Đồ Án Chuyên Ngành** học kỳ 1 năm 2025. Bài toán đặt ra: Sinh viên và giảng viên thường phải đọc hàng trăm trang tài liệu để tìm thông tin cần thiết. Làm sao để AI có thể "đọc hiểu" tài liệu và trả lời câu hỏi chính xác?

## 🏗️ Kiến trúc hệ thống

### Tech Stack
- **Backend**: Python FastAPI
- **AI Framework**: LangChain
- **LLM**: Google Gemini Pro (miễn phí cho sinh viên)
- **Vector Database**: Pinecone (Free tier)
- **Frontend**: React.js + Tailwind CSS

### Luồng hoạt động

1. User upload PDF/DOCX
2. Backend chia nhỏ document thành chunks (512 tokens, overlap 50)
3. Sử dụng Sentence Transformers để tạo embeddings
4. Lưu embeddings vào Pinecone
5. User đặt câu hỏi → Vector search tìm chunks liên quan
6. Gemini Pro generate câu trả lời dựa trên context

## ⚙️ Tính năng đã thực hiện

### 1. Document Processing
- Upload PDF, DOCX, TXT (max 10MB)
- Chunking thông minh với RecursiveCharacterTextSplitter
- Extract metadata (tên file, số trang, ngày tạo)

### 2. RAG Pipeline
- Vector similarity search với k=5 chunks most relevant
- Context window 2000 tokens
- Streaming response (hiển thị từng token)

### 3. Chat Interface
- History conversation (lưu trong session)
- Syntax highlighting cho code blocks
- Copy answer to clipboard

## 📊 Kết quả đạt được

**Về chức năng:**
- ✅ Xử lý thành công 95% documents được test (50 files)
- ✅ Trả lời chính xác với câu hỏi liên quan trực tiếp đến nội dung
- ✅ Response time trung bình: 3-5 giây

**Về mặt học thuật:**
- Đạt điểm 9/10 cho học phần Đồ Án Chuyên Ngành
- Được thầy đánh giá cao về khả năng apply lý thuyết vào thực tế
- Present trước lớp và nhận feedback tích cực

## 💡 Những gì đã học được

### 1. Technical Skills
- Hiểu rõ cách LLM hoạt động và limitations
- Học cách làm việc với Vector Database
- Tối ưu cost khi call API (cache, batch processing)

### 2. Problem Solving
- **Vấn đề:** Chunking không tốt làm mất ngữ cảnh
  - **Giải pháp:** Thêm overlap và metadata cho mỗi chunk
- **Vấn đề:** Gemini đôi khi "hallucinate" (bịa đặt thông tin)
  - **Giải pháp:** Thêm instruction "chỉ trả lời dựa trên context, nếu không biết thì nói không biết"

### 3. Soft Skills
- Làm việc nhóm 3 người, phân chia task rõ ràng
- Present demo trước 40+ bạn và 2 giảng viên
- Viết document kỹ thuật đầy đủ`,
    tech_stack: "Python, FastAPI, LangChain, Google Gemini API, Pinecone, React.js",
    category: "AI/Machine Learning",
    repo_url: "https://github.com/ntnhan19/DocMentor",
    image_url: `${BASE_PATH}/images/projects/docmentor.png`,
    highlights: "Academic Project,RAG Pipeline,Vector Search",
    duration: "3 tháng (Sep - Dec 2025)",
    team_size: "3 người"
  },
  {
    id: 2,
    title: "DHL Cinema - Hệ thống đặt vé xem phim Real-time",
    description: "Web application đặt vé xem phim với WebSocket, xử lý race condition khi nhiều người cùng chọn ghế. Đồ án môn Lập trình mạng.",
    content: `## 🎯 Bối cảnh dự án

Đây là dự án của học phần **Đồ Án Cơ Sở** học kỳ 1 năm 2024. Giảng viên đặt yêu cầu: Xây dựng một hệ thống có tính năng real-time và phải xử lý được vấn đề race condition.

**Bài toán cụ thể:** Khi 100 người cùng lúc chọn 1 ghế trong rạp chiếu phim, làm sao đảm bảo chỉ 1 người book thành công?

## 🏗️ Kiến trúc hệ thống

### Tech Stack
- **Backend**: Node.js + Express.js
- **Real-time**: Socket.io (WebSocket)
- **Database**: PostgreSQL
- **Cache & Locking**: Redis
- **Frontend**: React.js + Context API

### Sơ đồ luồng xử lý

Client chọn ghế
    ↓
Socket.io emit 'select-seat'
    ↓
Server check Redis lock
    ↓
Nếu lock thành công → Update PostgreSQL → Broadcast
Nếu lock thất bại → Return error

## ⚙️ Giải pháp kỹ thuật

### 1. Redis Distributed Lock

\`\`\`javascript
// Acquire lock với expire time 30s
const lockKey = \`seat:\${movieId}:\${seatId}\`;
const acquired = await redis.set(
  lockKey, 
  userId, 
  'EX', 30,  // Auto expire sau 30s
  'NX'       // Chỉ set nếu key chưa tồn tại
);

if (!acquired) {
  throw new Error('Ghế đã được chọn');
}
\`\`\`

### 2. WebSocket Broadcasting

\`\`\`javascript
io.to(\`room-\${movieId}\`).emit('seat:updated', {
  seatId,
  status: 'locked',
  userId,
  timestamp: Date.now()
});
\`\`\`

## 📊 Kết quả testing

### Load Test với Artillery
- **Test case:** 100 users cùng lúc chọn 1 ghế
- **Kết quả:** Chỉ 1 request thành công, 99 requests nhận error
- **Response time:** 150-200ms
- **Zero double booking:** ✅

### Test thực tế
- Mời 10 bạn cùng lớp test đồng thời
- Kết quả: Hệ thống hoạt động ổn định
- Feedback: UI real-time mượt mà

## 💡 Những gì đã học được

### 1. Technical Knowledge
- Hiểu sâu về WebSocket và cách nó khác HTTP
- Học cách implement distributed lock pattern
- Thực hành database transaction và row-level locking

### 2. Debugging Skills
- **Bug 1:** Redis lock không release khi server crash
  - **Fix:** Dùng EXPIRE để auto-release
- **Bug 2:** WebSocket disconnect/reconnect liên tục
  - **Fix:** Implement heartbeat mechanism

## 🏆 Kết quả đạt được

- Điểm đồ án: 9.0/10

## 🎓 Reflection

Dự án này giúp tôi hiểu rằng:
- Distributed systems không đơn giản như tưởng
- Testing với race condition cần cẩn thận và có methodology
- Real-world problems thường phức tạp hơn lý thuyết rất nhiều`,
    tech_stack: "Node.js, Express, Socket.io, PostgreSQL, Redis",
    category: "Network Programming",
    repo_url: "https://github.com/ntnhan19/Project_MovieTicketBooking_NodeJS",
    image_url: `${BASE_PATH}/images/projects/cinema.png`,
    highlights: "Academic Project,Real-time System,Race Condition Handling",
    duration: "3 tháng (Mar - Jun 2025)",
    team_size: "3 người"
  }
];

export const certificates = [
  {
    id: 1,
    name: "Sinh viên 5 Tốt Cấp Khoa",
    issuer: "Đại học Công nghệ TP.HCM (HUTECH)",
    type: "Title",
    date: "2024",
    image_url: `${BASE_PATH}/images/certs/sv5tot.jpg`
  },
  {
    id: 2,
    name: "Sinh viên Tiêu Biểu Cấp Khoa",
    issuer: "Khoa Công nghệ Thông tin - HUTECH",
    type: "Title",
    date: "2024",
    image_url: `${BASE_PATH}/images/certs/svtbieu.jpg`
  },
  {
    id: 3,
    name: "Networking Basics",
    issuer: "Cisco Networking Academy",
    type: "Course",
    date: "Tháng 12/2024",
    image_url: `${BASE_PATH}/images/certs/cisco_basics.jpg`,
    url: "https://www.credly.com/badges/849ccbed-8429-4e57-a3be-e3177f447cce/public_url"
  },
  {
    id: 4,
    name: "JavaScript Essentials 1",
    issuer: "Cisco Networking Academy",
    type: "Course",
    date: "Tháng 12/2024",
    image_url: `${BASE_PATH}/images/certs/javascript1.jpg`,
    url: "https://www.credly.com/badges/04dcaaad-cc55-4403-af59-ad15cd36150f/public_url"
  },
  {
    id: 5,
    name: "JavaScript Essentials 2",
    issuer: "Cisco Networking Academy",
    type: "Course",
    date: "Tháng 12/2024",
    image_url: `${BASE_PATH}/images/certs/javascript2.jpg`,
    url: "https://www.credly.com/badges/7b330edf-fa4c-46d6-ac25-74e50e2c3773/public_url"
  },
  {
    id: 6,
    name: "Giải Ba - Cuộc thi Genz's Thinking",
    issuer: "CLB Đổi mới Sáng tạo HUTECH",
    type: "Award",
    date: "Tháng 10/2024",
    image_url: `${BASE_PATH}/images/certs/genz_award.jpg`
  },
  {
    id: 7,
    name: "Giải Ba - PIONE DREAM HACKATHON 2025",
    issuer: "Đại học HUTECH",
    type: "Award",
    date: "Tháng 1/2025",
    image_url: `${BASE_PATH}/images/certs/pionehackathon.jpg`
  }
];

export const activities = [
  {
    id: 1,
    name: "Hội Thao Sinh Viên HUTECH 2024",
    role: "Vận động viên - Đội Bóng Đá Nữ Khoa CNTT",
    description: "Tham gia thi đấu bộ môn Bóng đá nữ, đạt giải Nhì toàn trường. Hoạt động rèn luyện sức khỏe, tinh thần đồng đội và kết nối với các bạn sinh viên khác khoa.",
    date: "Tháng 3/2024",
    image_url: `${BASE_PATH}/images/activities/hoithao.jpg`
  },
  {
    id: 2,
    name: "Tết Đầy Đủ - Xuân Trọn Vẹn 2025",
    role: "Tình nguyện viên - Liên Chi Hội Khoa CNTT",
    description: "Tham gia gói quà Tết cho người nghèo tại Thành phố Hồ Chí Minh. Hoạt động kéo dài 2 ngày với 50+ tình nguyện viên, gói được 500+ phần quà.",
    date: "Tháng 1/2025",
    image_url: `${BASE_PATH}/images/activities/tinhnguyenvien.png`
  }
];
