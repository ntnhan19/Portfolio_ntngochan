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

// Lấy danh sách dự án
func (ctrl *ProjectController) GetProjects(c *gin.Context) {
	var projects []models.Project
	// Lấy tất cả dự án, sắp xếp mới nhất lên đầu
	result := ctrl.DB.Order("created_at desc").Find(&projects)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, projects)
}

// Tạo dự án mẫu (để test nhanh)
func (ctrl *ProjectController) CreateSampleData(c *gin.Context) {
	sample := models.Project{
		Title:       "AI RAG Agent System",
		Description: "Hệ thống trích xuất thông tin tài liệu tự động sử dụng LLM và Vector DB.",
		TechStack:   "Python, FastAPI, LangChain, Postgres (pgvector)",
		Category:    "AI/LLM",
		RepoURL:     "https://github.com/ntnhan19/ai-agent",
	}
	ctrl.DB.Create(&sample)
	c.JSON(http.StatusOK, gin.H{"message": "Sample data created!"})
}
