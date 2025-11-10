package api

import (
	"github.com/devGabyAlves/academy-appsec/backend/internal/handlers"
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) {
	v1 := r.Group("/api/v1")
	{
		v1.POST("/contact", handlers.SendEmailHandler)
	}
}
