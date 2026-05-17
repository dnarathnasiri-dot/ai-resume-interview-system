package com.airesume.backend.service;

import com.airesume.backend.entity.*;
import com.airesume.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InterviewService {

    private final InterviewSessionRepository sessionRepository;
    private final InterviewAnswerRepository answerRepository;
    private final QuestionRepository questionRepository;
    private final UserService userService;

    public InterviewSession startSession(Long userId, Long resumeId, String title) {
        User user = userService.findById(userId);

        InterviewSession session = InterviewSession.builder()
                .user(user)
                .title(title)
                .status(InterviewSession.Status.SCHEDULED)
                .overallScore(0)
                .deleted(false)
                .build();

        return sessionRepository.save(session);
    }

    public Page<InterviewSession> getSessions(Long userId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return sessionRepository.findByUserIdAndDeletedFalse(userId, pageable);
    }

    public InterviewAnswer submitAnswer(Long sessionId, Long questionId, String answerText) {
        InterviewSession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));

        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        InterviewAnswer answer = InterviewAnswer.builder()
                .session(session)
                .question(question)
                .answerText(answerText)
                .aiScore(0)
                .build();

        return answerRepository.save(answer);
    }

    public InterviewSession completeSession(Long sessionId) {
        InterviewSession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));

        List<InterviewAnswer> answers = answerRepository.findBySessionId(sessionId);
        int avg = answers.stream()
                .mapToInt(InterviewAnswer::getAiScore)
                .sum() / Math.max(answers.size(), 1);

        session.setStatus(InterviewSession.Status.COMPLETED);
        session.setOverallScore(avg);
        session.setCompletedAt(LocalDateTime.now());

        return sessionRepository.save(session);
    }

    public List<InterviewAnswer> getAnswers(Long sessionId) {
        return answerRepository.findBySessionId(sessionId);
    }
}