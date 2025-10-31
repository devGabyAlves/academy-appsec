package api

import (
	"github.com/devGabyAlves/academy-appsec/backend/internal/handlers"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	router := gin.Default()
	api:= router.Group("/api/v1")

	api.GET("/health", handlers.HealthCheck)

	return router
}
