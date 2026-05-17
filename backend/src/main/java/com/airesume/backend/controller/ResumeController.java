package com.airesume.backend.controller;

import com.airesume.backend.entity.Resume;
import com.airesume.backend.entity.User;
import com.airesume.backend.service.ResumeService;
import com.airesume.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/resumes")
@RequiredArgsConstructor
public class ResumeController {

    private final ResumeService resumeService;
    private final UserService userService;

    @GetMapping
    public ResponseEntity<?> list(Authentication auth,
                                  @RequestParam(defaultValue = "0") int page,
                                  @RequestParam(defaultValue = "10") int size,
                                  @RequestParam(required = false) String search) {
        User user = userService.findByEmail(auth.getName());
        Page<Resume> resumes = resumeService.getResumes(user.getId(), search, page, size);
        return ResponseEntity.ok(Map.of("data", resumes));
    }

    @PostMapping
    public ResponseEntity<?> upload(Authentication auth,
                                    @RequestParam String title,
                                    @RequestParam MultipartFile file) throws IOException {
        User user = userService.findByEmail(auth.getName());
        Resume resume = resumeService.uploadResume(user.getId(), title, file);
        return ResponseEntity.ok(Map.of("message", "Resume uploaded", "id", resume.getId()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(@PathVariable Long id) {
        return ResponseEntity.ok(resumeService.getById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id,
                                    @RequestBody Map<String, String> body) {
        Resume updated = resumeService.updateTitle(id, body.get("title"));
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        resumeService.deleteResume(id);
        return ResponseEntity.ok(Map.of("message", "Resume deleted"));
    }
}