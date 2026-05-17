package com.airesume.backend.service;

import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class AIService {

    public Map<String, Object> scoreResume(String resumeText) {
        try {
            Thread.sleep(1000); // simulate API delay

            int score = calculateMockScore(resumeText);
            String feedback = generateResumeFeedback(resumeText, score);

            return Map.of("score", score, "feedback", feedback);

        } catch (Exception e) {
            return Map.of("score", 50, "feedback", "Could not analyze resume.");
        }
    }

    public Map<String, Object> scoreAnswer(String question, String answer) {
        try {
            Thread.sleep(500);

            int score = calculateMockScore(answer);
            String feedback = generateAnswerFeedback(answer, score);

            return Map.of("score", score, "feedback", feedback);

        } catch (Exception e) {
            return Map.of("score", 50, "feedback", "Could not analyze answer.");
        }
    }

    private int calculateMockScore(String text) {
        if (text == null || text.isBlank()) return 30;

        int score = 50;
        String lower = text.toLowerCase();

        // Keywords that boost score
        String[] goodKeywords = {
                "experience", "skills", "education", "project",
                "achieved", "developed", "managed", "led",
                "java", "python", "react", "spring", "sql",
                "bachelor", "master", "degree", "certified",
                "team", "communication", "problem", "solution"
        };

        for (String keyword : goodKeywords) {
            if (lower.contains(keyword)) score += 3;
        }

        // Length bonus
        if (text.length() > 500)  score += 5;
        if (text.length() > 1000) score += 5;

        // Cap between 40 and 98
        return Math.min(98, Math.max(40, score));
    }

    private String generateResumeFeedback(String text, int score) {
        String lower = text.toLowerCase();

        StringBuilder feedback = new StringBuilder();

        if (score >= 80) {
            feedback.append("✅ Strong resume overall! ");
        } else if (score >= 60) {
            feedback.append("👍 Good resume with room for improvement. ");
        } else {
            feedback.append("⚠️ Resume needs significant improvement. ");
        }

        // Skills check
        if (lower.contains("skill")) {
            feedback.append("Good skills section detected. ");
        } else {
            feedback.append("Consider adding a dedicated skills section. ");
        }

        // Experience check
        if (lower.contains("experience") || lower.contains("worked")) {
            feedback.append("Work experience is present. ");
        } else {
            feedback.append("Add more work experience details. ");
        }

        // Education check
        if (lower.contains("education") || lower.contains("degree") || lower.contains("bachelor")) {
            feedback.append("Education section looks good. ");
        } else {
            feedback.append("Include your educational background. ");
        }

        // Projects check
        if (lower.contains("project")) {
            feedback.append("Projects section adds value. ");
        } else {
            feedback.append("Consider adding personal or academic projects. ");
        }

        feedback.append("\n\nScore: ").append(score).append("/100");

        return feedback.toString();
    }

    private String generateAnswerFeedback(String answer, int score) {
        if (answer == null || answer.isBlank()) {
            return "No answer provided. Please give a detailed response.";
        }

        StringBuilder feedback = new StringBuilder();

        if (score >= 80) {
            feedback.append("✅ Excellent answer! Very detailed and relevant. ");
        } else if (score >= 60) {
            feedback.append("👍 Good answer. Could be more specific. ");
        } else {
            feedback.append("⚠️ Answer needs more detail and examples. ");
        }

        if (answer.length() < 50) {
            feedback.append("Try to elaborate more on your response. ");
        } else if (answer.length() > 200) {
            feedback.append("Good level of detail provided. ");
        }

        feedback.append("\n\nScore: ").append(score).append("/100");

        return feedback.toString();
    }
}