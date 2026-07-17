package com.jobboard.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobRequest {

    @NotBlank(message = "Job title is required")
    private String title;

    @NotBlank(message = "Company name is required")
    private String company;

    @NotBlank(message = "Location is required")
    private String location;

    @NotBlank(message = "Job type is required")
    private String jobType;

    private String salary;

    @NotBlank(message = "Experience is required")
    private String experience;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Skills are required")
    private String skills;

    private LocalDate applicationDeadline;
}