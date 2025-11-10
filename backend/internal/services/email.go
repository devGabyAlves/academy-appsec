package services

import (
	"fmt"
	"net/smtp"
	"os"
	"strings"
)

func sanitizeName(input string) string {
	var b strings.Builder
	for _, r := range input {
		if (r >= 'a' && r <= 'z') ||
			(r >= 'A' && r <= 'Z') ||
			(r >= '0' && r <= '9') ||
			r == ' ' || r == '-' || r == '\'' || r == '.' {
			b.WriteRune(r)
		}
	}
	return strings.TrimSpace(b.String())
}

func sanitizeEmail(input string) string {
	var b strings.Builder
	for _, r := range input {
		if (r >= 'a' && r <= 'z') ||
			(r >= 'A' && r <= 'Z') ||
			(r >= '0' && r <= '9') ||
			r == '@' || r == '.' || r == '-' || r == '_' {
			b.WriteRune(r)
		}
	}
	return strings.TrimSpace(b.String())
}

func sanitizeMessage(input string) string {
	var b strings.Builder
	for _, r := range input {
		if r == '\r' {
			continue
		} else if r == '\n' {
			b.WriteRune(' ')
		} else if r >= 32 && r < 127 { 
			b.WriteRune(r)
		}
	}
	return strings.TrimSpace(b.String())
}

func SendContactEmail(name, email, message string) error {
	from := os.Getenv("SMTP_USER")
	password := os.Getenv("SMTP_PASS")
	to := os.Getenv("CONTACT_RECEIVER")
	smtpHost := os.Getenv("SMTP_HOST")
	smtpPort := os.Getenv("SMTP_PORT")

	auth := smtp.PlainAuth("", from, password, smtpHost)
	safeName := sanitizeName(name)
	safeEmail := sanitizeEmail(email)
	safeMessage := sanitizeMessage(message)

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