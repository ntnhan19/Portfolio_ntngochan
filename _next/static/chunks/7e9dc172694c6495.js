(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,33525,(e,t,n)=>{"use strict";Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"warnOnce",{enumerable:!0,get:function(){return r}});let r=e=>{}},98183,(e,t,n)=>{"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r={assign:function(){return c},searchParamsToUrlQuery:function(){return a},urlQueryToSearchParams:function(){return s}};for(var i in r)Object.defineProperty(n,i,{enumerable:!0,get:r[i]});function a(e){let t={};for(let[n,r]of e.entries()){let e=t[n];void 0===e?t[n]=r:Array.isArray(e)?e.push(r):t[n]=[e,r]}return t}function o(e){return"string"==typeof e?e:("number"!=typeof e||isNaN(e))&&"boolean"!=typeof e?"":String(e)}function s(e){let t=new URLSearchParams;for(let[n,r]of Object.entries(e))if(Array.isArray(r))for(let e of r)t.append(n,o(e));else t.set(n,o(r));return t}function c(e,...t){for(let n of t){for(let t of n.keys())e.delete(t);for(let[t,r]of n.entries())e.append(t,r)}return e}},95057,(e,t,n)=>{"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r={formatUrl:function(){return s},formatWithValidation:function(){return u},urlObjectKeys:function(){return c}};for(var i in r)Object.defineProperty(n,i,{enumerable:!0,get:r[i]});let a=e.r(90809)._(e.r(98183)),o=/https?|ftp|gopher|file/;function s(e){let{auth:t,hostname:n}=e,r=e.protocol||"",i=e.pathname||"",s=e.hash||"",c=e.query||"",u=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?u=t+e.host:n&&(u=t+(~n.indexOf(":")?`[${n}]`:n),e.port&&(u+=":"+e.port)),c&&"object"==typeof c&&(c=String(a.urlQueryToSearchParams(c)));let l=e.search||c&&`?${c}`||"";return r&&!r.endsWith(":")&&(r+=":"),e.slashes||(!r||o.test(r))&&!1!==u?(u="//"+(u||""),i&&"/"!==i[0]&&(i="/"+i)):u||(u=""),s&&"#"!==s[0]&&(s="#"+s),l&&"?"!==l[0]&&(l="?"+l),i=i.replace(/[?#]/g,encodeURIComponent),l=l.replace("#","%23"),`${r}${u}${i}${l}${s}`}let c=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function u(e){return s(e)}},18581,(e,t,n)=>{"use strict";Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"useMergedRef",{enumerable:!0,get:function(){return i}});let r=e.r(71645);function i(e,t){let n=(0,r.useRef)(null),i=(0,r.useRef)(null);return(0,r.useCallback)(r=>{if(null===r){let e=n.current;e&&(n.current=null,e());let t=i.current;t&&(i.current=null,t())}else e&&(n.current=a(e,r)),t&&(i.current=a(t,r))},[e,t])}function a(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let n=e(t);return"function"==typeof n?n:()=>e(null)}}("function"==typeof n.default||"object"==typeof n.default&&null!==n.default)&&void 0===n.default.__esModule&&(Object.defineProperty(n.default,"__esModule",{value:!0}),Object.assign(n.default,n),t.exports=n.default)},18967,(e,t,n)=>{"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r={DecodeError:function(){return f},MiddlewareNotFoundError:function(){return S},MissingStaticPage:function(){return b},NormalizeError:function(){return v},PageNotFoundError:function(){return y},SP:function(){return m},ST:function(){return x},WEB_VITALS:function(){return a},execOnce:function(){return o},getDisplayName:function(){return h},getLocationOrigin:function(){return u},getURL:function(){return l},isAbsoluteUrl:function(){return c},isResSent:function(){return g},loadGetInitialProps:function(){return p},normalizeRepeatedSlashes:function(){return d},stringifyError:function(){return k}};for(var i in r)Object.defineProperty(n,i,{enumerable:!0,get:r[i]});let a=["CLS","FCP","FID","INP","LCP","TTFB"];function o(e){let t,n=!1;return(...r)=>(n||(n=!0,t=e(...r)),t)}let s=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,c=e=>s.test(e);function u(){let{protocol:e,hostname:t,port:n}=window.location;return`${e}//${t}${n?":"+n:""}`}function l(){let{href:e}=window.location,t=u();return e.substring(t.length)}function h(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function g(e){return e.finished||e.headersSent}function d(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?`?${t.slice(1).join("?")}`:"")}async function p(e,t){let n=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await p(t.Component,t.ctx)}:{};let r=await e.getInitialProps(t);if(n&&g(n))return r;if(!r)throw Object.defineProperty(Error(`"${h(e)}.getInitialProps()" should resolve to an object. But found "${r}" instead.`),"__NEXT_ERROR_CODE",{value:"E394",enumerable:!1,configurable:!0});return r}let m="undefined"!=typeof performance,x=m&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class f extends Error{}class v extends Error{}class y extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message=`Cannot find module for page: ${e}`}}class b extends Error{constructor(e,t){super(),this.message=`Failed to load static file for page: ${e} ${t}`}}class S extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function k(e){return JSON.stringify({message:e.message,stack:e.stack})}},73668,(e,t,n)=>{"use strict";Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"isLocalURL",{enumerable:!0,get:function(){return a}});let r=e.r(18967),i=e.r(52817);function a(e){if(!(0,r.isAbsoluteUrl)(e))return!0;try{let t=(0,r.getLocationOrigin)(),n=new URL(e,t);return n.origin===t&&(0,i.hasBasePath)(n.pathname)}catch(e){return!1}}},84508,(e,t,n)=>{"use strict";Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"errorOnce",{enumerable:!0,get:function(){return r}});let r=e=>{}},22016,(e,t,n)=>{"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r={default:function(){return f},useLinkStatus:function(){return y}};for(var i in r)Object.defineProperty(n,i,{enumerable:!0,get:r[i]});let a=e.r(90809),o=e.r(43476),s=a._(e.r(71645)),c=e.r(95057),u=e.r(8372),l=e.r(18581),h=e.r(18967),g=e.r(5550);e.r(33525);let d=e.r(91949),p=e.r(73668),m=e.r(9396);function x(e){return"string"==typeof e?e:(0,c.formatUrl)(e)}function f(t){var n;let r,i,a,[c,f]=(0,s.useOptimistic)(d.IDLE_LINK_STATUS),y=(0,s.useRef)(null),{href:b,as:S,children:k,prefetch:C=null,passHref:T,replace:E,shallow:P,scroll:j,onClick:w,onMouseEnter:L,onTouchStart:A,legacyBehavior:R=!1,onNavigate:U,ref:O,unstable_dynamicOnHover:N,...D}=t;r=k,R&&("string"==typeof r||"number"==typeof r)&&(r=(0,o.jsx)("a",{children:r}));let I=s.default.useContext(u.AppRouterContext),B=!1!==C,M=!1!==C?null===(n=C)||"auto"===n?m.FetchStrategy.PPR:m.FetchStrategy.Full:m.FetchStrategy.PPR,{href:G,as:H}=s.default.useMemo(()=>{let e=x(b);return{href:e,as:S?x(S):e}},[b,S]);if(R){if(r?.$$typeof===Symbol.for("react.lazy"))throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."),"__NEXT_ERROR_CODE",{value:"E863",enumerable:!1,configurable:!0});i=s.default.Children.only(r)}let F=R?i&&"object"==typeof i&&i.ref:O,_=s.default.useCallback(e=>(null!==I&&(y.current=(0,d.mountLinkInstance)(e,G,I,M,B,f)),()=>{y.current&&((0,d.unmountLinkForCurrentNavigation)(y.current),y.current=null),(0,d.unmountPrefetchableInstance)(e)}),[B,G,I,M,f]),J={ref:(0,l.useMergedRef)(_,F),onClick(t){R||"function"!=typeof w||w(t),R&&i.props&&"function"==typeof i.props.onClick&&i.props.onClick(t),!I||t.defaultPrevented||function(t,n,r,i,a,o,c){if("undefined"!=typeof window){let u,{nodeName:l}=t.currentTarget;if("A"===l.toUpperCase()&&((u=t.currentTarget.getAttribute("target"))&&"_self"!==u||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which)||t.currentTarget.hasAttribute("download"))return;if(!(0,p.isLocalURL)(n)){a&&(t.preventDefault(),location.replace(n));return}if(t.preventDefault(),c){let e=!1;if(c({preventDefault:()=>{e=!0}}),e)return}let{dispatchNavigateAction:h}=e.r(99781);s.default.startTransition(()=>{h(r||n,a?"replace":"push",o??!0,i.current)})}}(t,G,H,y,E,j,U)},onMouseEnter(e){R||"function"!=typeof L||L(e),R&&i.props&&"function"==typeof i.props.onMouseEnter&&i.props.onMouseEnter(e),I&&B&&(0,d.onNavigationIntent)(e.currentTarget,!0===N)},onTouchStart:function(e){R||"function"!=typeof A||A(e),R&&i.props&&"function"==typeof i.props.onTouchStart&&i.props.onTouchStart(e),I&&B&&(0,d.onNavigationIntent)(e.currentTarget,!0===N)}};return(0,h.isAbsoluteUrl)(H)?J.href=H:R&&!T&&("a"!==i.type||"href"in i.props)||(J.href=(0,g.addBasePath)(H)),a=R?s.default.cloneElement(i,J):(0,o.jsx)("a",{...D,...J,children:r}),(0,o.jsx)(v.Provider,{value:c,children:a})}e.r(84508);let v=(0,s.createContext)(d.IDLE_LINK_STATUS),y=()=>(0,s.useContext)(v);("function"==typeof n.default||"object"==typeof n.default&&null!==n.default)&&void 0===n.default.__esModule&&(Object.defineProperty(n.default,"__esModule",{value:!0}),Object.assign(n.default,n),t.exports=n.default)},22726,75254,e=>{"use strict";let t="/Portfolio_ntngochan",n={full_name:"Nguyễn Trần Ngọc Hân",title:"Sinh viên Kỹ thuật Phần mềm | Ứng viên Backend Developer Intern",bio:`L\xe0 sinh vi\xean năm 4 chuy\xean ng\xe0nh Kỹ thuật Phần mềm tại HUTECH, t\xf4i đ\xe3 x\xe2y dựng nền tảng vững chắc về Backend Development th\xf4ng qua c\xe1c dự \xe1n học thuật v\xe0 tự học.

**Điểm mạnh:**
- X\xe2y dựng RESTful API với Go (Gin) v\xe0 Node.js (Express)
- Thiết kế database schema v\xe0 tối ưu query với PostgreSQL
- Xử l\xfd real-time communication với WebSocket/Socket.io
- L\xe0m việc với AI/LLM: RAG pipeline, Vector Database (Pinecone)

**Mục ti\xeau:** T\xecm kiếm vị tr\xed Backend Developer Intern tại c\xe1c c\xf4ng ty c\xf4ng nghệ để học hỏi kinh nghiệm thực tế về hệ thống quy m\xf4 lớn, microservices architecture v\xe0 best practices từ c\xe1c senior developers.`,email:"ngochanpt2018@gmail.com",github:"https://github.com/ntnhan19",linkedin:"https://linkedin.com/in/nguyentranngochan",avatar:`${t}/avatar.jpg`},r=[{id:1,title:"Hành trình từ .NET sang Go: Tại sao tôi chuyển stack?",summary:"Chia sẻ trải nghiệm học Golang sau 1 năm làm việc với C# .NET. Performance benchmark, learning curve, và những cú sốc văn hóa.",content:`# H\xe0nh tr\xecnh từ .NET sang Go: Tại sao t\xf4i chuyển stack?
  
  ## 🎯 Bối cảnh chuyển đổi
  
  Sau 1 năm l\xe0m việc với **C# v\xe0 .NET Framework** trong c\xe1c dự \xe1n học tập, t\xf4i quyết định học **Golang** v\xe0o th\xe1ng 9/2024. Kh\xf4ng phải v\xec .NET kh\xf4ng tốt, m\xe0 v\xec t\xf4i muốn trải nghiệm một paradigm ho\xe0n to\xe0n kh\xe1c biệt.
  
  ## 📊 So s\xe1nh đầu ti\xean: Hello World Performance
  
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
  
  **Suy nghĩ ban đầu:** "Sao phải check error mọi l\xfac thế n\xe0y? Mệt qu\xe1!"  
  **Sau 2 th\xe1ng:** "Ồ, c\xe1ch n\xe0y gi\xfap t\xf4i handle edge cases tốt hơn nhiều!"
  
  ### 2. Kh\xf4ng c\xf3 Class, chỉ c\xf3 Struct + Methods
  
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
  
  ## 💡 Khi n\xe0o n\xean d\xf9ng Go vs .NET?
  
  ### Chọn Go khi:
  - X\xe2y dựng microservices, API servers
  - Cần performance cao, resource usage thấp
  - L\xe0m việc với concurrent programming nhiều
  - DevOps tools, CLI applications
  
  ### Chọn .NET khi:
  - Enterprise applications với business logic phức tạp
  - Team đ\xe3 quen thuộc với C# ecosystem
  - Cần Entity Framework, LINQ, v\xe0 c\xe1c abstractions cao cấp
  - Windows-first environment
  
  ## 🎓 B\xe0i học r\xfat ra
  
  1. **Simplicity is not easy**: Go c\xf3 \xedt features hơn, nhưng viết code đơn giản đ\xfang c\xe1ch lại kh\xf3
  2. **Performance matters**: Trong m\xf4i trường production, 40% memory savings thực sự quan trọng
  3. **Learning curve**: Go dễ học hơn C# rất nhiều (1 tuần vs 3 th\xe1ng để "fluent")
  
  ## 🚀 Kết luận
  
  T\xf4i kh\xf4ng hối hận khi học Go. Nhưng t\xf4i cũng kh\xf4ng từ bỏ .NET. Mỗi c\xf4ng cụ c\xf3 use case ri\xeang. Quan trọng l\xe0 hiểu **khi n\xe0o d\xf9ng c\xe1i g\xec**.
  
  **Lời khuy\xean cho bạn đọc:** Đừng theo trend m\xf9 qu\xe1ng. H\xe3y thử cả hai v\xe0 tự đ\xe1nh gi\xe1 ph\xf9 hợp với m\xecnh nhất.`,cover_image:`${t}/images/blog/golang_vs_dotnet.jpg`,tags:"Career,Backend,Golang",date:"27/12/2024"},{id:2,title:"3 bài học quý giá từ Hackathon PIONE DREAM 2025",summary:"48 giờ không ngủ, 1 MVP hoàn chỉnh, và những insight quý giá về làm việc nhóm dưới áp lực thời gian.",content:`# 3 b\xe0i học qu\xfd gi\xe1 từ Hackathon PIONE DREAM 2025

## 🏆 Context

V\xe0o th\xe1ng 1/2025, t\xf4i c\xf9ng 2 bạn trong lớp tham gia **PIONE DREAM HACKATHON** do HUTECH tổ chức. Theme của năm nay l\xe0 **"Smart City Solutions"**.

**Team của ch\xfang t\xf4i:**
- T\xf4i: Backend Developer (Go + PostgreSQL)
- Bạn A: Frontend Developer (React + TailwindCSS)
- Bạn B: UI/UX Designer + PM

**\xdd tưởng:** Web app gi\xfap người d\xe2n b\xe1o c\xe1o c\xe1c vấn đề về hạ tầng đ\xf4 thị (ổ g\xe0, đ\xe8n đường hỏng, r\xe1c thải...) với geolocation v\xe0 status tracking real-time.

## ⏰ Timeline 48 giờ

### Giờ 0-6: Brainstorming & Setup
- Tranh luận nảy lửa về tech stack
- T\xf4i nhất quyết d\xf9ng Go thay v\xec Node.js (v\xec tự tin hơn)
- Setup Dockerized dev environment
- Thiết kế database schema

### Giờ 6-24: Coding Marathon
- T\xf4i code API endpoints li\xean tục
- Mắc bug lớn: Forgot to handle CORS properly
- Frontend kh\xf4ng gọi được API → mất 2 giờ debug

### Giờ 24-36: Integration Hell
- Merge code từ 2 branches → conflict ở mọi file
- Database migration failed → rollback → panic
- Team gần như bỏ cuộc l\xfac 3h s\xe1ng

### Giờ 36-48: The Final Push
- Deploy l\xean Railway (thay v\xec Heroku v\xec free tier tốt hơn)
- Viết pitch deck vội v\xe0ng
- Rehearse presentation 5 lần

## 📚 3 B\xc0I HỌC QUAN TRỌNG

### B\xe0i học #1: Communication > Coding Skills

**Vấn đề:** T\xf4i code xong API endpoint **/ reports** nhưng qu\xean th\xf4ng b\xe1o cho Frontend.

**Hậu quả:** Frontend dev viết mock data, l\xe3ng ph\xed 3 giờ.

**Giải ph\xe1p học được:**
- D\xf9ng **Notion** để track tasks real-time
- Mỗi 2 giờ c\xf3 1 sync meeting ngắn (5 ph\xfat)
- Document API endpoints trong **Postman Collection** ngay khi code xong

### B\xe0i học #2: Perfect is the enemy of done

**Vấn đề:** T\xf4i muốn implement **JWT refresh token** + **Redis caching**.

**Thực tế:** Hackathon chỉ cần MVP chạy được, kh\xf4ng cần production-ready.

**Giải ph\xe1p:**
- D\xf9ng simple JWT, kh\xf4ng c\xf3 refresh token
- Cache in-memory thay v\xec Redis
- Focus on features that judges will see: UI demo, pitch deck

### B\xe0i học #3: Technical debt is OK in hackathons

**Code t\xf4i viết trong hackathon:**
\`\`\`go
// TODO: Refactor this later
if err != nil {
    log.Println(err) // Just log, no proper error handling
    return
}

// Hardcoded config (should use env vars)
db, _ := sql.Open("postgres", "postgresql://user:pass@localhost/db")
\`\`\`

**Suy nghĩ ban đầu:** "Code n\xe0y qu\xe1 tệ, phải refactor!"

**B\xe0i học:** Hackathon kh\xf4ng phải production. Ship first, refactor never (trong context n\xe0y).

## 🎯 Kết quả

- **Giải Ba** (trong 15 teams)
- **Feedback từ judges:** "\xdd tưởng hay, demo mượt, nhưng thiếu business model"
- **Prize:** 3,000,000 VNĐ + Certificate

## 💭 Reflection

**Điều t\xf4i l\xe0m đ\xfang:**
- Chọn tech stack m\xecnh th\xe0nh thạo
- Kh\xf4ng spend time v\xe0o features kh\xf4ng quan trọng
- Team chemistry tốt (quan trọng nhất)

**Điều t\xf4i l\xe0m sai:**
- Kh\xf4ng ngủ → L\xe0m việc inefficient v\xe0o giờ 30-40
- Qu\xe1 focus v\xe0o backend → Pitch deck yếu

**Lời khuy\xean cho lần sau:**
1. Sleep at least 4 hours
2. Spend 50% time on pitch, not just coding
3. Use simpler tech stack (even if less "cool")

## 🚀 Tổng kết

Hackathon dạy t\xf4i những thứ m\xe0 kh\xf4ng một m\xf4n học n\xe0o dạy được:
- L\xe0m việc dưới pressure
- Prioritization khi resources limited
- Team collaboration in chaos

**Worth it?** Absolutely. Sẽ tham gia lần nữa năm sau!`,cover_image:`${t}/images/blog/hackathon.jpg`,tags:"Experience,Hackathon,Soft Skills",date:"26/12/2024"},{id:3,title:"Java Collections Framework: ArrayList vs LinkedList",summary:"So sánh chi tiết hiệu năng và cách sử dụng ArrayList và LinkedList trong Java. Khi nào nên dùng cái nào để tối ưu bộ nhớ?",content:`# Java Collections Framework: ArrayList vs LinkedList

## Giới thiệu

ArrayList v\xe0 LinkedList l\xe0 2 implementation phổ biến của List interface trong Java. Hiểu r\xf5 sự kh\xe1c biệt giữa ch\xfang gi\xfap chọn đ\xfang data structure cho từng b\xe0i to\xe1n.

## 1. Cấu tr\xfac dữ liệu

### ArrayList
- Sử dụng **dynamic array** b\xean trong
- C\xe1c phần tử được lưu **li\xean tiếp** trong bộ nhớ
- K\xedch thước tăng tự động (capacity x 1.5 khi đầy)

\`\`\`java
ArrayList<String> list = new ArrayList<>();
list.add("Java");  // O(1) - amortized
list.get(0);       // O(1) - truy cập trực tiếp
\`\`\`

### LinkedList
- Sử dụng **doubly linked list**
- Mỗi node chứa: data, pointer đến next v\xe0 previous
- Kh\xf4ng cần memory li\xean tiếp

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

*: Amortized time - đ\xf4i khi O(n) khi resize

## 3. Khi n\xe0o d\xf9ng c\xe1i n\xe0o?

### D\xf9ng ArrayList khi:
- Cần **truy cập random** nhiều (get/set by index)
- Th\xeam/x\xf3a chủ yếu ở **cuối list**
- Memory overhead thấp hơn

### D\xf9ng LinkedList khi:
- Th\xeam/x\xf3a **ở đầu** list thường xuy\xean
- Duyệt tuần tự (iterator)
- Kh\xf4ng cần random access

## 4. V\xed dụ thực tế

\`\`\`java
// ArrayList - Truy cập nhanh
List<Student> students = new ArrayList<>();
students.add(new Student("Nam", 20));
students.add(new Student("H\xe2n", 21));

// Truy cập index nhanh O(1)
Student first = students.get(0);

// LinkedList - Th\xeam/x\xf3a đầu nhanh
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
- **LinkedList**: Chỉ khi cần thao t\xe1c đầu/cuối thường xuy\xean
- Lu\xf4n benchmark với data thực tế!

**Rule of thumb:** Nếu nghi ngờ, d\xf9ng ArrayList.`,cover_image:`${t}/images/blog/java-collections.png`,tags:"Java,Data Structures",date:"15/12/2024"},{id:4,title:"Java Stream API: Lập trình hàm trong Java 8+",summary:"Stream API giúp code Java ngắn gọn và dễ đọc hơn. Tìm hiểu cách sử dụng map, filter, reduce hiệu quả.",content:`# Java Stream API: Lập tr\xecnh h\xe0m trong Java 8+

## 🎯 Tại sao cần Stream API?

Trước Java 8, để xử l\xfd collection, ch\xfang ta phải viết nhiều boilerplate code:

\`\`\`java
// C\xe1ch cũ: T\xecm sinh vi\xean c\xf3 điểm > 8.0
List<Student> topStudents = new ArrayList<>();
for (Student student : students) {
    if (student.getGrade() > 8.0) {
        topStudents.add(student);
    }
}

// C\xe1ch mới với Stream (Java 8+)
List<Student> topStudents = students.stream()
    .filter(s -> s.getGrade() > 8.0)
    .collect(Collectors.toList());
\`\`\`

**Ưu điểm:**
- Code ngắn gọn, dễ đọc hơn
- Hỗ trợ parallel processing dễ d\xe0ng
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
Operations kết th\xfac stream v\xe0 trả về kết quả:

\`\`\`java
students.stream()
    .filter(s -> s.getGrade() > 8.0)
    .count();                    // Terminal → return long

students.stream()
    .filter(s -> s.getGrade() > 8.0)
    .forEach(System.out::println); // Terminal → return void
\`\`\`

### 1.3. Short-circuiting Operations
Operations dừng sớm khi t\xecm được kết quả:

\`\`\`java
boolean hasTopStudent = students.stream()
    .anyMatch(s -> s.getGrade() > 9.5); // Dừng ngay khi t\xecm thấy

Optional<Student> first = students.stream()
    .filter(s -> s.getAge() < 18)
    .findFirst(); // Dừng sau khi t\xecm được 1 phần tử
\`\`\`

## 2. C\xe1c operations phổ biến

### map() - Transform elements

\`\`\`java
// Lấy danh s\xe1ch t\xean sinh vi\xean
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
// Sinh vi\xean > 20 tuổi
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
// T\xednh tổng điểm
double totalGrade = students.stream()
    .map(Student::getGrade)
    .reduce(0.0, Double::sum);

// T\xecm max
Optional<Double> maxGrade = students.stream()
    .map(Student::getGrade)
    .reduce(Double::max);

// Concatenate strings
String allNames = students.stream()
    .map(Student::getName)
    .reduce("", (a, b) -> a + ", " + b);
\`\`\`

## 3. Collectors - Xử l\xfd kết quả

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
// Chia th\xe0nh 2 nh\xf3m: pass/fail
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
// Result: "[Nam, H\xe2n, Trung]"

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

**⚠️ Cảnh b\xe1o:**
- Chỉ d\xf9ng parallel với operations **stateless** v\xe0 **no side-effects**
- Kh\xf4ng tự \xfd d\xf9ng parallel, benchmark trước!

## 5. Common Pitfalls

### ❌ KH\xd4NG l\xe0m thế n\xe0y:

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

**Khi n\xe0o n\xean d\xf9ng Stream:**
- ✅ Operations đơn giản: filter, map, collect
- ✅ Cần parallel processing
- ✅ Code ngắn gọn, readable

**Khi n\xe0o KH\xd4NG n\xean d\xf9ng:**
- ❌ Operations phức tạp với nhiều side effects
- ❌ Performance critical với small collections
- ❌ Debugging kh\xf3 (stack trace kh\xf4ng r\xf5 r\xe0ng)

**Rule of thumb:** Nếu for-loop đơn giản hơn, h\xe3y d\xf9ng for-loop!`,cover_image:`${t}/images/blog/java-streams.png`,tags:"Java,Functional Programming",date:"20/12/2024"},{id:5,title:"Java Exception Handling: Best Practices",summary:"Cách xử lý exceptions đúng chuẩn trong Java - try-catch, custom exceptions, và error handling patterns.",content:`# Java Exception Handling: Best Practices

## 🎯 Exception l\xe0 g\xec?

**Exception** l\xe0 một event xảy ra trong qu\xe1 tr\xecnh thực thi chương tr\xecnh l\xe0m gi\xe1n đoạn flow b\xecnh thường.

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
- V\xed dụ: IOException, SQLException

\`\`\`java
// Phải c\xf3 try-catch hoặc throws
public void readFile() throws IOException {
    FileReader fr = new FileReader("file.txt");
}
\`\`\`

**Unchecked Exceptions:**
- RuntimeException v\xe0 subclasses
- Kh\xf4ng bắt buộc handle

\`\`\`java
// Kh\xf4ng bắt buộc try-catch
public void divide(int a, int b) {
    return a / b; // C\xf3 thể throw ArithmeticException
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
// fr v\xe0 br tự động close!
\`\`\`

## 3. Custom Exceptions

### Tạo Exception ri\xeang

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

// BAD - Qu\xe1 general
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
1. Catch specific exceptions, kh\xf4ng catch-all
2. Always provide context trong error messages
3. Đừng d\xf9ng exceptions cho control flow
4. Log exceptions trước khi rethrow
5. Use try-with-resources cho auto-closing resources

**Remember:** Good exception handling = Better debugging experience!`,cover_image:`${t}/images/blog/java-exceptions.png`,tags:"Java,Error Handling",date:"23/12/2024"},{id:6,title:"Java Spring Boot cơ bản: REST API đầu tiên",summary:"Hướng dẫn từng bước xây dựng REST API với Spring Boot cho người mới bắt đầu. Cấu trúc project chuẩn.",content:`# Java Spring Boot cơ bản: REST API đầu ti\xean

## 🎯 Spring Boot l\xe0 g\xec?

**Spring Boot** l\xe0 framework gi\xfap x\xe2y dựng ứng dụng Java nhanh ch\xf3ng với:
- Auto-configuration
- Embedded server (Tomcat)
- Production-ready features

## 1. Setup Project

### Bước 1: Generate project

V\xe0o [start.spring.io](https://start.spring.io):
- **Project**: Maven
- **Language**: Java
- **Spring Boot**: 3.2.x
- **Dependencies**: Spring Web, Spring Data JPA, PostgreSQL Driver

### Bước 2: Cấu tr\xfac project

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

**Giải th\xedch:**
- Kế thừa JpaRepository → C\xf3 sẵn CRUD methods
- Kh\xf4ng cần implement, Spring tự generate!

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
  "name": "Ngọc H\xe2n",
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

**Bạn đ\xe3 học:**
- ✅ Setup Spring Boot project
- ✅ Entity, Repository, Service, Controller
- ✅ REST API với CRUD operations
- ✅ Exception handling
- ✅ Database configuration

**Next steps:**
- Học Spring Security (authentication)
- Implement pagination & sorting
- Write unit tests với JUnit & Mockito
- Deploy l\xean Heroku/Railway`,cover_image:`${t}/images/blog/spring-boot.png`,tags:"Java,Spring Boot,Backend",date:"25/12/2024"},{id:7,title:"JavaScript Closures: Hiểu đúng và sử dụng hiệu quả",summary:"Closures là một trong những khái niệm khó nhất trong JavaScript. Hãy cùng tìm hiểu chi tiết qua ví dụ thực tế.",content:`# JavaScript Closures: Hiểu đ\xfang v\xe0 sử dụng hiệu quả
  
  ## Closure l\xe0 g\xec?
  
  **Closure** l\xe0 một function c\xf3 thể "nhớ" v\xe0 truy cập được lexical scope của n\xf3, ngay cả khi function đ\xf3 được thực thi b\xean ngo\xe0i scope ban đầu.
  
  ## 1. V\xed dụ cơ bản
  
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
  // myAccount.balance;      // undefined - kh\xf4ng truy cập trực tiếp được!
  \`\`\`
  
  ## 3. Kết luận
  
  **Ưu điểm Closures:**
  - Encapsulation (private variables)
  - Function factory pattern
  - Callback handlers với state
  
  **Nhược điểm:**
  - C\xf3 thể g\xe2y memory leaks nếu kh\xf4ng cẩn thận
  - Kh\xf3 debug hơn`,cover_image:`${t}/images/blog/js-closures.jpg`,tags:"JavaScript,Fundamentals",date:"18/12/2024"},{id:8,title:"JavaScript Promises và Async/Await toàn tập",summary:"Từ callback hell đến async/await - cách viết code bất đồng bộ sạch đẹp và dễ maintain trong JavaScript.",content:`# JavaScript Promises v\xe0 Async/Await to\xe0n tập

## Từ Callback Hell đến Promise

Trước đ\xe2y, code async thường rơi v\xe0o "callback hell":

\`\`\`javascript
getUser(id, (err, user) => {
  if (err) return handleError(err);
  getPosts(user.id, (err, posts) => {
    if (err) return handleError(err);
    getComments(posts[0].id, (err, comments) => {
      // ... tiếp tục lồng s\xe2u
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

- Lu\xf4n c\xf3 \`.catch()\` hoặc \`try/catch\`
- Kh\xf4ng mix callback v\xe0 Promise
- D\xf9ng \`async/await\` cho readability
- Xử l\xfd error tập trung nếu c\xf3 thể

**Kết luận:** Async/await l\xe0 c\xe1ch viết async code hiện đại nhất hiện nay.`,cover_image:`${t}/images/blog/js-async.png`,tags:"JavaScript,Async",date:"22/12/2024"},{id:9,title:"JavaScript ES6+: Arrow Functions và Destructuring",summary:"Các tính năng mới của ES6 giúp code JavaScript hiện đại và ngắn gọn hơn. Tại sao nên dùng const/let thay vì var?",content:`# JavaScript ES6+: Arrow Functions v\xe0 Destructuring

## Arrow Functions

### C\xfa ph\xe1p cũ
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

### Lưu \xfd về 'this'
Arrow function **kh\xf4ng bind this** của ri\xeang n\xf3 → rất hữu \xedch trong callback.

## Destructuring

### Object destructuring
\`\`\`javascript
const user = { name: 'H\xe2n', age: 21, major: 'IT' };

// Cũ
const name = user.name;
const age = user.age;

// Mới
const { name, age, major } = user;
\`\`\`

### Array destructuring
\`\`\`javascript
const scores = [95, 88, 92];

// Lấy phần tử đầu v\xe0 thứ 3
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
- \`let\`: block scope, kh\xf4ng hoisting
- \`const\`: block scope, kh\xf4ng reassign (nhưng object properties c\xf3 thể thay đổi)

**Rule:** D\xf9ng \`const\` mặc định, chỉ d\xf9ng \`let\` khi cần reassign.

## Kết luận

ES6+ gi\xfap code JavaScript:
- Ngắn gọn hơn
- Dễ đọc hơn
- \xcdt bug hơn
- Hiện đại hơn

H\xe3y lu\xf4n d\xf9ng ES6+ trong mọi project mới!`,cover_image:`${t}/images/blog/js-es6.jpg`,tags:"JavaScript,ES6",date:"24/12/2024"},{id:10,title:"JavaScript Design Patterns: Module và Singleton",summary:"Các design patterns thường dùng trong JavaScript để tổ chức code tốt hơn, tránh ô nhiễm global scope.",content:`# JavaScript Design Patterns: Module v\xe0 Singleton

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
// count kh\xf4ng truy cập được từ ngo\xe0i!
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

Đảm bảo chỉ c\xf3 **một instance** duy nhất của object.

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
console.log(db1 === db2); // true - c\xf9ng một instance!
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

Design patterns gi\xfap:
- Tổ chức code tốt hơn
- Tr\xe1nh global scope pollution
- Dễ maintain v\xe0 test
- Reusable code

D\xf9 JavaScript rất linh hoạt, \xe1p dụng patterns đ\xfang c\xe1ch sẽ gi\xfap project scale tốt hơn.`,cover_image:`${t}/images/blog/js-patterns.jpg`,tags:"JavaScript,Design Patterns",date:"26/12/2024"},{id:11,title:"So sánh Java vs JavaScript: Những lầm tưởng phổ biến",summary:"Tuy tên giống nhau nhưng bản chất hoàn toàn khác biệt. Phân tích sự khác biệt về Type System, Runtime và Use cases.",content:`# Java vs JavaScript: Những lầm tưởng phổ biến

## Lầm tưởng lớn nhất: Ch\xfang li\xean quan đến nhau?

**Kh\xf4ng!** Chỉ chung t\xean "Java" do marketing thời 1995. Thực tế:

| Ti\xeau ch\xed              | Java                              | JavaScript                          |
|-----------------------|-----------------------------------|-------------------------------------|
| Ra đời                | 1995 (Sun Microsystems)           | 1995 (Netscape)                     |
| Mục đ\xedch ban đầu      | Ứng dụng desktop, applet          | L\xe0m web tương t\xe1c                   |
| Type system           | Static typing                     | Dynamic typing                      |
| Runtime               | JVM (compile to bytecode)         | V8, SpiderMonkey (JIT)              |
| Execution             | Compile trước, run tr\xean JVM       | Interpret/JIT trong browser/engine  |
| Multi-threading       | Native threads                    | Event loop (single-threaded)        |

## So s\xe1nh chi tiết

### 1. Type System

**Java (Static):**
\`\`\`java
String name = "H\xe2n";
name = 123; // Compile error!
\`\`\`

**JavaScript (Dynamic):**
\`\`\`javascript
let name = "H\xe2n";
name = 123; // OK → name giờ l\xe0 number
\`\`\`

### 2. Concurrency Model

**Java:**
- True multi-threading
- Dễ deadlock, race condition
- Ph\xf9 hợp hệ thống lớn

**JavaScript:**
- Event loop + single thread
- Non-blocking I/O
- Ph\xf9 hợp web real-time

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

## Khi n\xe0o chọn c\xe1i n\xe0o?

**Chọn Java khi:**
- Cần performance cao, ổn định
- Team lớn, enterprise project
- Hệ thống t\xe0i ch\xednh, ng\xe2n h\xe0ng
- Android native

**Chọn JavaScript khi:**
- Web application
- Startup, MVP nhanh
- Real-time features
- Full-stack với 1 ng\xf4n ngữ

## Kết luận

- **Kh\xf4ng c\xf3 ng\xf4n ngữ n\xe0o "tốt hơn"** - chỉ c\xf3 ph\xf9 hợp hơn
- Nhiều developer giỏi cả hai (full-stack Java + Spring + React)
- T\xean giống nhau chỉ l\xe0 lịch sử → đừng nhầm lẫn!

**Advice:** Học cả hai để mở rộng cơ hội việc l\xe0m!`,cover_image:`${t}/images/blog/java-vs-js.jpg`,tags:"Java,JavaScript,Comparison",date:"27/12/2024"}],i=[{id:1,title:"DocMentor - AI RAG Knowledge Assistant",description:"Ứng dụng AI Assistant hỗ trợ trả lời câu hỏi từ tài liệu PDF/DOCX sử dụng công nghệ RAG và Vector Database. Đồ án môn Trí tuệ nhân tạo.",content:`## 🎯 Bối cảnh dự \xe1n

Đ\xe2y l\xe0 dự \xe1n của học phần **Đồ \xc1n Chuy\xean Ng\xe0nh** học kỳ 1 năm 2025. B\xe0i to\xe1n đặt ra: Sinh vi\xean v\xe0 giảng vi\xean thường phải đọc h\xe0ng trăm trang t\xe0i liệu để t\xecm th\xf4ng tin cần thiết. L\xe0m sao để AI c\xf3 thể "đọc hiểu" t\xe0i liệu v\xe0 trả lời c\xe2u hỏi ch\xednh x\xe1c?

## 🏗️ Kiến tr\xfac hệ thống

### Tech Stack
- **Backend**: Python FastAPI
- **AI Framework**: LangChain
- **LLM**: Google Gemini Pro (miễn ph\xed cho sinh vi\xean)
- **Vector Database**: Pinecone (Free tier)
- **Frontend**: React.js + Tailwind CSS

### Luồng hoạt động

1. User upload PDF/DOCX
2. Backend chia nhỏ document th\xe0nh chunks (512 tokens, overlap 50)
3. Sử dụng Sentence Transformers để tạo embeddings
4. Lưu embeddings v\xe0o Pinecone
5. User đặt c\xe2u hỏi → Vector search t\xecm chunks li\xean quan
6. Gemini Pro generate c\xe2u trả lời dựa tr\xean context

## ⚙️ T\xednh năng đ\xe3 thực hiện

### 1. Document Processing
- Upload PDF, DOCX, TXT (max 10MB)
- Chunking th\xf4ng minh với RecursiveCharacterTextSplitter
- Extract metadata (t\xean file, số trang, ng\xe0y tạo)

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
- ✅ Xử l\xfd th\xe0nh c\xf4ng 95% documents được test (50 files)
- ✅ Trả lời ch\xednh x\xe1c với c\xe2u hỏi li\xean quan trực tiếp đến nội dung
- ✅ Response time trung b\xecnh: 3-5 gi\xe2y

**Về mặt học thuật:**
- Đạt điểm 9/10 cho học phần Đồ \xc1n Chuy\xean Ng\xe0nh
- Được thầy đ\xe1nh gi\xe1 cao về khả năng apply l\xfd thuyết v\xe0o thực tế
- Present trước lớp v\xe0 nhận feedback t\xedch cực

## 💡 Những g\xec đ\xe3 học được

### 1. Technical Skills
- Hiểu r\xf5 c\xe1ch LLM hoạt động v\xe0 limitations
- Học c\xe1ch l\xe0m việc với Vector Database
- Tối ưu cost khi call API (cache, batch processing)

### 2. Problem Solving
- **Vấn đề:** Chunking kh\xf4ng tốt l\xe0m mất ngữ cảnh
  - **Giải ph\xe1p:** Th\xeam overlap v\xe0 metadata cho mỗi chunk
- **Vấn đề:** Gemini đ\xf4i khi "hallucinate" (bịa đặt th\xf4ng tin)
  - **Giải ph\xe1p:** Th\xeam instruction "chỉ trả lời dựa tr\xean context, nếu kh\xf4ng biết th\xec n\xf3i kh\xf4ng biết"

### 3. Soft Skills
- L\xe0m việc nh\xf3m 3 người, ph\xe2n chia task r\xf5 r\xe0ng
- Present demo trước 40+ bạn v\xe0 2 giảng vi\xean
- Viết document kỹ thuật đầy đủ`,tech_stack:"Python, FastAPI, LangChain, Google Gemini API, Pinecone, React.js",category:"AI/Machine Learning",repo_url:"https://github.com/ntnhan19/DocMentor",image_url:`${t}/images/projects/docmentor.png`,highlights:"Academic Project,RAG Pipeline,Vector Search",duration:"3 tháng (Sep - Dec 2025)",team_size:"3 người"},{id:2,title:"DHL Cinema - Hệ thống đặt vé xem phim Real-time",description:"Web application đặt vé xem phim với WebSocket, xử lý race condition khi nhiều người cùng chọn ghế. Đồ án môn Lập trình mạng.",content:`## 🎯 Bối cảnh dự \xe1n

Đ\xe2y l\xe0 dự \xe1n của học phần **Đồ \xc1n Cơ Sở** học kỳ 1 năm 2024. Giảng vi\xean đặt y\xeau cầu: X\xe2y dựng một hệ thống c\xf3 t\xednh năng real-time v\xe0 phải xử l\xfd được vấn đề race condition.

**B\xe0i to\xe1n cụ thể:** Khi 100 người c\xf9ng l\xfac chọn 1 ghế trong rạp chiếu phim, l\xe0m sao đảm bảo chỉ 1 người book th\xe0nh c\xf4ng?

## 🏗️ Kiến tr\xfac hệ thống

### Tech Stack
- **Backend**: Node.js + Express.js
- **Real-time**: Socket.io (WebSocket)
- **Database**: PostgreSQL
- **Cache & Locking**: Redis
- **Frontend**: React.js + Context API

### Sơ đồ luồng xử l\xfd

Client chọn ghế
    ↓
Socket.io emit 'select-seat'
    ↓
Server check Redis lock
    ↓
Nếu lock th\xe0nh c\xf4ng → Update PostgreSQL → Broadcast
Nếu lock thất bại → Return error

## ⚙️ Giải ph\xe1p kỹ thuật

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
  throw new Error('Ghế đ\xe3 được chọn');
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
- **Test case:** 100 users c\xf9ng l\xfac chọn 1 ghế
- **Kết quả:** Chỉ 1 request th\xe0nh c\xf4ng, 99 requests nhận error
- **Response time:** 150-200ms
- **Zero double booking:** ✅

### Test thực tế
- Mời 10 bạn c\xf9ng lớp test đồng thời
- Kết quả: Hệ thống hoạt động ổn định
- Feedback: UI real-time mượt m\xe0

## 💡 Những g\xec đ\xe3 học được

### 1. Technical Knowledge
- Hiểu s\xe2u về WebSocket v\xe0 c\xe1ch n\xf3 kh\xe1c HTTP
- Học c\xe1ch implement distributed lock pattern
- Thực h\xe0nh database transaction v\xe0 row-level locking

### 2. Debugging Skills
- **Bug 1:** Redis lock kh\xf4ng release khi server crash
  - **Fix:** D\xf9ng EXPIRE để auto-release
- **Bug 2:** WebSocket disconnect/reconnect li\xean tục
  - **Fix:** Implement heartbeat mechanism

## 🏆 Kết quả đạt được

- Điểm đồ \xe1n: 9.0/10

## 🎓 Reflection

Dự \xe1n n\xe0y gi\xfap t\xf4i hiểu rằng:
- Distributed systems kh\xf4ng đơn giản như tưởng
- Testing với race condition cần cẩn thận v\xe0 c\xf3 methodology
- Real-world problems thường phức tạp hơn l\xfd thuyết rất nhiều`,tech_stack:"Node.js, Express, Socket.io, PostgreSQL, Redis",category:"Network Programming",repo_url:"https://github.com/ntnhan19/Project_MovieTicketBooking_NodeJS",image_url:`${t}/images/projects/cinema.png`,highlights:"Academic Project,Real-time System,Race Condition Handling",duration:"3 tháng (Mar - Jun 2025)",team_size:"3 người"}],a=[{id:1,name:"Sinh viên 5 Tốt Cấp Khoa",issuer:"Đại học Công nghệ TP.HCM (HUTECH)",type:"Title",date:"2024",image_url:`${t}/images/certs/sv5tot.jpg`},{id:2,name:"Sinh viên Tiêu Biểu Cấp Khoa",issuer:"Khoa Công nghệ Thông tin - HUTECH",type:"Title",date:"2024",image_url:`${t}/images/certs/svtbieu.jpg`},{id:3,name:"Networking Basics",issuer:"Cisco Networking Academy",type:"Course",date:"Tháng 12/2024",image_url:`${t}/images/certs/cisco_basics.jpg`,url:"https://www.credly.com/badges/849ccbed-8429-4e57-a3be-e3177f447cce/public_url"},{id:4,name:"JavaScript Essentials 1",issuer:"Cisco Networking Academy",type:"Course",date:"Tháng 12/2024",image_url:`${t}/images/certs/javascript1.jpg`,url:"https://www.credly.com/badges/04dcaaad-cc55-4403-af59-ad15cd36150f/public_url"},{id:5,name:"JavaScript Essentials 2",issuer:"Cisco Networking Academy",type:"Course",date:"Tháng 12/2024",image_url:`${t}/images/certs/javascript2.jpg`,url:"https://www.credly.com/badges/7b330edf-fa4c-46d6-ac25-74e50e2c3773/public_url"},{id:6,name:"Giải Ba - Cuộc thi Genz's Thinking",issuer:"CLB Đổi mới Sáng tạo HUTECH",type:"Award",date:"Tháng 10/2024",image_url:`${t}/images/certs/genz_award.jpg`},{id:7,name:"Giải Ba - PIONE DREAM HACKATHON 2025",issuer:"Đại học HUTECH",type:"Award",date:"Tháng 1/2025",image_url:`${t}/images/certs/pionehackathon.jpg`}],o=[{id:1,name:"Hội Thao Sinh Viên HUTECH 2024",role:"Vận động viên - Đội Bóng Đá Nữ Khoa CNTT",description:"Tham gia thi đấu bộ môn Bóng đá nữ, đạt giải Nhì toàn trường. Hoạt động rèn luyện sức khỏe, tinh thần đồng đội và kết nối với các bạn sinh viên khác khoa.",date:"Tháng 3/2024",image_url:`${t}/images/activities/hoithao.jpg`},{id:2,name:"Tết Đầy Đủ - Xuân Trọn Vẹn 2025",role:"Tình nguyện viên - Liên Chi Hội Khoa CNTT",description:"Tham gia gói quà Tết cho người nghèo tại Thành phố Hồ Chí Minh. Hoạt động kéo dài 2 ngày với 50+ tình nguyện viên, gói được 500+ phần quà.",date:"Tháng 1/2025",image_url:`${t}/images/activities/tinhnguyenvien.png`}];e.s(["activities",0,o,"blogPosts",0,r,"certificates",0,a,"profile",0,n,"projects",0,i],22726);var s=e.i(71645);let c=e=>{let t=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,n)=>n?n.toUpperCase():t.toLowerCase());return t.charAt(0).toUpperCase()+t.slice(1)},u=(...e)=>e.filter((e,t,n)=>!!e&&""!==e.trim()&&n.indexOf(e)===t).join(" ").trim();var l={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let h=(0,s.forwardRef)(({color:e="currentColor",size:t=24,strokeWidth:n=2,absoluteStrokeWidth:r,className:i="",children:a,iconNode:o,...c},h)=>(0,s.createElement)("svg",{ref:h,...l,width:t,height:t,stroke:e,strokeWidth:r?24*Number(n)/Number(t):n,className:u("lucide",i),...!a&&!(e=>{for(let t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0})(c)&&{"aria-hidden":"true"},...c},[...o.map(([e,t])=>(0,s.createElement)(e,t)),...Array.isArray(a)?a:[a]])),g=(e,t)=>{let n=(0,s.forwardRef)(({className:n,...r},i)=>(0,s.createElement)(h,{ref:i,iconNode:t,className:u(`lucide-${c(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${e}`,n),...r}));return n.displayName=c(e),n};e.s(["default",()=>g],75254)}]);