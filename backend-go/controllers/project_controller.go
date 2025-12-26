package controllers

import (
	"net/http"
	"portfolio-backend/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type ProjectController struct {
	DB *gorm.DB
}

// 1. Get Projects
func (ctrl *ProjectController) GetProjects(c *gin.Context) {
	var projects []models.Project
	ctrl.DB.Order("created_at desc").Find(&projects)
	c.JSON(http.StatusOK, projects)
}

// 2. Get Profile
func (ctrl *ProjectController) GetProfile(c *gin.Context) {
	var profile models.Profile
	ctrl.DB.First(&profile)
	c.JSON(http.StatusOK, profile)
}

// 3. Get Certificates
func (ctrl *ProjectController) GetCertificates(c *gin.Context) {
	var certs []models.Certificate
	ctrl.DB.Order("id desc").Find(&certs)
	c.JSON(http.StatusOK, certs)
}

// 4. API MỚI: Get Activities (Hoạt động ngoại khóa)
func (ctrl *ProjectController) GetActivities(c *gin.Context) {
	var activities []models.Activity
	ctrl.DB.Order("id desc").Find(&activities)
	c.JSON(http.StatusOK, activities)
}

// 5. Get Blog Posts
func (ctrl *ProjectController) GetBlogPosts(c *gin.Context) {
	var posts []models.BlogPost
	ctrl.DB.Order("created_at desc").Find(&posts)
	c.JSON(http.StatusOK, posts)
}

