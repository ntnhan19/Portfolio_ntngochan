// src/data/staticData.ts
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
  title: "Sinh viên Kỹ thuật Phần mềm | Đam mê lập trình Java & JavaScript",
  bio: `Xin chào! Tôi là Hân, sinh viên năm 4 chuyên ngành Kỹ thuật Phần mềm tại HUTECH.
  
  **Về tôi:**
  - Đam mê lập trình Java (Spring Boot) và JavaScript (React, Node.js)
  - Thích chia sẻ kiến thức qua blog cá nhân
  - Tham gia các dự án học thuật và hackathon
  
  **Mục tiêu:**
  - Trở thành Backend Developer chuyên nghiệp
  - Đóng góp vào cộng đồng lập trình Việt Nam
  - Học hỏi và phát triển kỹ năng mỗi ngày`,
  email: "ngochanpt2018@gmail.com",
  github: "https://github.com/ntnhan19",
  linkedin: "https://linkedin.com/in/nguyentranngochan"
};

export const blogPosts = [
  {
    id: 1,
    title: "Java Collections Framework: ArrayList vs LinkedList",
    summary: "So sánh chi tiết hiệu năng và cách sử dụng ArrayList và LinkedList trong Java. Khi nào nên dùng cái nào?",
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
  | \`get(index)\` | O(1) | O(n) |
  | \`add(element)\` | O(1)* | O(1) |
  | \`add(index, element)\` | O(n) | O(n) |
  | \`remove(index)\` | O(n) | O(n) |
  
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
  
  ## 5. Kết luận
  
  - **ArrayList**: Default choice cho hầu hết trường hợp
  - **LinkedList**: Chỉ khi cần thao tác đầu/cuối thường xuyên
  - Luôn benchmark với data thực tế!
  
  ## Tham khảo
  - [Java Docs - ArrayList](https://docs.oracle.com/javase/8/docs/api/java/util/ArrayList.html)
  - [Java Docs - LinkedList](https://docs.oracle.com/javase/8/docs/api/java/util/LinkedList.html)`,
    cover_image: "/images/blog/java-collections.jpg",
    tags: "Java,Data Structures",
    date: "15/12/2024"
  },
  {
    id: 2,
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
  
  **Giải thích:**
  - Inner function "nhớ" được biến \`count\`
  - \`count\` không bị garbage collected
  - Mỗi lần gọi \`counter()\` đều access được \`count\`
  
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
  
  ### 2.2. Function Factory
  
  \`\`\`javascript
  function makeMultiplier(factor) {
    return function(number) {
      return number * factor;
    };
  }
  
  const double = makeMultiplier(2);
  const triple = makeMultiplier(3);
  
  console.log(double(5));   // 10
  console.log(triple(5));   // 15
  \`\`\`
  
  ### 2.3. Event Handlers với private state
  
  \`\`\`javascript
  function setupButton(buttonId) {
    let clickCount = 0;
    
    document.getElementById(buttonId).addEventListener('click', function() {
      clickCount++;
      console.log(\`Button clicked \${clickCount} times\`);
    });
  }
  
  setupButton('myButton');
  \`\`\`
  
  ## 3. Common Pitfalls
  
  ### Pitfall 1: Loop với var
  
  \`\`\`javascript
  // ❌ SAI
  for (var i = 0; i < 3; i++) {
    setTimeout(function() {
      console.log(i);  // In ra: 3, 3, 3
    }, 1000);
  }
  
  // ✅ ĐÚNG - Dùng let
  for (let i = 0; i < 3; i++) {
    setTimeout(function() {
      console.log(i);  // In ra: 0, 1, 2
    }, 1000);
  }
  
  // ✅ ĐÚNG - Dùng IIFE
  for (var i = 0; i < 3; i++) {
    (function(j) {
      setTimeout(function() {
        console.log(j);  // In ra: 0, 1, 2
      }, 1000);
    })(i);
  }
  \`\`\`
  
  ### Pitfall 2: Memory Leaks
  
  \`\`\`javascript
  // ❌ Có thể gây memory leak
  function attachHandler() {
    let largeData = new Array(1000000).fill('data');
    
    document.getElementById('btn').addEventListener('click', function() {
      console.log('Clicked');
      // largeData vẫn bị giữ trong memory!
    });
  }
  
  // ✅ Giải phóng memory
  function attachHandler() {
    let largeData = new Array(1000000).fill('data');
    
    const handler = function() {
      console.log('Clicked');
    };
    
    document.getElementById('btn').addEventListener('click', handler);
    largeData = null;  // Giải phóng
  }
  \`\`\`
  
  ## 4. Kết luận
  
  **Ưu điểm Closures:**
  - Encapsulation (private variables)
  - Function factory pattern
  - Callback handlers với state
  
  **Nhược điểm:**
  - Có thể gây memory leaks nếu không cẩn thận
  - Khó debug hơn
  - Performance overhead nhỏ
  
  **Best Practices:**
  - Chỉ dùng khi thực sự cần private state
  - Tránh tạo closures trong loop với var
  - Luôn null-ify large objects khi không cần
  
  ## Tham khảo
  - [MDN - Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
  - [You Don't Know JS - Scope & Closures](https://github.com/getify/You-Dont-Know-JS)`,
    cover_image: "/images/blog/js-closures.jpg",
    tags: "JavaScript,Fundamentals",
    date: "18/12/2024"
  },
  {
    id: 3,
    title: "Java Stream API: Lập trình hàm trong Java 8+",
    summary: "Stream API giúp code Java ngắn gọn và dễ đọc hơn. Tìm hiểu cách sử dụng map, filter, reduce hiệu quả.",
    content: `# Java Stream API: Lập trình hàm trong Java 8+
  
  ## Giới thiệu Stream API
  
  Stream API (Java 8+) cho phép xử lý collections theo phong cách **functional programming**, giúp code ngắn gọn và dễ đọc hơn.
  
  ## 1. Tạo Stream
  
  \`\`\`java
  // Từ Collection
  List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
  Stream<Integer> stream = numbers.stream();
  
  // Từ Array
  String[] names = {"Nam", "Hân", "Linh"};
  Stream<String> nameStream = Arrays.stream(names);
  
  // Từ values trực tiếp
  Stream<String> stream = Stream.of("A", "B", "C");
  
  // Infinite stream
  Stream<Integer> infiniteStream = Stream.iterate(0, n -> n + 1);
  \`\`\`
  
  ## 2. Intermediate Operations (Lazy)
  
  ### 2.1. filter() - Lọc phần tử
  
  \`\`\`java
  List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6);
  
  List<Integer> evenNumbers = numbers.stream()
      .filter(n -> n % 2 == 0)
      .collect(Collectors.toList());
  // Result: [2, 4, 6]
  \`\`\`
  
  ### 2.2. map() - Transform
  
  \`\`\`java
  List<String> names = Arrays.asList("nam", "hân", "linh");
  
  List<String> upperNames = names.stream()
      .map(String::toUpperCase)
      .collect(Collectors.toList());
  // Result: ["NAM", "HÂN", "LINH"]
  \`\`\`
  
  ### 2.3. flatMap() - Flatten nested structures
  
  \`\`\`java
  List<List<Integer>> nestedList = Arrays.asList(
      Arrays.asList(1, 2),
      Arrays.asList(3, 4),
      Arrays.asList(5, 6)
  );
  
  List<Integer> flatList = nestedList.stream()
      .flatMap(Collection::stream)
      .collect(Collectors.toList());
  // Result: [1, 2, 3, 4, 5, 6]
  \`\`\`
  
  ## 3. Terminal Operations (Eager)
  
  ### 3.1. collect() - Thu thập kết quả
  
  \`\`\`java
  List<String> names = Arrays.asList("Nam", "Hân", "Linh");
  
  // To List
  List<String> list = names.stream().collect(Collectors.toList());
  
  // To Set
  Set<String> set = names.stream().collect(Collectors.toSet());
  
  // To Map
  Map<String, Integer> nameLength = names.stream()
      .collect(Collectors.toMap(
          name -> name,
          String::length
      ));
  \`\`\`
  
  ### 3.2. reduce() - Gộp thành 1 giá trị
  
  \`\`\`java
  List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
  
  // Tổng
  int sum = numbers.stream()
      .reduce(0, (a, b) -> a + b);
  // Result: 15
  
  // Tích
  int product = numbers.stream()
      .reduce(1, (a, b) -> a * b);
  // Result: 120
  
  // Max
  Optional<Integer> max = numbers.stream()
      .reduce(Integer::max);
  \`\`\`
  
  ### 3.3. forEach() - Thực hiện action
  
  \`\`\`java
  List<String> names = Arrays.asList("Nam", "Hân", "Linh");
  
  names.stream()
      .forEach(System.out::println);
  \`\`\`
  
  ## 4. Ví dụ thực tế
  
  ### Ví dụ 1: Xử lý danh sách Student
  
  \`\`\`java
  class Student {
      String name;
      int age;
      double gpa;
      
      // Constructor, getters, setters
  }
  
  List<Student> students = Arrays.asList(
      new Student("Nam", 20, 3.5),
      new Student("Hân", 21, 3.8),
      new Student("Linh", 19, 3.2)
  );
  
  // Tìm sinh viên GPA > 3.5
  List<Student> topStudents = students.stream()
      .filter(s -> s.getGpa() > 3.5)
      .collect(Collectors.toList());
  
  // Tính GPA trung bình
  double avgGPA = students.stream()
      .mapToDouble(Student::getGpa)
      .average()
      .orElse(0.0);
  
  // Lấy danh sách tên, sắp xếp theo tuổi
  List<String> sortedNames = students.stream()
      .sorted(Comparator.comparing(Student::getAge))
      .map(Student::getName)
      .collect(Collectors.toList());
  \`\`\`
  
  ### Ví dụ 2: Group By
  
  \`\`\`java
  // Nhóm sinh viên theo độ tuổi
  Map<Integer, List<Student>> byAge = students.stream()
      .collect(Collectors.groupingBy(Student::getAge));
  
  // Nhóm và đếm
  Map<Integer, Long> countByAge = students.stream()
      .collect(Collectors.groupingBy(
          Student::getAge,
          Collectors.counting()
      ));
  \`\`\`
  
  ## 5. Performance Tips
  
  ### Sử dụng Parallel Stream
  
  \`\`\`java
  // Sequential (mặc định)
  long count = list.stream()
      .filter(...)
      .count();
  
  // Parallel (multi-thread)
  long count = list.parallelStream()
      .filter(...)
      .count();
  \`\`\`
  
  **Khi nào dùng parallelStream():**
  - Dataset lớn (> 10,000 elements)
  - Operations CPU-intensive
  - Không có shared mutable state
  
  **Khi KHÔNG nên dùng:**
  - Dataset nhỏ (overhead > benefit)
  - I/O operations
  - Order-dependent operations
  
  ## 6. Kết luận
  
  **Ưu điểm Stream API:**
  - Code ngắn gọn, dễ đọc
  - Lazy evaluation (hiệu quả)
  - Có thể parallel dễ dàng
  
  **Nhược điểm:**
  - Debug khó hơn
  - Learning curve cao hơn loop thông thường
  
  **Best Practices:**
  - Ưu tiên Stream cho operations phức tạp
  - Dùng loop thông thường cho simple cases
  - Cẩn thận với parallelStream()
  
  ## Tham khảo
  - [Java Docs - Stream API](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html)
  - [Baeldung - Java 8 Streams](https://www.baeldung.com/java-8-streams)`,
    cover_image: "/images/blog/java-streams.jpg",
    tags: "Java,Functional Programming",
    date: "20/12/2024"
  },
  // ... Thêm 6 bài nữa tương tự
  {
    id: 4,
    title: "JavaScript Promises và Async/Await: Xử lý bất đồng bộ",
    summary: "Từ callback hell đến async/await - cách viết code bất đồng bộ sạch đẹp trong JavaScript.",
    content: `# JavaScript Promises và Async/Await
  
  ## Coming soon - Bài viết đang hoàn thiện...`,
    cover_image: "/images/blog/js-async.jpg",
    tags: "JavaScript,Async",
    date: "22/12/2024"
  },
  {
    id: 5,
    title: "Java Exception Handling: Best Practices",
    summary: "Cách xử lý exceptions đúng chuẩn trong Java - try-catch, custom exceptions, và error handling patterns.",
    content: `# Java Exception Handling Best Practices
  
  ## Coming soon - Bài viết đang hoàn thiện...`,
    cover_image: "/images/blog/java-exceptions.jpg",
    tags: "Java,Error Handling",
    date: "23/12/2024"
  },
  {
    id: 6,
    title: "JavaScript ES6+: Arrow Functions và Destructuring",
    summary: "Các tính năng mới của ES6 giúp code JavaScript hiện đại và ngắn gọn hơn.",
    content: `# JavaScript ES6+ Features
  
  ## Coming soon - Bài viết đang hoàn thiện...`,
    cover_image: "/images/blog/js-es6.jpg",
    tags: "JavaScript,ES6",
    date: "24/12/2024"
  },
  {
    id: 7,
    title: "Java Spring Boot cơ bản: REST API đầu tiên",
    summary: "Hướng dẫn từng bước xây dựng REST API với Spring Boot cho người mới bắt đầu.",
    content: `# Spring Boot REST API Tutorial
  
  ## Coming soon - Bài viết đang hoàn thiện...`,
    cover_image: "/images/blog/spring-boot.jpg",
    tags: "Java,Spring Boot",
    date: "25/12/2024"
  },
  {
    id: 8,
    title: "JavaScript Design Patterns: Module và Singleton",
    summary: "Các design patterns thường dùng trong JavaScript để tổ chức code tốt hơn.",
    content: `# JavaScript Design Patterns
  
  ## Coming soon - Bài viết đang hoàn thiện...`,
    cover_image: "/images/blog/js-patterns.jpg",
    tags: "JavaScript,Design Patterns",
    date: "26/12/2024"
  },
  {
    id: 9,
    title: "Java vs JavaScript: So sánh chi tiết cho người mới",
    summary: "Giải đáp thắc mắc: Java và JavaScript khác nhau như thế nào? Nên học cái nào trước?",
    content: `# Java vs JavaScript: Chi tiết từ A-Z
  
  ## Coming soon - Bài viết đang hoàn thiện...`,
    cover_image: "/images/blog/java-vs-js.jpg",
    tags: "Java,JavaScript,Comparison",
    date: "27/12/2024"
  }
];

