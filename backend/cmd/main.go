package main

import (
	"log"

	"github.com/devGabyAlves/academy-appsec/backend/api"
)

func main() {
	r := api.SetupRouter()

	if err := r.Run(":8080"); err != nil {
		log.Fatalf("failed to start server")
	}
}