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

export interface BlogPost {
  id: number;
  title: string;
  summary: string;
  content: string;
  cover_image: string;
  tags: string;
  date: string;
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
  avatar: `/images/avatar.jpg`
};

// CẬP NHẬT blogPosts (Đủ 9 bài theo yêu cầu
export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Hành trình từ .NET sang Go: Tại sao tôi chuyển stack?",
    summary: "Chia sẻ trải nghiệm học Golang sau 1 năm làm việc với C# .NET. Performance benchmark, learning curve, và những cú sốc văn hóa.",
    content: `# Hành trình từ .NET sang Go: Tại sao tôi chuyển stack?
  
  ## 🎯 Bối cảnh chuyển đổi
  
  Sau 1 năm làm việc với **C# và .NET Framework** trong các dự án học tập, tôi quyết định học **Golang** vào tháng 9/2024. Không phải vì .NET không tốt, mà vì tôi muốn trải nghiệm một paradigm hoàn toàn khác biệt.
  
  ## 📊 So sánh đầu tiên: Hello World Performance
  
  ### C# (.NET 8)
  \`\`\`csharp
  // Program.cs
  var builder = WebApplication.CreateBuilder(args);
  var app = builder.Build();
  
  app.MapGet("/", () => "Hello World");
  app.Run();
  \`\`\`
  
  ### Go (Gin Framework)
  \`\`\`go
  // main.go
  package main
  
  import "github.com/gin-gonic/gin"
  
  func main() {
      r := gin.Default()
      r.GET("/", func(c *gin.Context) {
          c.JSON(200, gin.H{"message": "Hello World"})
      })
      r.Run(":8080")
  }
  \`\`\`
  
  **Benchmark với Apache Bench (10,000 requests, concurrency 100):**
  
  | Metric | .NET 8 | Go (Gin) |
  |--------|--------|----------|
  | Requests/sec | 8,943 | 12,456 |
  | Time per request | 11.2ms | 8.0ms |
  | Memory usage | 45MB | 12MB |
  
  ## 🤯 Những "culture shock" khi chuyển sang Go
  
  ### 1. Error Handling: Từ Try-Catch sang if err != nil
  
  **C# style:**
  \`\`\`csharp
  try {
      var data = await _repo.GetUserById(id);
      return Ok(data);
  } catch (Exception ex) {
      _logger.LogError(ex, "Error fetching user");
      return StatusCode(500, "Internal Server Error");
  }
  \`\`\`
  
  **Go style:**
  \`\`\`go
  data, err := repo.GetUserById(id)
  if err != nil {
      log.Printf("Error fetching user: %v", err)
      c.JSON(500, gin.H{"error": "Internal Server Error"})
      return
  }
  c.JSON(200, data)
  \`\`\`
  
  **Suy nghĩ ban đầu:** "Sao phải check error mọi lúc thế này? Mệt quá!"  
  **Sau 2 tháng:** "Ồ, cách này giúp tôi handle edge cases tốt hơn nhiều!"
  
  ### 2. Không có Class, chỉ có Struct + Methods
  
  **C# OOP:**
  \`\`\`csharp
  public class UserService {
      private readonly IUserRepository _repo;
      
      public UserService(IUserRepository repo) {
          _repo = repo;
      }
      
      public async Task<User> GetUser(int id) {
          return await _repo.FindById(id);
      }
  }
  \`\`\`
  
  **Go composition:**
  \`\`\`go
  type UserService struct {
      repo UserRepository
  }
  
  func NewUserService(repo UserRepository) *UserService {
      return &UserService{repo: repo}
  }
  
  func (s *UserService) GetUser(id int) (*User, error) {
      return s.repo.FindById(id)
  }
  \`\`\`
  
  ### 3. Goroutines vs Tasks/Async-Await
  
  **C#:**
  \`\`\`csharp
  var tasks = users.Select(async user => {
      return await ProcessUserAsync(user);
  });
  var results = await Task.WhenAll(tasks);
  \`\`\`
  
  **Go:**
  \`\`\`go
  var wg sync.WaitGroup
  results := make(chan Result, len(users))
  
  for _, user := range users {
      wg.Add(1)
      go func(u User) {
          defer wg.Done()
          results <- ProcessUser(u)
      }(user)
  }
  
  wg.Wait()
  close(results)
  \`\`\`
  
  ## 💡 Khi nào nên dùng Go vs .NET?
  
  ### Chọn Go khi:
  - Xây dựng microservices, API servers
  - Cần performance cao, resource usage thấp
  - Làm việc với concurrent programming nhiều
  - DevOps tools, CLI applications
  
  ### Chọn .NET khi:
  - Enterprise applications với business logic phức tạp
  - Team đã quen thuộc với C# ecosystem
  - Cần Entity Framework, LINQ, và các abstractions cao cấp
  - Windows-first environment
  
  ## 🎓 Bài học rút ra
  
  1. **Simplicity is not easy**: Go có ít features hơn, nhưng viết code đơn giản đúng cách lại khó
  2. **Performance matters**: Trong môi trường production, 40% memory savings thực sự quan trọng
  3. **Learning curve**: Go dễ học hơn C# rất nhiều (1 tuần vs 3 tháng để "fluent")
  
  ## 🚀 Kết luận
  
  Tôi không hối hận khi học Go. Nhưng tôi cũng không từ bỏ .NET. Mỗi công cụ có use case riêng. Quan trọng là hiểu **khi nào dùng cái gì**.
  
  **Lời khuyên cho bạn đọc:** Đừng theo trend mù quáng. Hãy thử cả hai và tự đánh giá phù hợp với mình nhất.`,
    cover_image: `${BASE_PATH}/images/blog/golang_vs_dotnet.jpg`,
    tags: "Career,Backend,Golang",
    date: "27/12/2024"
  },
  {
    id: 2,
    title: "3 bài học quý giá từ Hackathon PIONE DREAM 2025",
    summary: "48 giờ không ngủ, 1 MVP hoàn chỉnh, và những insight quý giá về làm việc nhóm dưới áp lực thời gian.",
    content: `# 3 bài học quý giá từ Hackathon PIONE DREAM 2025

## 🏆 Context

Vào tháng 1/2025, tôi cùng 2 bạn trong lớp tham gia **PIONE DREAM HACKATHON** do HUTECH tổ chức. Theme của năm nay là **"Smart City Solutions"**.

**Team của chúng tôi:**
- Tôi: Backend Developer (Go + PostgreSQL)
- Bạn A: Frontend Developer (React + TailwindCSS)
- Bạn B: UI/UX Designer + PM

**Ý tưởng:** Web app giúp người dân báo cáo các vấn đề về hạ tầng đô thị (ổ gà, đèn đường hỏng, rác thải...) với geolocation và status tracking real-time.

## ⏰ Timeline 48 giờ

### Giờ 0-6: Brainstorming & Setup
- Tranh luận nảy lửa về tech stack
- Tôi nhất quyết dùng Go thay vì Node.js (vì tự tin hơn)
- Setup Dockerized dev environment
- Thiết kế database schema

### Giờ 6-24: Coding Marathon
- Tôi code API endpoints liên tục
- Mắc bug lớn: Forgot to handle CORS properly
- Frontend không gọi được API → mất 2 giờ debug

### Giờ 24-36: Integration Hell
- Merge code từ 2 branches → conflict ở mọi file
- Database migration failed → rollback → panic
- Team gần như bỏ cuộc lúc 3h sáng

### Giờ 36-48: The Final Push
- Deploy lên Railway (thay vì Heroku vì free tier tốt hơn)
- Viết pitch deck vội vàng
- Rehearse presentation 5 lần

## 📚 3 BÀI HỌC QUAN TRỌNG

### Bài học #1: Communication > Coding Skills

**Vấn đề:** Tôi code xong API endpoint **/ reports** nhưng quên thông báo cho Frontend.

**Hậu quả:** Frontend dev viết mock data, lãng phí 3 giờ.

**Giải pháp học được:**
- Dùng **Notion** để track tasks real-time
- Mỗi 2 giờ có 1 sync meeting ngắn (5 phút)
- Document API endpoints trong **Postman Collection** ngay khi code xong

### Bài học #2: Perfect is the enemy of done

**Vấn đề:** Tôi muốn implement **JWT refresh token** + **Redis caching**.

**Thực tế:** Hackathon chỉ cần MVP chạy được, không cần production-ready.

**Giải pháp:**
- Dùng simple JWT, không có refresh token
- Cache in-memory thay vì Redis
- Focus on features that judges will see: UI demo, pitch deck

### Bài học #3: Technical debt is OK in hackathons

**Code tôi viết trong hackathon:**
\`\`\`go
// TODO: Refactor this later
if err != nil {
    log.Println(err) // Just log, no proper error handling
    return
}

// Hardcoded config (should use env vars)
db, _ := sql.Open("postgres", "postgresql://user:pass@localhost/db")
\`\`\`

**Suy nghĩ ban đầu:** "Code này quá tệ, phải refactor!"

**Bài học:** Hackathon không phải production. Ship first, refactor never (trong context này).

## 🎯 Kết quả

- **Giải Ba** (trong 15 teams)
- **Feedback từ judges:** "Ý tưởng hay, demo mượt, nhưng thiếu business model"
- **Prize:** 3,000,000 VNĐ + Certificate

## 💭 Reflection

**Điều tôi làm đúng:**
- Chọn tech stack mình thành thạo
- Không spend time vào features không quan trọng
- Team chemistry tốt (quan trọng nhất)

**Điều tôi làm sai:**
- Không ngủ → Làm việc inefficient vào giờ 30-40
- Quá focus vào backend → Pitch deck yếu

**Lời khuyên cho lần sau:**
1. Sleep at least 4 hours
2. Spend 50% time on pitch, not just coding
3. Use simpler tech stack (even if less "cool")

## 🚀 Tổng kết

Hackathon dạy tôi những thứ mà không một môn học nào dạy được:
- Làm việc dưới pressure
- Prioritization khi resources limited
- Team collaboration in chaos

**Worth it?** Absolutely. Sẽ tham gia lần nữa năm sau!`,
    cover_image: `${BASE_PATH}/images/blog/hackathon.jpg`,
    tags: "Experience,Hackathon,Soft Skills",
    date: "26/12/2024"
  },
  {
    id: 3,
    title: "Java Collections Framework: ArrayList vs LinkedList",
    summary: "So sánh chi tiết hiệu năng và cách sử dụng ArrayList và LinkedList trong Java. Khi nào nên dùng cái nào để tối ưu bộ nhớ?",
    content: `# Java Collections Framework: ArrayList vs LinkedList

## Giới thiệu

ArrayList và LinkedList là 2 implementation phổ biến của List interface trong Java. Hiểu rõ sự khác biệt giữa chúng giúp chọn đúng data structure cho từng bài toán.

## 1. Cấu trúc dữ liệu

### ArrayList
- Sử dụng **dynamic array** bên trong
- Các phần tử được lưu **liên tiếp** trong bộ nhớ
- Kích thước tăng tự động (capacity x 1.5 khi đầy)

\`\`\`java
ArrayList<String> list = new ArrayList<>();
list.add("Java");  // O(1) - amortized
list.get(0);       // O(1) - truy cập trực tiếp
\`\`\`

### LinkedList
- Sử dụng **doubly linked list**
- Mỗi node chứa: data, pointer đến next và previous
- Không cần memory liên tiếp

\`\`\`java
LinkedList<String> list = new LinkedList<>();
list.add("Java");     // O(1)
list.get(0);          // O(n) - phải duyệt từ đầu
\`\`\`

## 2. Performance Comparison

| Operation | ArrayList | LinkedList |
|-----------|-----------|------------|
| get(index) | O(1) | O(n) |
| add(element) | O(1)* | O(1) |
| add(index, element) | O(n) | O(n) |
| remove(index) | O(n) | O(n) |

*: Amortized time - đôi khi O(n) khi resize

## 3. Khi nào dùng cái nào?

### Dùng ArrayList khi:
- Cần **truy cập random** nhiều (get/set by index)
- Thêm/xóa chủ yếu ở **cuối list**
- Memory overhead thấp hơn

### Dùng LinkedList khi:
- Thêm/xóa **ở đầu** list thường xuyên
- Duyệt tuần tự (iterator)
- Không cần random access

## 4. Ví dụ thực tế

\`\`\`java
// ArrayList - Truy cập nhanh
List<Student> students = new ArrayList<>();
students.add(new Student("Nam", 20));
students.add(new Student("Hân", 21));

// Truy cập index nhanh O(1)
Student first = students.get(0);

// LinkedList - Thêm/xóa đầu nhanh
Deque<Task> taskQueue = new LinkedList<>();
taskQueue.addFirst(new Task("Urgent"));  // O(1)
taskQueue.removeFirst();                 // O(1)
\`\`\`

## 5. Benchmark thực tế

\`\`\`java
// Test với 100,000 phần tử
List<Integer> arrayList = new ArrayList<>();
List<Integer> linkedList = new LinkedList<>();

// Add operations
long start = System.nanoTime();
for (int i = 0; i < 100000; i++) {
    arrayList.add(i);
}
System.out.println("ArrayList add: " + (System.nanoTime() - start) / 1000000 + "ms");
// Output: ~5ms

start = System.nanoTime();
for (int i = 0; i < 100000; i++) {
    linkedList.add(i);
}
System.out.println("LinkedList add: " + (System.nanoTime() - start) / 1000000 + "ms");
// Output: ~8ms

// Get operations
start = System.nanoTime();
for (int i = 0; i < 1000; i++) {
    arrayList.get(50000);
}
System.out.println("ArrayList get: " + (System.nanoTime() - start) / 1000000 + "ms");
// Output: ~0.1ms

start = System.nanoTime();
for (int i = 0; i < 1000; i++) {
    linkedList.get(50000);
}
System.out.println("LinkedList get: " + (System.nanoTime() - start) / 1000000 + "ms");
// Output: ~150ms (!!!)
\`\`\`

## 6. Kết luận

- **ArrayList**: Default choice cho hầu hết trường hợp
- **LinkedList**: Chỉ khi cần thao tác đầu/cuối thường xuyên
- Luôn benchmark với data thực tế!

**Rule of thumb:** Nếu nghi ngờ, dùng ArrayList.`,
    cover_image: `${BASE_PATH}/images/blog/java-collections.png`,
    tags: "Java,Data Structures",
    date: "15/12/2024"
  },
  {
    id: 4,
    title: "Java Stream API: Lập trình hàm trong Java 8+",
    summary: "Stream API giúp code Java ngắn gọn và dễ đọc hơn. Tìm hiểu cách sử dụng map, filter, reduce hiệu quả.",
    content: `# Java Stream API: Lập trình hàm trong Java 8+

## 🎯 Tại sao cần Stream API?

Trước Java 8, để xử lý collection, chúng ta phải viết nhiều boilerplate code:

\`\`\`java
// Cách cũ: Tìm sinh viên có điểm > 8.0
List<Student> topStudents = new ArrayList<>();
for (Student student : students) {
    if (student.getGrade() > 8.0) {
        topStudents.add(student);
    }
}

// Cách mới với Stream (Java 8+)
List<Student> topStudents = students.stream()
    .filter(s -> s.getGrade() > 8.0)
    .collect(Collectors.toList());
\`\`\`

**Ưu điểm:**
- Code ngắn gọn, dễ đọc hơn
- Hỗ trợ parallel processing dễ dàng
- Functional programming style

## 1. Ba loại operations trong Stream

### 1.1. Intermediate Operations (Lazy)
Operations trả về Stream mới, chưa execute ngay:

\`\`\`java
Stream<Student> stream = students.stream()
    .filter(s -> s.getAge() > 18)    // Chưa chạy
    .map(Student::getName)            // Chưa chạy
    .distinct();                      // Chưa chạy
    
// Chỉ chạy khi gọi terminal operation
List<String> names = stream.collect(Collectors.toList()); // Execute!
\`\`\`

### 1.2. Terminal Operations
Operations kết thúc stream và trả về kết quả:

\`\`\`java
students.stream()
    .filter(s -> s.getGrade() > 8.0)
    .count();                    // Terminal → return long

students.stream()
    .filter(s -> s.getGrade() > 8.0)
    .forEach(System.out::println); // Terminal → return void
\`\`\`

### 1.3. Short-circuiting Operations
Operations dừng sớm khi tìm được kết quả:

\`\`\`java
boolean hasTopStudent = students.stream()
    .anyMatch(s -> s.getGrade() > 9.5); // Dừng ngay khi tìm thấy

Optional<Student> first = students.stream()
    .filter(s -> s.getAge() < 18)
    .findFirst(); // Dừng sau khi tìm được 1 phần tử
\`\`\`

## 2. Các operations phổ biến

### map() - Transform elements

\`\`\`java
// Lấy danh sách tên sinh viên
List<String> names = students.stream()
    .map(Student::getName)
    .collect(Collectors.toList());

// Chuyển sang uppercase
List<String> upperNames = students.stream()
    .map(Student::getName)
    .map(String::toUpperCase)
    .collect(Collectors.toList());
\`\`\`

### filter() - Lọc elements

\`\`\`java
// Sinh viên > 20 tuổi
List<Student> adults = students.stream()
    .filter(s -> s.getAge() > 20)
    .collect(Collectors.toList());

// Chain nhiều filters
List<Student> filtered = students.stream()
    .filter(s -> s.getAge() > 18)
    .filter(s -> s.getGrade() > 7.0)
    .filter(s -> s.getMajor().equals("IT"))
    .collect(Collectors.toList());
\`\`\`

### reduce() - Aggregate values

\`\`\`java
// Tính tổng điểm
double totalGrade = students.stream()
    .map(Student::getGrade)
    .reduce(0.0, Double::sum);

// Tìm max
Optional<Double> maxGrade = students.stream()
    .map(Student::getGrade)
    .reduce(Double::max);

// Concatenate strings
String allNames = students.stream()
    .map(Student::getName)
    .reduce("", (a, b) -> a + ", " + b);
\`\`\`

## 3. Collectors - Xử lý kết quả

### Grouping

\`\`\`java
// Group by major
Map<String, List<Student>> byMajor = students.stream()
    .collect(Collectors.groupingBy(Student::getMajor));

// Count by major
Map<String, Long> countByMajor = students.stream()
    .collect(Collectors.groupingBy(
        Student::getMajor,
        Collectors.counting()
    ));
\`\`\`

### Partitioning

\`\`\`java
// Chia thành 2 nhóm: pass/fail
Map<Boolean, List<Student>> passFail = students.stream()
    .collect(Collectors.partitioningBy(s -> s.getGrade() >= 5.0));

List<Student> passed = passFail.get(true);
List<Student> failed = passFail.get(false);
\`\`\`

### Custom Collectors

\`\`\`java
// Joining với delimiter
String names = students.stream()
    .map(Student::getName)
    .collect(Collectors.joining(", ", "[", "]"));
// Result: "[Nam, Hân, Trung]"

// Statistics
DoubleSummaryStatistics stats = students.stream()
    .collect(Collectors.summarizingDouble(Student::getGrade));

System.out.println("Average: " + stats.getAverage());
System.out.println("Max: " + stats.getMax());
\`\`\`

## 4. Parallel Streams

\`\`\`java
// Sequential (default)
long count = students.stream()
    .filter(s -> s.getGrade() > 8.0)
    .count();

// Parallel - sử dụng multiple threads
long count = students.parallelStream()
    .filter(s -> s.getGrade() > 8.0)
    .count();
\`\`\`

**⚠️ Cảnh báo:**
- Chỉ dùng parallel với operations **stateless** và **no side-effects**
- Không tự ý dùng parallel, benchmark trước!

## 5. Common Pitfalls

### ❌ KHÔNG làm thế này:

\`\`\`java
// Modify external state (side effect)
List<String> result = new ArrayList<>();
students.stream()
    .forEach(s -> result.add(s.getName())); // BAD!

// Correct way
List<String> result = students.stream()
    .map(Student::getName)
    .collect(Collectors.toList()); // GOOD!
\`\`\`

### ❌ Reuse stream:

\`\`\`java
Stream<Student> stream = students.stream();
stream.forEach(System.out::println);
stream.count(); // IllegalStateException!

// Stream can only be used once!
\`\`\`

## 6. Kết luận

**Khi nào nên dùng Stream:**
- ✅ Operations đơn giản: filter, map, collect
- ✅ Cần parallel processing
- ✅ Code ngắn gọn, readable

**Khi nào KHÔNG nên dùng:**
- ❌ Operations phức tạp với nhiều side effects
- ❌ Performance critical với small collections
- ❌ Debugging khó (stack trace không rõ ràng)

**Rule of thumb:** Nếu for-loop đơn giản hơn, hãy dùng for-loop!`,
    cover_image: `${BASE_PATH}/images/blog/java-streams.png`,
    tags: "Java,Functional Programming",
    date: "20/12/2024"
  },
  {
    id: 5,
    title: "Java Exception Handling: Best Practices",
    summary: "Cách xử lý exceptions đúng chuẩn trong Java - try-catch, custom exceptions, và error handling patterns.",
    content: `# Java Exception Handling: Best Practices

## 🎯 Exception là gì?

**Exception** là một event xảy ra trong quá trình thực thi chương trình làm gián đoạn flow bình thường.

\`\`\`java
int result = 10 / 0; // ArithmeticException!
\`\`\`

## 1. Hierarchy of Exceptions

\`\`\`
Throwable
├── Error (Unchecked)
│   ├── OutOfMemoryError
│   └── StackOverflowError
└── Exception
    ├── RuntimeException (Unchecked)
    │   ├── NullPointerException
    │   ├── ArrayIndexOutOfBoundsException
    │   └── IllegalArgumentException
    └── Checked Exceptions
        ├── IOException
        ├── SQLException
        └── ClassNotFoundException
\`\`\`

### Checked vs Unchecked

**Checked Exceptions:**
- Compiler bắt buộc phải handle
- Ví dụ: IOException, SQLException

\`\`\`java
// Phải có try-catch hoặc throws
public void readFile() throws IOException {
    FileReader fr = new FileReader("file.txt");
}
\`\`\`

**Unchecked Exceptions:**
- RuntimeException và subclasses
- Không bắt buộc handle

\`\`\`java
// Không bắt buộc try-catch
public void divide(int a, int b) {
    return a / b; // Có thể throw ArithmeticException
}
\`\`\`

## 2. Try-Catch Basics

### Cơ bản

\`\`\`java
try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Cannot divide by zero!");
}
\`\`\`

### Multiple Catch Blocks

\`\`\`java
try {
    String text = null;
    text.length(); // NullPointerException
    int num = Integer.parseInt("abc"); // NumberFormatException
} catch (NullPointerException e) {
    System.out.println("Null value!");
} catch (NumberFormatException e) {
    System.out.println("Invalid number format!");
}
\`\`\`

### Multi-catch (Java 7+)

\`\`\`java
try {
    // some code
} catch (IOException | SQLException e) {
    System.out.println("Database or File error: " + e.getMessage());
}
\`\`\`

### Finally Block

\`\`\`java
FileReader fr = null;
try {
    fr = new FileReader("file.txt");
    // read file
} catch (IOException e) {
    e.printStackTrace();
} finally {
    // ALWAYS execute
    if (fr != null) {
        try {
            fr.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
\`\`\`

### Try-with-resources (Java 7+)

\`\`\`java
// Auto-close resources
try (FileReader fr = new FileReader("file.txt");
     BufferedReader br = new BufferedReader(fr)) {
    String line = br.readLine();
} catch (IOException e) {
    e.printStackTrace();
}
// fr và br tự động close!
\`\`\`

## 3. Custom Exceptions

### Tạo Exception riêng

\`\`\`java
public class InsufficientFundsException extends Exception {
    private double amount;
    
    public InsufficientFundsException(double amount) {
        super("Insufficient funds: " + amount);
        this.amount = amount;
    }
    
    public double getAmount() {
        return amount;
    }
}
\`\`\`

### Sử dụng

\`\`\`java
public class BankAccount {
    private double balance;
    
    public void withdraw(double amount) throws InsufficientFundsException {
        if (amount > balance) {
            throw new InsufficientFundsException(amount - balance);
        }
        balance -= amount;
    }
}

// Client code
try {
    account.withdraw(1000);
} catch (InsufficientFundsException e) {
    System.out.println("Need more: " + e.getAmount());
}
\`\`\`

## 4. Best Practices

### ✅ DO: Catch specific exceptions

\`\`\`java
// GOOD
try {
    // code
} catch (FileNotFoundException e) {
    // Handle file not found
} catch (IOException e) {
    // Handle other IO errors
}

// BAD - Quá general
try {
    // code
} catch (Exception e) { // Catch all!
    // What happened???
}
\`\`\`

### ✅ DO: Provide context in exceptions

\`\`\`java
// GOOD
throw new IllegalArgumentException(
    "User ID must be positive, got: " + userId
);

// BAD - No context
throw new IllegalArgumentException("Invalid input");
\`\`\`

### ✅ DO: Log exceptions properly

\`\`\`java
// GOOD
try {
    // code
} catch (SQLException e) {
    logger.error("Failed to query user with ID: " + userId, e);
    throw new UserNotFoundException("User not found: " + userId);
}

// BAD - Swallow exception
try {
    // code
} catch (Exception e) {
    // Do nothing
}
\`\`\`

### ❌ DON'T: Use exceptions for control flow

\`\`\`java
// BAD
try {
    int i = 0;
    while (true) {
        array[i++];
    }
} catch (ArrayIndexOutOfBoundsException e) {
    // End of array
}

// GOOD
for (int i = 0; i < array.length; i++) {
    // process array[i]
}
\`\`\`

### ❌ DON'T: Catch Throwable or Error

\`\`\`java
// BAD - Don't catch Error!
try {
    // code
} catch (Throwable t) {
    // This catches OutOfMemoryError, StackOverflowError, etc.
}

// GOOD
try {
    // code
} catch (Exception e) {
    // Handle application exceptions only
}
\`\`\`

## 5. Exception Handling Patterns

### Pattern 1: Fail Fast

\`\`\`java
public void processUser(User user) {
    if (user == null) {
        throw new IllegalArgumentException("User cannot be null");
    }
    if (user.getId() < 0) {
        throw new IllegalArgumentException("User ID must be positive");
    }
    // Process user
}
\`\`\`

### Pattern 2: Wrap and Rethrow

\`\`\`java
public User getUser(int id) {
    try {
        return database.queryUser(id);
    } catch (SQLException e) {
        throw new UserNotFoundException("User not found: " + id, e);
    }
}
\`\`\`

### Pattern 3: Retry Mechanism

\`\`\`java
public void fetchDataWithRetry(String url) {
    int maxRetries = 3;
    int attempt = 0;
    
    while (attempt < maxRetries) {
        try {
            fetchData(url);
            return; // Success!
        } catch (NetworkException e) {
            attempt++;
            if (attempt >= maxRetries) {
                throw e; // Give up
            }
            Thread.sleep(1000 * attempt); // Exponential backoff
        }
    }
}
\`\`\`

## 6. Kết luận

**Key Takeaways:**
1. Catch specific exceptions, không catch-all
2. Always provide context trong error messages
3. Đừng dùng exceptions cho control flow
4. Log exceptions trước khi rethrow
5. Use try-with-resources cho auto-closing resources

**Remember:** Good exception handling = Better debugging experience!`,
    cover_image: `${BASE_PATH}/images/blog/java-exceptions.png`,
    tags: "Java,Error Handling",
    date: "23/12/2024"
  },
  {
    id: 6,
    title: "Java Spring Boot cơ bản: REST API đầu tiên",
    summary: "Hướng dẫn từng bước xây dựng REST API với Spring Boot cho người mới bắt đầu. Cấu trúc project chuẩn.",
    content: `# Java Spring Boot cơ bản: REST API đầu tiên

## 🎯 Spring Boot là gì?

**Spring Boot** là framework giúp xây dựng ứng dụng Java nhanh chóng với:
- Auto-configuration
- Embedded server (Tomcat)
- Production-ready features

## 1. Setup Project

### Bước 1: Generate project

Vào [start.spring.io](https://start.spring.io):
- **Project**: Maven
- **Language**: Java
- **Spring Boot**: 3.2.x
- **Dependencies**: Spring Web, Spring Data JPA, PostgreSQL Driver

### Bước 2: Cấu trúc project

\`\`\`
src/main/java/com/example/demo
├── DemoApplication.java       # Main class
├── controller/                # REST Controllers
├── service/                   # Business Logic
├── repository/                # Database Access
└── model/                     # Entity classes

src/main/resources
├── application.properties     # Config
└── application.yml           # Config (alternative)
\`\`\`

## 2. Tạo Entity

\`\`\`java
// model/User.java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    // Getters, Setters, Constructors
}
\`\`\`

## 3. Tạo Repository

\`\`\`java
// repository/UserRepository.java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByNameContaining(String keyword);
}
\`\`\`

**Giải thích:**
- Kế thừa JpaRepository → Có sẵn CRUD methods
- Không cần implement, Spring tự generate!

## 4. Tạo Service Layer

\`\`\`java
// service/UserService.java
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    public User getUserById(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
    
    public User createUser(User user) {
        return userRepository.save(user);
    }
    
    public User updateUser(Long id, User userDetails) {
        User user = getUserById(id);
        user.setName(userDetails.getName());
        user.setEmail(userDetails.getEmail());
        return userRepository.save(user);
    }
    
    public void deleteUser(Long id) {
        User user = getUserById(id);
        userRepository.delete(user);
    }
}
\`\`\`

## 5. Tạo REST Controller

\`\`\`java
// controller/UserController.java
@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;
    
    // GET /api/users
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
    
    // GET /api/users/1
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }
    
    // POST /api/users
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User created = userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
    
    // PUT /api/users/1
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(
        @PathVariable Long id,
        @RequestBody User user
    ) {
        User updated = userService.updateUser(id, user);
        return ResponseEntity.ok(updated);
    }
    
    // DELETE /api/users/1
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
\`\`\`

## 6. Configuration

### application.properties

\`\`\`properties
# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/mydb
spring.datasource.username=postgres
spring.datasource.password=password

# JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# Server
server.port=8080
\`\`\`

## 7. Exception Handling

\`\`\`java
// exception/ResourceNotFoundException.java
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}

// exception/GlobalExceptionHandler.java
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(
        ResourceNotFoundException ex
    ) {
        ErrorResponse error = new ErrorResponse(
            HttpStatus.NOT_FOUND.value(),
            ex.getMessage(),
            LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
}
\`\`\`

## 8. Testing với Postman

### GET All Users
\`\`\`
GET http://localhost:8080/api/users
\`\`\`

### POST Create User
\`\`\`
POST http://localhost:8080/api/users
Content-Type: application/json

{
  "name": "Ngọc Hân",
  "email": "han@example.com"
}
\`\`\`

### PUT Update User
\`\`\`
PUT http://localhost:8080/api/users/1
Content-Type: application/json

{
  "name": "Updated Name",
  "email": "newemail@example.com"
}
\`\`\`

## 9. Best Practices

### DTO Pattern

\`\`\`java
// dto/UserDTO.java
public class UserDTO {
    private Long id;
    private String name;
    private String email;
    // No sensitive fields like password!
}

// mapper/UserMapper.java
@Component
public class UserMapper {
    public UserDTO toDTO(User user) {
        return new UserDTO(user.getId(), user.getName(), user.getEmail());
    }
}
\`\`\`

### Validation

\`\`\`java
@Entity
public class User {
    @NotBlank(message = "Name is required")
    private String name;
    
    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;
}

// Controller
@PostMapping
public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
    // If validation fails, return 400 Bad Request
}
\`\`\`

## 10. Kết luận

**Bạn đã học:**
- ✅ Setup Spring Boot project
- ✅ Entity, Repository, Service, Controller
- ✅ REST API với CRUD operations
- ✅ Exception handling
- ✅ Database configuration

**Next steps:**
- Học Spring Security (authentication)
- Implement pagination & sorting
- Write unit tests với JUnit & Mockito
- Deploy lên Heroku/Railway`,
    cover_image: `${BASE_PATH}/images/blog/spring-boot.png`,
    tags: "Java,Spring Boot,Backend",
    date: "25/12/2024"
  },
  {
    id: 7,
    title: "JavaScript Closures: Hiểu đúng và sử dụng hiệu quả",
    summary: "Closures là một trong những khái niệm khó nhất trong JavaScript. Hãy cùng tìm hiểu chi tiết qua ví dụ thực tế.",
    content: `# JavaScript Closures: Hiểu đúng và sử dụng hiệu quả
  
  ## Closure là gì?
  
  **Closure** là một function có thể "nhớ" và truy cập được lexical scope của nó, ngay cả khi function đó được thực thi bên ngoài scope ban đầu.
  
  ## 1. Ví dụ cơ bản
  
  \`\`\`javascript
  function createCounter() {
    let count = 0;  // Private variable
    
    return function() {
      count++;
      return count;
    };
  }
  
  const counter = createCounter();
  console.log(counter());  // 1
  console.log(counter());  // 2
  console.log(counter());  // 3
  \`\`\`
  
  ## 2. Use Cases thực tế
  
  ### 2.1. Private Variables (Encapsulation)
  
  \`\`\`javascript
  function BankAccount(initialBalance) {
    let balance = initialBalance;  // Private
    
    return {
      deposit: function(amount) {
        balance += amount;
        return balance;
      },
      withdraw: function(amount) {
        if (amount > balance) {
          throw new Error('Insufficient funds');
        }
        balance -= amount;
        return balance;
      },
      getBalance: function() {
        return balance;
      }
    };
  }
  
  const myAccount = BankAccount(1000);
  myAccount.deposit(500);    // 1500
  myAccount.withdraw(200);   // 1300
  // myAccount.balance;      // undefined - không truy cập trực tiếp được!
  \`\`\`
  
  ## 3. Kết luận
  
  **Ưu điểm Closures:**
  - Encapsulation (private variables)
  - Function factory pattern
  - Callback handlers với state
  
  **Nhược điểm:**
  - Có thể gây memory leaks nếu không cẩn thận
  - Khó debug hơn`,
    cover_image: `${BASE_PATH}/images/blog/js-closures.jpg`,
    tags: "JavaScript,Fundamentals",
    date: "18/12/2024"
  },
  {
    id: 8,
    title: "JavaScript Promises và Async/Await toàn tập",
    summary: "Từ callback hell đến async/await - cách viết code bất đồng bộ sạch đẹp và dễ maintain trong JavaScript.",
    content: `# JavaScript Promises và Async/Await toàn tập

## Từ Callback Hell đến Promise

Trước đây, code async thường rơi vào "callback hell":

\`\`\`javascript
getUser(id, (err, user) => {
  if (err) return handleError(err);
  getPosts(user.id, (err, posts) => {
    if (err) return handleError(err);
    getComments(posts[0].id, (err, comments) => {
      // ... tiếp tục lồng sâu
    });
  });
});
\`\`\`

### Promise ra đời

\`\`\`javascript
getUser(id)
  .then(user => getPosts(user.id))
  .then(posts => getComments(posts[0].id))
  .then(comments => console.log(comments))
  .catch(handleError);
\`\`\`

## Async/Await - Đỉnh cao của sự sạch sẽ

\`\`\`javascript
async function fetchData(id) {
  try {
    const user = await getUser(id);
    const posts = await getPosts(user.id);
    const comments = await getComments(posts[0].id);
    console.log(comments);
  } catch (error) {
    handleError(error);
  }
}
\`\`\`

## Parallel Execution

\`\`\`javascript
// Chạy song song
const [user, posts] = await Promise.all([
  getUser(id),
  getPosts(id)
]);
\`\`\`

## Best Practices

- Luôn có \`.catch()\` hoặc \`try/catch\`
- Không mix callback và Promise
- Dùng \`async/await\` cho readability
- Xử lý error tập trung nếu có thể

**Kết luận:** Async/await là cách viết async code hiện đại nhất hiện nay.`,
    cover_image: `${BASE_PATH}/images/blog/js-async.png`,
    tags: "JavaScript,Async",
    date: "22/12/2024"
  },
  {
    id: 9,
    title: "JavaScript ES6+: Arrow Functions và Destructuring",
    summary: "Các tính năng mới của ES6 giúp code JavaScript hiện đại và ngắn gọn hơn. Tại sao nên dùng const/let thay vì var?",
    content: `# JavaScript ES6+: Arrow Functions và Destructuring

## Arrow Functions

### Cú pháp cũ
\`\`\`javascript
function add(a, b) {
  return a + b;
}

// Anonymous
setTimeout(function() {
  console.log('Hello');
}, 1000);
\`\`\`

### Arrow function - Ngắn gọn hơn
\`\`\`javascript
const add = (a, b) => a + b;

setTimeout(() => console.log('Hello'), 1000);
\`\`\`

### Lưu ý về 'this'
Arrow function **không bind this** của riêng nó → rất hữu ích trong callback.

## Destructuring

### Object destructuring
\`\`\`javascript
const user = { name: 'Hân', age: 21, major: 'IT' };

// Cũ
const name = user.name;
const age = user.age;

// Mới
const { name, age, major } = user;
\`\`\`

### Array destructuring
\`\`\`javascript
const scores = [95, 88, 92];

// Lấy phần tử đầu và thứ 3
const [first, , third] = scores;
\`\`\`

### Default values + renaming
\`\`\`javascript
const { name: fullName = 'Anonymous', role = 'student' } = user;
\`\`\`

## Spread & Rest Operator

\`\`\`javascript
// Copy array/object
const newArray = [...oldArray];
const newObj = { ...oldObj, newProp: 'value' };

// Rest parameters
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
\`\`\`

## Let vs Const vs Var

- \`var\`: function scope, hoisting → dễ bug
- \`let\`: block scope, không hoisting
- \`const\`: block scope, không reassign (nhưng object properties có thể thay đổi)

**Rule:** Dùng \`const\` mặc định, chỉ dùng \`let\` khi cần reassign.

## Kết luận

ES6+ giúp code JavaScript:
- Ngắn gọn hơn
- Dễ đọc hơn
- Ít bug hơn
- Hiện đại hơn

Hãy luôn dùng ES6+ trong mọi project mới!`,
    cover_image: `${BASE_PATH}/images/blog/js-es6.jpg`,
    tags: "JavaScript,ES6",
    date: "24/12/2024"
  },
  {
    id: 10,
    title: "JavaScript Design Patterns: Module và Singleton",
    summary: "Các design patterns thường dùng trong JavaScript để tổ chức code tốt hơn, tránh ô nhiễm global scope.",
    content: `# JavaScript Design Patterns: Module và Singleton

## Module Pattern

### Trước ES6: IIFE
\`\`\`javascript
var Counter = (function() {
  var count = 0; // Private

  return {
    increment: function() {
      count++;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
})();

console.log(Counter.increment()); // 1
console.log(Counter.getCount());  // 1
// count không truy cập được từ ngoài!
\`\`\`

### ES6 Modules
\`\`\`javascript
// utils.js
let count = 0;

export const increment = () => count++;
export const getCount = () => count;

// main.js
import { increment, getCount } from './utils.js';
\`\`\`

## Singleton Pattern

Đảm bảo chỉ có **một instance** duy nhất của object.

\`\`\`javascript
const Database = (function() {
  let instance;

  function createInstance() {
    return {
      connect: () => console.log('Connected to DB'),
      query: (sql) => console.log('Query:', sql)
    };
  }

  return {
    getInstance: function() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

const db1 = Database.getInstance();
const db2 = Database.getInstance();
console.log(db1 === db2); // true - cùng một instance!
\`\`\`

## Factory Pattern

\`\`\`javascript
function createUser(type) {
  switch(type) {
    case 'admin':
      return { role: 'admin', permissions: ['read', 'write', 'delete'] };
    case 'user':
      return { role: 'user', permissions: ['read'] };
    default:
      return { role: 'guest', permissions: [] };
  }
}
\`\`\`

## Kết luận

Design patterns giúp:
- Tổ chức code tốt hơn
- Tránh global scope pollution
- Dễ maintain và test
- Reusable code

Dù JavaScript rất linh hoạt, áp dụng patterns đúng cách sẽ giúp project scale tốt hơn.`,
    cover_image: `${BASE_PATH}/images/blog/js-patterns.jpg`,
    tags: "JavaScript,Design Patterns",
    date: "26/12/2024"
  },
  {
    id: 11,
    title: "So sánh Java vs JavaScript: Những lầm tưởng phổ biến",
    summary: "Tuy tên giống nhau nhưng bản chất hoàn toàn khác biệt. Phân tích sự khác biệt về Type System, Runtime và Use cases.",
    content: `# Java vs JavaScript: Những lầm tưởng phổ biến

## Lầm tưởng lớn nhất: Chúng liên quan đến nhau?

**Không!** Chỉ chung tên "Java" do marketing thời 1995. Thực tế:

| Tiêu chí              | Java                              | JavaScript                          |
|-----------------------|-----------------------------------|-------------------------------------|
| Ra đời                | 1995 (Sun Microsystems)           | 1995 (Netscape)                     |
| Mục đích ban đầu      | Ứng dụng desktop, applet          | Làm web tương tác                   |
| Type system           | Static typing                     | Dynamic typing                      |
| Runtime               | JVM (compile to bytecode)         | V8, SpiderMonkey (JIT)              |
| Execution             | Compile trước, run trên JVM       | Interpret/JIT trong browser/engine  |
| Multi-threading       | Native threads                    | Event loop (single-threaded)        |

## So sánh chi tiết

### 1. Type System

**Java (Static):**
\`\`\`java
String name = "Hân";
name = 123; // Compile error!
\`\`\`

**JavaScript (Dynamic):**
\`\`\`javascript
let name = "Hân";
name = 123; // OK → name giờ là number
\`\`\`

### 2. Concurrency Model

**Java:**
- True multi-threading
- Dễ deadlock, race condition
- Phù hợp hệ thống lớn

**JavaScript:**
- Event loop + single thread
- Non-blocking I/O
- Phù hợp web real-time

### 3. Use Cases hiện nay

**Java phổ biến ở:**
- Enterprise backend (Spring Boot)
- Android apps
- Big data (Hadoop, Spark)
- Financial systems

**JavaScript phổ biến ở:**
- Web frontend (React, Vue)
- Full-stack (Node.js)
- Mobile (React Native)
- Desktop (Electron)

## Khi nào chọn cái nào?

**Chọn Java khi:**
- Cần performance cao, ổn định
- Team lớn, enterprise project
- Hệ thống tài chính, ngân hàng
- Android native

**Chọn JavaScript khi:**
- Web application
- Startup, MVP nhanh
- Real-time features
- Full-stack với 1 ngôn ngữ

## Kết luận

- **Không có ngôn ngữ nào "tốt hơn"** - chỉ có phù hợp hơn
- Nhiều developer giỏi cả hai (full-stack Java + Spring + React)
- Tên giống nhau chỉ là lịch sử → đừng nhầm lẫn!

**Advice:** Học cả hai để mở rộng cơ hội việc làm!`,
    cover_image: `${BASE_PATH}/images/blog/java-vs-js.jpg`,
    tags: "Java,JavaScript,Comparison",
    date: "27/12/2024"
  },

  {
    id: 12,
    title: "Xử lý Race Condition trong hệ thống đặt vé với Redis",
    summary: "Case study thực tế: Làm sao đảm bảo chỉ 1 người book được ghế khi 100 users cùng click? Deep dive vào Redis distributed lock.",
    content: `# Xử lý Race Condition trong Hệ thống Đặt Vé
  
  ## 🎯 Bài toán thực tế
  
  Trong dự án **DHL Cinema** (hệ thống đặt vé xem phim real-time), tôi gặp một vấn đề kinh điển:
  
  > **100 người cùng lúc chọn ghế A1. Làm sao đảm bảo chỉ 1 người book thành công?**
  
  Đây là race condition - một trong những bug khó debug nhất trong distributed systems.
  
  ## 🔴 Vấn đề: Race Condition là gì?
  
  ### Kịch bản lỗi:
  
  \`\`\`
  User A: Check ghế A1 → Trống → Bắt đầu booking
  User B: Check ghế A1 → Trống → Bắt đầu booking (cùng lúc)
  ---
  Kết quả: CẢ HAI đều booking thành công! 💥
  \`\`\`
  
  ### Code lỗi (naive approach):
  
  \`\`\`javascript
  // ❌ BAD: Có race condition
  async function bookSeat(seatId, userId) {
    const seat = await db.query('SELECT * FROM seats WHERE id = $1', [seatId]);
    
    if (!seat.is_booked) {
      // 🚨 RACE CONDITION ở đây!
      // Giữa 2 dòng này, user khác có thể chen vào
      await db.query('UPDATE seats SET is_booked = true, user_id = $1 WHERE id = $2', 
        [userId, seatId]);
      return { success: true };
    }
    
    return { success: false, error: 'Ghế đã được đặt' };
  }
  \`\`\`
  
  ## ✅ Giải pháp 1: Database Row-Level Locking
  
  \`\`\`javascript
  // ✅ GOOD: Dùng SELECT FOR UPDATE
  async function bookSeatWithLock(seatId, userId) {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Lock row này, các transaction khác phải đợi
      const result = await client.query(
        'SELECT * FROM seats WHERE id = $1 FOR UPDATE',
        [seatId]
      );
      
      const seat = result.rows[0];
      
      if (!seat.is_booked) {
        await client.query(
          'UPDATE seats SET is_booked = true, user_id = $1 WHERE id = $2',
          [userId, seatId]
        );
        await client.query('COMMIT');
        return { success: true };
      } else {
        await client.query('ROLLBACK');
        return { success: false, error: 'Ghế đã được đặt' };
      }
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
  \`\`\`
  
  **Ưu điểm:**
  - Đơn giản, built-in của PostgreSQL
  - Đảm bảo consistency 100%
  
  **Nhược điểm:**
  - Chỉ hoạt động trong 1 database instance
  - Không scale với microservices
  
  ## 🚀 Giải pháp 2: Redis Distributed Lock (Production-ready)
  
  Đây là giải pháp tôi dùng trong DHL Cinema:
  
  \`\`\`javascript
  const Redis = require('ioredis');
  const redis = new Redis();
  
  // ✅ BEST: Redis distributed lock
  async function bookSeatWithRedis(seatId, userId) {
    const lockKey = \`seat:lock:\${seatId}\`;
    const lockValue = userId; // Để verify owner
    const lockTTL = 30; // 30 giây auto-expire
    
    try {
      // Bước 1: Acquire lock (atomic operation)
      const acquired = await redis.set(
        lockKey,
        lockValue,
        'EX', lockTTL,  // Expire sau 30s
        'NX'            // Chỉ set nếu key chưa tồn tại
      );
      
      if (!acquired) {
        return { 
          success: false, 
          error: 'Ghế đang được xử lý bởi người khác' 
        };
      }
      
      // Bước 2: Check & Update database
      const seat = await db.query('SELECT * FROM seats WHERE id = $1', [seatId]);
      
      if (seat.is_booked) {
        await redis.del(lockKey); // Release lock
        return { success: false, error: 'Ghế đã được đặt' };
      }
      
      await db.query(
        'UPDATE seats SET is_booked = true, user_id = $1 WHERE id = $2',
        [userId, seatId]
      );
      
      // Bước 3: Release lock
      await redis.del(lockKey);
      
      // Bước 4: Broadcast real-time update
      io.to(\`movie:\${movieId}\`).emit('seat:updated', {
        seatId,
        status: 'booked',
        userId
      });
      
      return { success: true };
      
    } catch (error) {
      // Ensure lock được release kể cả khi lỗi
      await redis.del(lockKey);
      throw error;
    }
  }
  \`\`\`
  
  ### Chi tiết Redis SET command:
  
  \`\`\`javascript
  redis.set(key, value, 'EX', seconds, 'NX')
  //       │    │      │     │        │
  //       │    │      │     │        └─ NX = "Set if Not eXists"
  //       │    │      │     └────────── TTL (Time To Live)
  //       │    │      └──────────────── EX = Expire (giây)
  //       │    └─────────────────────── Value để verify owner
  //       └──────────────────────────── Lock key
  \`\`\`
  
  ## ⚡ Real-time Update Flow
  
  \`\`\`
  User A click ghế A1
    ↓
  Redis lock acquired ✅
    ↓
  Database updated
    ↓
  Socket.io broadcast → ALL users nhận update
    ↓
  User B's UI disabled ghế A1 ngay lập tức
    ↓
  Redis lock released
  \`\`\`
  
  ## 🧪 Testing Race Condition
  
  ### Load test với Artillery:
  
  \`\`\`yaml
  # artillery.yml
  config:
    target: "http://localhost:3000"
    phases:
      - duration: 10
        arrivalRate: 10  # 10 users/giây
  
  scenarios:
    - name: "Concurrent seat booking"
      flow:
        - post:
            url: "/api/seats/book"
            json:
              seatId: "A1"
              userId: "{{ $randomString() }}"
  \`\`\`
  
  ### Kết quả test:
  
  | Approach | Requests | Success | Failed | Double Booking |
  |----------|----------|---------|--------|----------------|
  | Naive (no lock) | 100 | 100 ❌ | 0 | 99 ghế |
  | DB Row Lock | 100 | 1 ✅ | 99 ✅ | 0 |
  | Redis Lock | 100 | 1 ✅ | 99 ✅ | 0 |
  
  ## 💡 Lessons Learned
  
  ### 1. **Auto-expiring locks là MUST**
  Không có TTL → user đóng trình duyệt → lock mãi mãi → deadlock
  
  ### 2. **Idempotency matters**
  User spam click → Multiple requests → Cần check trước khi update
  
  ### 3. **Error handling**
  \`\`\`javascript
  // ✅ ALWAYS release lock trong finally block
  try {
    await acquireLock();
    await processBooking();
  } finally {
    await releaseLock(); // Đảm bảo chạy dù có lỗi
  }
  \`\`\`
  
  ## 🎓 Kết luận
  
  **Khi nào dùng cái nào?**
  
  - **Small app, single server**: Database row locking
  - **Production, distributed**: Redis distributed lock
  - **Ultra high-scale**: Thêm queue (RabbitMQ, Kafka)
  
  **Key takeaways:**
  - Race condition xảy ra khi có concurrent writes
  - Lock mechanism là giải pháp chuẩn
  - Testing với load là BẮT BUỘC
  - Redis lock pattern dễ implement và scale tốt
  
  ---
  
  *Code đầy đủ có trong repo: [DHL Cinema GitHub](https://github.com/ntnhan19/Project_MovieTicketBooking_NodeJS)*`,
    cover_image: `${BASE_PATH}/images/blog/race-condition.jpg`,
    tags: "Backend,Distributed Systems,Redis",
    date: "28/12/2024"
  }
];

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