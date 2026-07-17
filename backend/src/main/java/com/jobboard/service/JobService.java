package com.jobboard.service;

import com.jobboard.dto.request.JobRequest;
import com.jobboard.dto.response.JobResponse;

import java.util.List;

public interface JobService {

    JobResponse createJob(JobRequest jobRequest);

    List<JobResponse> getAllJobs();

    JobResponse getJobById(Long id);

    JobResponse updateJob(Long id, JobRequest jobRequest);

    void deleteJob(Long id);
}