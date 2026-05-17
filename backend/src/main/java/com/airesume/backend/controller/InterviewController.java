package com.airesume.backend.controller;

import com.airesume.backend.entity.*;
import com.airesume.backend.service.InterviewService;
import com.airesume.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/interviews")
@RequiredArgsConstructor
public class InterviewController {

    private final InterviewService interviewService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<?> start(Authentication auth,
                                   @RequestBody Map<String, String> body) {
        User user = userService.findByEmail(auth.getName());
        InterviewSession session = interviewService.startSession(
                user.getId(),
                null,
                body.get("title")
        );
        return ResponseEntity.ok(Map.of("message", "Session started", "id", session.getId()));
    }

    @GetMapping
    public ResponseEntity<?> list(Authentication auth,
                                  @RequestParam(defaultValue = "0") int page,
                                  @RequestParam(defaultValue = "10") int size) {
        User user = userService.findByEmail(auth.getName());
        Page<InterviewSession> sessions = interviewService.getSessions(user.getId(), page, size);
        return ResponseEntity.ok(Map.of("data", sessions));
    }

    @PostMapping("/{sid}/answers/{qid}")
    public ResponseEntity<?> submitAnswer(@PathVariable Long sid,
                                          @PathVariable Long qid,
                                          @RequestBody Map<String, String> body) {
        InterviewAnswer answer = interviewService.submitAnswer(sid, qid, body.get("answerText"));
        return ResponseEntity.ok(Map.of("message", "Answer submitted", "id", answer.getId()));
    }

    @PostMapping("/{id}/complete")
    public ResponseEntity<?> complete(@PathVariable Long id) {
        InterviewSession session = interviewService.completeSession(id);
        return ResponseEntity.ok(Map.of(
                "message", "Session completed",
                "overallScore", session.getOverallScore()
        ));
    }

    @GetMapping("/{id}/answers")
    public ResponseEntity<?> answers(@PathVariable Long id) {
        return ResponseEntity.ok(interviewService.getAnswers(id));
    }
}