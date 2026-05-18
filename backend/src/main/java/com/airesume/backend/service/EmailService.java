package com.airesume.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.internet.MimeMessage;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${app.base-url}")
    private String baseUrl;

    public void sendVerificationEmail(String toEmail, String name, String token) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom(fromEmail);
            helper.setTo(toEmail);
            helper.setSubject("Verify Your Email - AI Resume Pro");

            String verifyLink = baseUrl + "/verify?token=" + token;

            String html = """
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #4f46e5, #7c3aed); padding: 32px; text-align: center; border-radius: 12px 12px 0 0;">
                        <h1 style="color: white; margin: 0;">🎯 AI Resume Pro</h1>
                    </div>
                    <div style="background: white; padding: 32px; border: 1px solid #e5e7eb;">
                        <h2 style="color: #1a1a2e;">Welcome, %s! 👋</h2>
                        <p style="color: #555; font-size: 16px;">Thank you for registering. Please verify your email to get started.</p>
                        <div style="text-align: center; margin: 32px 0;">
                            <a href="%s"
                               style="background: linear-gradient(135deg, #4f46e5, #7c3aed); color: white; padding: 16px 32px; border-radius: 10px; text-decoration: none; font-size: 16px; font-weight: bold;">
                               ✅ Verify My Email
                            </a>
                        </div>
                        <p style="color: #888; font-size: 14px;">If you didn't create an account, please ignore this email.</p>
                        <p style="color: #888; font-size: 14px;">This link expires in 24 hours.</p>
                    </div>
                    <div style="background: #f8f9ff; padding: 16px; text-align: center; border-radius: 0 0 12px 12px;">
                        <p style="color: #888; font-size: 12px; margin: 0;">© 2026 AI Resume Pro</p>
                    </div>
                </div>
                """.formatted(name, verifyLink);

            helper.setText(html, true);
            mailSender.send(message);
            System.out.println("Verification email sent to: " + toEmail);

        } catch (Exception e) {
            System.err.println("Email sending failed: " + e.getMessage());
        }
    }
}