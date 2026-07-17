package com.jobboard.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "jobs")
@Getter
@Setter
@NoArgsConstructor 
@AllArgsConstructor
@Builder
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String company;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private String jobType;

    private String salary;

    @Column(nullable = false)
    private String experience;

    @Lob
    @Column(nullable = false)
    private String description;

    @Lob
    @Column(nullable = false)
    private String skills;

    private LocalDate applicationDeadline;

    @Column(nullable = false, updatable = false)
    private LocalDateTime postedDate;

    @PrePersist
    public void onCreate() {
        this.postedDate = LocalDateTime.now();
    }

    
}