// 5. NẠP DỮ LIỆU FULL (Chạy lại để update DB)
func (ctrl *ProjectController) CreateSampleData(c *gin.Context) {
	// --- A. Profile ---
	profile := models.Profile{
		FullName: "Nguyen Tran Ngoc Han",
		Title:    "Software Engineer | Full-Stack Developer",
		Bio:      "Sinh viên năm 4 Kỹ thuật phần mềm tại HUTECH. Đam mê xây dựng các hệ thống Backend hiệu năng cao, ứng dụng AI thực tế và tối ưu hóa hệ thống mạng.",
		Email:    "ngochanpt2018@gmail.com",
		Github:   "https://github.com/ntnhan19",
		LinkedIn: "https://linkedin.com/in/nguyentranngochan",
	}
	ctrl.DB.FirstOrCreate(&profile, models.Profile{Email: "ngochanpt2018@gmail.com"})

	// --- B. Projects (Đã thêm ImageUrl) ---
	projects := []models.Project{
		{
			Title:       "DocMentor - AI RAG Knowledge Base Agent",
			Description: "Trợ lý AI trích xuất thông tin tài liệu tự động sử dụng LLM & Vector DB.",
			Content:     "## Chi tiết...\n(Nội dung Markdown)",
			TechStack:   "Python, FastAPI, LangChain, React.js",
			Category:    "AI/LLM",
			RepoURL:     "https://github.com/ntnhan19/DocMentor",
			ImageUrl:    "/images/projects/docmentor.png", // <--- Ảnh minh họa
		},
		{
			Title:       "DHL Cinema - Real-time Movie Ticket Booking",
			Description: "Hệ thống đặt vé xem phim thời gian thực, xử lý Race Condition với Socket.io.",
			Content:     "## Bài toán Race Condition...\n(Nội dung Markdown)",
			TechStack:   "Node.js, Express, Socket.io, PostgreSQL",
			Category:    "Network Programming",
			RepoURL:     "https://github.com/ntnhan19/Project_MovieTicketBooking_NodeJS",
			ImageUrl:    "/images/projects/cinema.png", // <--- Ảnh minh họa
		},
	}
	for _, p := range projects {
		// Dùng Where để tìm và update nếu đã có, hoặc tạo mới
		var exist models.Project
		if err := ctrl.DB.Where("title = ?", p.Title).First(&exist).Error; err == nil {
			ctrl.DB.Model(&exist).Updates(p) // Update ảnh nếu đã tồn tại
		} else {
			ctrl.DB.Create(&p)
		}
	}

	// --- C. Certificates (Đã thêm ImageUrl) ---
	certs := []models.Certificate{
		{
			Name:     "Sinh viên 5 Tốt Cấp Khoa",
			Issuer:   "HUTECH University",
			Type:     "Title",
			Date:     "2024",
			ImageUrl: "/images/certs/sv5tot.jpg",
		},
		{
			Name:     "Sinh viên Tiêu Biểu Cấp Khoa",
			Issuer:   "HUTECH University",
			Type:     "Title",
			Date:     "2024",
			ImageUrl: "/images/certs/svtbieu.jpg",
		},
		{
			Name:     "Networking Basics (CCNA)",
			Issuer:   "Cisco",
			Type:     "Course",
			Date:     "2025",
			ImageUrl: "/images/certs/cisco_basics.jpg",
		},
		{
			Name:     "JavaScript Essentials 1 & 2",
			Issuer:   "Cisco",
			Type:     "Course",
			Date:     "2025",
			ImageUrl: "/images/certs/cisco_js.jpg",
		},
		{
			Name:     "Top 3 - Genz's Thinking",
			Issuer:   "HUTECH Club",
			Type:     "Award",
			Date:     "2024",
			ImageUrl: "/images/certs/genz_award.jpg",
		},
		{
			Name:     "Top 3 - PIONE DREAM HACKATHON 2025",
			Issuer:   "HUTECH University",
			Type:     "Award",
			Date:     "2025",
			ImageUrl: "/images/certs/pionehackathon.jpg",
		},
		{
			Name:     "Top 7 - Tư Tưởng Hồ Chí Minh",
			Issuer:   "HUTECH University",
			Type:     "Award",
			Date:     "2024",
			ImageUrl: "/images/certs/hcm_award.jpg",
		},
	}
	for _, c := range certs {
		ctrl.DB.FirstOrCreate(&c, models.Certificate{Name: c.Name})
	}

	// --- D. Activities (THÊM HỘI THAO & NGOẠI KHÓA) ---
	activities := []models.Activity{
		{
			Name:        "Hội Thao Sinh Viên HUTECH 2024",
			Role:        "Vận động viên",
			Description: "Tham gia thi đấu bộ môn Cầu Lông và Chạy bền, đạt giải Khuyến khích nội dung đôi nam nữ.",
			Date:        "Mar 2024",
			ImageUrl:    "/images/activities/hoithao.jpg",
		},
		{
			Name:        "Mùa Hè Xanh 2024",
			Role:        "Tình nguyện viên",
			Description: "Tham gia đội hình dạy Tin học cho trẻ em và hỗ trợ chuyển đổi số tại địa phương.",
			Date:        "Jul 2024",
			ImageUrl:    "/images/activities/muahexanh.jpg",
		},
	}
	for _, a := range activities {
		ctrl.DB.FirstOrCreate(&a, models.Activity{Name: a.Name})
	}

	// --- E. Blog Posts (MỚI TINH) ---
	posts := []models.BlogPost{
		{
			Title:      "Hành trình từ .NET sang Go: Tại sao tôi thay đổi?",
			Summary:    "Chia sẻ trải nghiệm học Golang sau 2 năm code C#. Những cú sốc văn hóa và hiệu năng bất ngờ.",
			Content:    "Nội dung Markdown...",
			CoverImage: "/images/blog/golang_vs_dotnet.jpg",
			Tags:       "Tech, Career",
			Date:       "Dec 2025",
		},
		{
			Title:      "Review Hackathon PIONE DREAM 2025",
			Summary:    "48 giờ không ngủ và bài học quý giá về làm việc nhóm dưới áp lực cao.",
			Content:    "Nội dung Markdown...",
			CoverImage: "/images/blog/hackathon.jpg",
			Tags:       "Experience, Life",
			Date:       "Jan 2025",
		},
	}
	for _, p := range posts {
		ctrl.DB.FirstOrCreate(&p, models.BlogPost{Title: p.Title})
	}

	c.JSON(http.StatusOK, gin.H{"message": "Data seeded successfully!"})
}
