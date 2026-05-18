package com.airesume.backend.service;

import com.airesume.backend.entity.Resume;
import com.airesume.backend.entity.User;
import com.airesume.backend.repository.ResumeRepository;
import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.*;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ResumeService {

    private final ResumeRepository resumeRepository;
    private final UserService userService;
    private final AIService aiService;

    private final String uploadDir = "uploads/";

    public Resume uploadResume(Long userId, String title, MultipartFile file) throws IOException {
        User user = userService.findById(userId);

        // Save file to disk
        Files.createDirectories(Paths.get(uploadDir));
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(uploadDir + fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // Extract text based on file type
        String contentText;
        String fileType = file.getContentType();

        if (fileType != null && fileType.equals("application/pdf")) {
            // ✅ Real PDF text extraction using PDFBox 3.x
            try {
                PDDocument document = Loader.loadPDF(file.getBytes());
                PDFTextStripper stripper = new PDFTextStripper();
                contentText = stripper.getText(document);
                document.close();

                contentText = contentText
                        .replaceAll("[^\\x20-\\x7E\\n\\r\\t]", " ")
                        .replaceAll(" {3,}", " ")
                        .trim();

                if (contentText.isBlank()) {
                    contentText = "Resume: " + file.getOriginalFilename();
                }

            } catch (Exception e) {
                contentText = "Resume PDF: " + file.getOriginalFilename();
            }

        } else {
            try {
                contentText = new String(file.getBytes(),
                        java.nio.charset.StandardCharsets.UTF_8);
                contentText = contentText
                        .replaceAll("[^\\x20-\\x7E\\n\\r\\t]", " ")
                        .replaceAll(" {3,}", " ")
                        .trim();
                if (contentText.length() < 20 || contentText.isBlank()) {
                    contentText = "Resume: " + file.getOriginalFilename();
                }
            } catch (Exception e) {
                contentText = "Resume: " + file.getOriginalFilename();
            }
        }

        // Save resume first as PENDING
        Resume resume = Resume.builder()
                .user(user)
                .title(title)
                .fileName(fileName)
                .filePath(filePath.toString())
                .fileType(file.getContentType())
                .contentText(contentText)
                .status(Resume.Status.PENDING)
                .deleted(false)
                .build();

        resume = resumeRepository.save(resume);

        // Call AI scoring
        try {
            Map<String, Object> result = aiService.scoreResume(contentText);
            int score = ((Number) result.get("score")).intValue();
            String feedback = (String) result.get("feedback");

            resume.setAiScore(score);
            resume.setAiFeedback(feedback);
            resume.setStatus(Resume.Status.ANALYZED);
        } catch (Exception e) {
            resume.setStatus(Resume.Status.FAILED);
            resume.setAiFeedback("Scoring failed: " + e.getMessage());
        }

        return resumeRepository.save(resume);
    }

    public Page<Resume> getResumes(Long userId, String search, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        if (search != null && !search.isEmpty()) {
            return resumeRepository.findByUserIdAndTitleContainingAndDeletedFalse(
                    userId, search, pageable);
        }
        return resumeRepository.findByUserIdAndDeletedFalse(userId, pageable);
    }

    public Resume getById(Long id) {
        return resumeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resume not found"));
    }

    public Resume updateTitle(Long id, String newTitle) {
        Resume resume = getById(id);
        resume.setTitle(newTitle);
        return resumeRepository.save(resume);
    }

    public void deleteResume(Long id) {
        Resume resume = getById(id);
        resume.setDeleted(true);
        resumeRepository.save(resume);
    }
}