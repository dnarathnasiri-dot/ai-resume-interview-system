package com.airesume.backend.repository;

import com.airesume.backend.entity.InterviewSession;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface InterviewSessionRepository extends JpaRepository<InterviewSession, Long> {
    Page<InterviewSession> findByUserIdAndDeletedFalse(Long userId, Pageable pageable);
    List<InterviewSession> findByStatus(InterviewSession.Status status);
}