export const projects: Project[] = [
  {
    id: 1,
    title: "Java Spring MVC Blog System",
    description: "Hệ thống blog đầy đủ với Spring MVC, Hibernate và MySQL. Quản lý bài viết, comment và user authentication.",
    content: "## Chi tiết dự án...",
    tech_stack: "Java, Spring MVC, Hibernate, MySQL, Bootstrap",
    category: "Java Web",
    repo_url: "https://github.com/ntnhan19",
    image_url: "/images/projects/java-blog.jpg",
    highlights: "Academic Project,Spring MVC,Authentication",
    duration: "2 tháng",
    team_size: "2 người"
  },
  {
    id: 2,
    title: "JavaScript Task Manager SPA",
    description: "Single Page Application quản lý công việc với vanilla JavaScript, localStorage và drag-and-drop.",
    content: "## Chi tiết dự án...",
    tech_stack: "JavaScript, HTML5, CSS3, LocalStorage",
    category: "JavaScript Web",
    repo_url: "https://github.com/ntnhan19",
    image_url: "/images/projects/js-taskmanager.jpg",
    highlights: "Academic Project,SPA,Drag and Drop",
    duration: "1 tháng",
    team_size: "Solo"
  }
];

export const certificates = [
  {
    id: 1,
    name: "Java Programming Certificate",
    issuer: "HUTECH University",
    type: "Course",
    date: "Tháng 6/2024",
    image_url: "/images/certs/java-cert.jpg"
  },
  {
    id: 2,
    name: "JavaScript Essentials",
    issuer: "Cisco Networking Academy",
    type: "Course",
    date: "Tháng 12/2024",
    image_url: "/images/certs/javascript2.jpg",
    url: "https://www.credly.com/badges/7b330edf-fa4c-46d6-ac25-74e50e2c3773/public_url"
  }
];

export const activities = [
  {
    id: 1,
    name: "Coding Club HUTECH",
    role: "Thành viên",
    description: "Tham gia các buổi workshop về Java và JavaScript, chia sẻ kiến thức với các bạn sinh viên khác.",
    date: "2024",
    image_url: "/images/activities/coding-club.jpg"
  }
];