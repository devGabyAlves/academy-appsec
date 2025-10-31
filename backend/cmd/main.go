package main

import (
	"github.com/devGabyAlves/academy-appsec/backend/api"
)

func main() {
	r := api.SetupRouter()
	r.Run(":8080") 
}