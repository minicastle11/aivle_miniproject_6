package com.aivle.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Book {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;          // 나중에 fk지정

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String author;

    @Lob @Column(columnDefinition = "TEXT")
    private String content;

    @Lob @Column(columnDefinition = "TEXT")
    private String coverImageUrl;

    private Integer likes;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        if (this.likes == null) this.likes = 0;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
}