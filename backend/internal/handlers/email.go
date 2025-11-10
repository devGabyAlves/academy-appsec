package handlers

import (
	"net/http"

	"github.com/devGabyAlves/academy-appsec/backend/internal/services"
	"github.com/gin-gonic/gin"
)

type ContactForm struct {
	Name    string `json:"name" binding:"required"`
	Email   string `json:"email" binding:"required,email"`
	Message string `json:"message" binding:"required"`
}

func SendEmailHandler(c *gin.Context) {
	var form ContactForm

	if err := c.ShouldBindJSON(&form); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Dados inválidos"})
		return
	}
	if err := services.SendContactEmail(form.Name, form.Email, form.Message); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Falha ao enviar email"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Email enviado!"})
}
