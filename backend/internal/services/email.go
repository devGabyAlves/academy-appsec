package services

import (
	"fmt"
	"log"
	"net/smtp"
	"os"
	"strings"
)

func sanitizeEmailContent(input string) string {
	input = strings.ReplaceAll(input, "\r", "")
	input = strings.ReplaceAll(input, "\n", " ")
	return strings.TrimSpace(input)
}

func SendContactEmail(name, email, message string) error {
	from := os.Getenv("SMTP_USER")
	password := os.Getenv("SMTP_PASS")
	to := os.Getenv("CONTACT_RECEIVER")
	smtpHost := os.Getenv("SMTP_HOST")
	smtpPort := os.Getenv("SMTP_PORT")

	auth := smtp.PlainAuth("", from, password, smtpHost)
	safeName := sanitizeEmailContent(name)
	safeEmail := sanitizeEmailContent(email)
	safeMessage := sanitizeEmailContent(message)

	subject := "Novo contato recebido no site"
	body := fmt.Sprintf(
		"Nome: %s\nEmail: %s\n\nMensagem:\n%s",
		safeName, safeEmail, safeMessage,
	)

	msg := "From: " + from + "\r\n" +
		"To: " + to + "\r\n" +
		"Subject: " + subject + "\r\n" +
		"MIME-Version: 1.0\r\n" +
		"Content-Type: text/plain; charset=\"UTF-8\"\r\n" +
		"\r\n" + body

	err := smtp.SendMail(smtpHost+":"+smtpPort, auth, from, []string{to}, []byte(msg))
	if err != nil {
		return err
	}

	return nil
}
