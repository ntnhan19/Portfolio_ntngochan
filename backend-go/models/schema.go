package models

import (
	"time"
	"gorm.io/gorm"
)

// Project: Lưu thông tin các dự án (AI, Movie Booking, IELTS...)
type Project struct {
	ID          uint           `json:"id" gorm:"primaryKey"`
	Title       string         `json:"title"`
	Description string         `json:"description"` // Tóm tắt ngắn
	Content     string         `json:"content"`     // Nội dung chi tiết (Markdown cho bài báo cáo)
	TechStack   string         `json:"tech_stack"`  // VD: "Go, Gin, React"
	Category    string         `json:"category"`    // VD: "AI/RAG", "Network Programming", "Enterprise"
	RepoURL     string         `json:"repo_url"`
	DemoURL     string         `json:"demo_url"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `json:"deleted_at" gorm:"index"`
}

// Profile: Thông tin cá nhân (Lấy từ CV)
type Profile struct {
	ID       uint   `json:"id" gorm:"primaryKey"`
	FullName string `json:"full_name"`
	Title    string `json:"title"`   // "AI Engineer | Full-stack Developer"
	Bio      string `json:"bio"`     // Giới thiệu bản thân
	Email    string `json:"email"`
	Github   string `json:"github"`
	LinkedIn string `json:"linkedin"`
}