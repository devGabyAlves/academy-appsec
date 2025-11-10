package main

import (
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"

	"github.com/devGabyAlves/academy-appsec/backend/api"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func loadEnv() {
	if _, err := os.Stat(".env"); err == nil {
		if err := godotenv.Load(".env"); err == nil {
			return
		}
	}
}

func main() {
	loadEnv()

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"POST", "GET", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	api.RegisterRoutes(r)

	if err := r.Run(":8080"); err != nil {
		log.Fatalf("Failed to start server")
	}
}