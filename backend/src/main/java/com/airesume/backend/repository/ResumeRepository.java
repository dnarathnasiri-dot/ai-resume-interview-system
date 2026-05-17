package com.airesume.backend.repository;

import com.airesume.backend.entity.Resume;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResumeRepository extends JpaRepository<Resume, Long> {
    Page<Resume> findByUserIdAndDeletedFalse(Long userId, Pageable pageable);
    Page<Resume> findByUserIdAndTitleContainingAndDeletedFalse(Long userId, String title, Pageable pageable);
}