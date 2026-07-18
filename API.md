# API documentation

Base URL: `http://localhost:8080/api/jobs`

All request and response bodies are JSON. All endpoints are currently unauthenticated.

---

## Get all jobs

Retrieves every job posting.

**Request**
```
GET /api/jobs
```

**Response — 200 OK**
```json
[
  {
    "id": 1,
    "title": "Java Full Stack Developer",
    "company": "Google",
    "location": "Hyderabad",
    "jobType": "Full Time",
    "salary": "12 LPA",
    "experience": "2 Years",
    "description": "Develop enterprise applications using Spring Boot and React.",
    "skills": "Java, Spring Boot, React, MySQL",
    "applicationDeadline": "2026-08-30",
    "postedDate": "2026-07-18T10:30:00"
  }
]
```

---

## Get a job by ID

Retrieves a single job by its ID.

**Request**
```
GET /api/jobs/{id}
```

**Response — 200 OK**
```json
{
  "id": 1,
  "title": "Java Full Stack Developer",
  "company": "Google",
  "location": "Hyderabad",
  "jobType": "Full Time",
  "salary": "12 LPA",
  "experience": "2 Years",
  "description": "Develop enterprise applications using Spring Boot and React.",
  "skills": "Java, Spring Boot, React, MySQL",
  "applicationDeadline": "2026-08-30",
  "postedDate": "2026-07-18T10:30:00"
}
```

**Response — job not found**

Currently returns `500 Internal Server Error` with the exception message. A future update will return `404 Not Found` with a structured error body via a global exception handler (see ARCHITECTURE.md, Current limitations).

---

## Create a job

Creates a new job posting.

**Request**
```
POST /api/jobs
Content-Type: application/json
```
```json
{
  "title": "Frontend Developer",
  "company": "Microsoft",
  "location": "Bangalore",
  "jobType": "Full Time",
  "salary": "10 LPA",
  "experience": "1 Year",
  "description": "Build responsive interfaces using React and Tailwind CSS.",
  "skills": "React, JavaScript, Tailwind CSS",
  "applicationDeadline": "2026-08-15"
}
```

**Response — 201 Created**
```json
{
  "id": 2,
  "title": "Frontend Developer",
  "company": "Microsoft",
  "location": "Bangalore",
  "jobType": "Full Time",
  "salary": "10 LPA",
  "experience": "1 Year",
  "description": "Build responsive interfaces using React and Tailwind CSS.",
  "skills": "React, JavaScript, Tailwind CSS",
  "applicationDeadline": "2026-08-15",
  "postedDate": "2026-07-18T11:05:22"
}
```

**Validation — 400 Bad Request**

Returned when a required field is missing or blank (`title`, `company`, `location`, `jobType`, `experience`, `description`, `skills` are all required; `salary` and `applicationDeadline` are optional).

```json
{
  "title": "Job title is required"
}
```

---

## Update a job

Updates an existing job posting by ID. All fields are replaced with the values provided.

**Request**
```
PUT /api/jobs/{id}
Content-Type: application/json
```
```json
{
  "title": "Senior Frontend Developer",
  "company": "Microsoft",
  "location": "Bangalore",
  "jobType": "Full Time",
  "salary": "16 LPA",
  "experience": "4 Years",
  "description": "Lead frontend architecture decisions and mentor junior developers.",
  "skills": "React, TypeScript, Tailwind CSS",
  "applicationDeadline": "2026-09-01"
}
```

**Response — 200 OK**
```json
{
  "id": 2,
  "title": "Senior Frontend Developer",
  "company": "Microsoft",
  "location": "Bangalore",
  "jobType": "Full Time",
  "salary": "16 LPA",
  "experience": "4 Years",
  "description": "Lead frontend architecture decisions and mentor junior developers.",
  "skills": "React, TypeScript, Tailwind CSS",
  "applicationDeadline": "2026-09-01",
  "postedDate": "2026-07-18T11:05:22"
}
```

Note: `postedDate` is not modified on update — it reflects the original creation time.

---

## Delete a job

Deletes a job posting by ID.

**Request**
```
DELETE /api/jobs/{id}
```

**Response — 200 OK**
```
"Job deleted successfully."
```

---

## Field reference

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | Long | Auto-generated | Not sent in requests |
| `title` | String | Yes | |
| `company` | String | Yes | |
| `location` | String | Yes | |
| `jobType` | String | Yes | e.g. "Full Time", "Internship" |
| `salary` | String | No | Free text, e.g. "12 LPA" |
| `experience` | String | Yes | e.g. "2 Years" |
| `description` | String | Yes | Stored as `@Lob` (large text) |
| `skills` | String | Yes | Comma-separated, stored as `@Lob` |
| `applicationDeadline` | Date (`YYYY-MM-DD`) | No | |
| `postedDate` | DateTime (ISO 8601) | Auto-generated | Set via `@PrePersist` on creation |

---

## Error responses

| Status | Meaning |
|---|---|
| `200 OK` | Request succeeded |
| `201 Created` | Job successfully created |
| `400 Bad Request` | Validation failure on request body |
| `500 Internal Server Error` | Unhandled exception (includes "job not found" until a global exception handler is added) |