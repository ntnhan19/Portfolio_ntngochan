package models

import (
	"time"

	"gorm.io/gorm"
)

// 1. Cập nhật Project: Thêm ImageUrl
type Project struct {
	ID          uint           `json:"id" gorm:"primaryKey"`
	Title       string         `json:"title"`
	Description string         `json:"description"`
	Content     string         `json:"content"`
	TechStack   string         `json:"tech_stack"`
	Category    string         `json:"category"`
	RepoURL     string         `json:"repo_url"`
	DemoURL     string         `json:"demo_url"`
	ImageUrl    string         `json:"image_url"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `json:"deleted_at" gorm:"index"`
}

// 2. Cập nhật Certificate: Thêm ImageUrl
type Certificate struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Name      string    `json:"name"`
	Issuer    string    `json:"issuer"`
	Type      string    `json:"type"`
	Date      string    `json:"date"`
	Url       string    `json:"url"`
	ImageUrl  string    `json:"image_url"`
	CreatedAt time.Time `json:"created_at"`
}

// 3. MỚI: Bảng Hoạt động ngoại khóa
type Activity struct {
	ID          uint   `json:"id" gorm:"primaryKey"`
	Name        string `json:"name"`        // VD: "Mùa Hè Xanh 2024"
	Role        string `json:"role"`        // VD: "Tình nguyện viên", "Ban tổ chức"
	Description string `json:"description"` // Mô tả ngắn hoạt động
	ImageUrl    string `json:"image_url"`   // Ảnh chụp hoạt động
	Date        string `json:"date"`        // VD: "Aug 2024"
}

// Profile giữ nguyên
type Profile struct {
	ID       uint   `json:"id" gorm:"primaryKey"`
	FullName string `json:"full_name"`
	Title    string `json:"title"`
	Bio      string `json:"bio"`
	Email    string `json:"email"`
	Github   string `json:"github"`
	LinkedIn string `json:"linkedin"`
}

type BlogPost struct {
	ID         uint           `json:"id" gorm:"primaryKey"`
	Title      string         `json:"title"`
	Summary    string         `json:"summary"`     // Tóm tắt hiển thị ngoài trang chủ
	Content    string         `json:"content"`     // Nội dung chi tiết (Markdown)
	CoverImage string         `json:"cover_image"` // Ảnh bìa bài viết
	Tags       string         `json:"tags"`        // VD: "Learning, Career, Tech"
	Date       string         `json:"date"`        // VD: "Oct 2025"
	CreatedAt  time.Time      `json:"created_at"`
	DeletedAt  gorm.DeletedAt `json:"deleted_at" gorm:"index"`
}
