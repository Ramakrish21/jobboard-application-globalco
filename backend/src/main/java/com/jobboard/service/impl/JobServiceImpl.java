package com.jobboard.service.impl;

import com.jobboard.dto.request.JobRequest;
import com.jobboard.dto.response.JobResponse;
import com.jobboard.entity.Job;
import com.jobboard.exception.ResourceNotFoundException;
import com.jobboard.repository.JobRepository;
import com.jobboard.service.JobService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobServiceImpl implements JobService {

    private final JobRepository jobRepository;

    public JobServiceImpl(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    @Override
    public JobResponse createJob(JobRequest jobRequest) {

        Job job = mapToEntity(jobRequest);

        Job savedJob = jobRepository.save(job);

        return mapToResponse(savedJob);
    }

    @Override
    public List<JobResponse> getAllJobs() {

        return jobRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public JobResponse getJobById(Long id) {

        Job job = jobRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Job not found with id: " + id));

        return mapToResponse(job);
    }

    @Override
    public JobResponse updateJob(Long id, JobRequest jobRequest) {

        Job job = jobRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Job not found with id: " + id));

        job.setTitle(jobRequest.getTitle());
        job.setCompany(jobRequest.getCompany());
        job.setLocation(jobRequest.getLocation());
        job.setJobType(jobRequest.getJobType());
        job.setSalary(jobRequest.getSalary());
        job.setExperience(jobRequest.getExperience());
        job.setDescription(jobRequest.getDescription());
        job.setSkills(jobRequest.getSkills());
        job.setApplicationDeadline(jobRequest.getApplicationDeadline());

        Job updatedJob = jobRepository.save(job);

        return mapToResponse(updatedJob);
    }

    @Override
    public void deleteJob(Long id) {

        Job job = jobRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Job not found with id: " + id));

        jobRepository.delete(job);
    }

    // ===========================
    // Mapping Methods
    // ===========================

    private Job mapToEntity(JobRequest request) {

        return Job.builder()
                .title(request.getTitle())
                .company(request.getCompany())
                .location(request.getLocation())
                .jobType(request.getJobType())
                .salary(request.getSalary())
                .experience(request.getExperience())
                .description(request.getDescription())
                .skills(request.getSkills())
                .applicationDeadline(request.getApplicationDeadline())
                .build();
    }

    private JobResponse mapToResponse(Job job) {

        return JobResponse.builder()
                .id(job.getId())
                .title(job.getTitle())
                .company(job.getCompany())
                .location(job.getLocation())
                .jobType(job.getJobType())
                .salary(job.getSalary())
                .experience(job.getExperience())
                .description(job.getDescription())
                .skills(job.getSkills())
                .applicationDeadline(job.getApplicationDeadline())
                .postedDate(job.getPostedDate())
                .build();
    }
}