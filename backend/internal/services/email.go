package services

import (
	"bytes"
	"crypto/tls"
	"errors"
	"fmt"
	"net"
	"net/mail"
	"net/smtp"
	"os"
	"regexp"
	"strings"
	"text/template"
	"time"
	"unicode/utf8"
)

const (
	maxNameLen    = 100
	maxEmailLen   = 254
	maxMessageLen = 5000
)

var headerInjectionRegex = regexp.MustCompile(`[\r\n]+`)

var bodyTmpl = template.Must(template.New("emailBody").Parse(
	`Nome: {{.Name}}
Email: {{.Email}}

Mensagem:
{{.Message}}
`))

type contactData struct {
	Name    string
	Email   string
	Message string
}

func sanitizeHeader(s string, maxLen int) string {
	clean := headerInjectionRegex.ReplaceAllString(s, " ")
	clean = strings.TrimSpace(clean)

	if utf8.RuneCountInString(clean) > maxLen {
		runes := []rune(clean)
		clean = string(runes[:maxLen])
	}
	return clean
}

func sanitizeBody(s string, maxLen int) string {
	clean := strings.ReplaceAll(s, "\x00", "")
	clean = strings.TrimSpace(clean)
	if utf8.RuneCountInString(clean) > maxLen {
		runes := []rune(clean)
		clean = string(runes[:maxLen])
	}
	return clean
}

func isValidEmail(e string) bool {
	_, err := mail.ParseAddress(e)
	return err == nil && len(e) <= maxEmailLen
}

func dialSMTP(host string, port string, timeout time.Duration) (*smtp.Client, error) {
	addr := net.JoinHostPort(host, port)

	conn, err := net.DialTimeout("tcp", addr, timeout)
	if err != nil {
		return nil, fmt.Errorf("tcp connect failed: %w", err)
	}

	client, err := smtp.NewClient(conn, host)
	if err != nil {
		return nil, fmt.Errorf("smtp new client failed: %w", err)
	}

	if ok, _ := client.Extension("STARTTLS"); ok {
		tlsConfig := &tls.Config{
			ServerName: host,
			MinVersion: tls.VersionTLS12,
		}
		if err := client.StartTLS(tlsConfig); err != nil {
			client.Close()
			return nil, fmt.Errorf("starttls failed: %w", err)
		}
	}

	return client, nil
}

func SendContactEmail(name, email, message string) error {
	smtpHost := strings.TrimSpace(os.Getenv("SMTP_HOST"))
	smtpPort := strings.TrimSpace(os.Getenv("SMTP_PORT"))
	smtpUser := strings.TrimSpace(os.Getenv("SMTP_USER"))
	smtpPass := strings.TrimSpace(os.Getenv("SMTP_PASS"))
	receiver := strings.TrimSpace(os.Getenv("CONTACT_RECEIVER"))

	if smtpHost == "" || smtpPort == "" || smtpUser == "" || smtpPass == "" || receiver == "" {
		return errors.New("SMTP configuration incomplete")
	}

	safeName := sanitizeHeader(name, maxNameLen)
	safeEmail := sanitizeHeader(email, maxEmailLen)
	safeMessage := sanitizeBody(message, maxMessageLen)

	validUserEmail := false
	if safeEmail != "" && isValidEmail(safeEmail) {
		validUserEmail = true
	}

	var bodyBuf bytes.Buffer
	data := contactData{
		Name:    safeName,
		Email:   safeEmail,
		Message: safeMessage,
	}
	if err := bodyTmpl.Execute(&bodyBuf, data); err != nil {
		return fmt.Errorf("failed to build email body: %w", err)
	}
	bodyStr := bodyBuf.String()

	headers := make([]string, 0, 8)
	headers = append(headers, fmt.Sprintf("From: %s", sanitizeHeader(smtpUser, maxEmailLen)))
	headers = append(headers, fmt.Sprintf("To: %s", sanitizeHeader(receiver, maxEmailLen)))
	headers = append(headers, "Subject: Novo contato recebido no site")
	headers = append(headers, "MIME-Version: 1.0")
	headers = append(headers, `Content-Type: text/plain; charset="UTF-8"`)
	if validUserEmail {
		headers = append(headers, fmt.Sprintf("Reply-To: %s", safeEmail))
	}
	var msg bytes.Buffer
	for _, h := range headers {
		msg.WriteString(h)
		msg.WriteString("\r\n")
	}
	msg.WriteString("\r\n")
	msg.WriteString(bodyStr)

	client, err := dialSMTP(smtpHost, smtpPort, 10*time.Second)
	if err != nil {
		return fmt.Errorf("smtp connect: %w", err)
	}
	defer client.Quit()

	auth := smtp.PlainAuth("", smtpUser, smtpPass, smtpHost)
	if err := client.Auth(auth); err != nil {
		return fmt.Errorf("smtp auth failed: %w", err)
	}

	if err := client.Mail(smtpUser); err != nil {
		return fmt.Errorf("mail from failed: %w", err)
	}

	if err := client.Rcpt(receiver); err != nil {
		return fmt.Errorf("rcpt to failed: %w", err)
	}

	wc, err := client.Data()
	if err != nil {
		return fmt.Errorf("data command failed: %w", err)
	}

	_, err = wc.Write(msg.Bytes())
	if err != nil {
		_ = wc.Close()
		return fmt.Errorf("writing message failed: %w", err)
	}
	if err := wc.Close(); err != nil {
		return fmt.Errorf("closing data writer failed: %w", err)
	}
	return nil
}
