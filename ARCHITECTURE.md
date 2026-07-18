# Architecture

This document explains how the Job Board Application is structured internally, and how a request travels through the system end to end.

---

## High-level overview

The application follows a standard **three-tier architecture**:

1. **Presentation tier** — React frontend (single-page application)
2. **Application tier** — Spring Boot REST API (controller, service, repository layers)
3. **Data tier** — MySQL database

```
┌────────────────┐        HTTP/JSON        ┌────────────────────┐        JDBC        ┌────────────┐
│  React frontend │  ──────────────────►   │  Spring Boot backend │  ──────────────►  │   MySQL    │
│  (Vite, Axios)   │  ◄──────────────────   │  (REST API)          │  ◄──────────────  │  database  │
└────────────────┘                          └────────────────────┘                     └────────────┘
```

---

## Backend architecture (layered / N-tier)

The backend follows a standard Spring Boot layered architecture, separating concerns so each layer has exactly one responsibility.

| Layer | Package | Responsibility |
|---|---|---|
| Controller | `controller` | Handles HTTP requests/responses, routing, status codes |
| Service | `service`, `service.impl` | Business logic, validation rules, orchestration |
| Repository | `repository` | Database access via Spring Data JPA |
| Entity | `entity` | JPA-mapped database models |
| DTO | `dto.request`, `dto.response` | Defines the shape of data crossing the API boundary |
| Exception | `exception` | Centralized error handling |
| Config | `config` | Application-wide configuration (CORS, security, etc.) |

### Why DTOs are separate from entities

The `Job` entity represents the database table directly. `JobRequest` and `JobResponse` are separate objects that define exactly what the client is allowed to send and receive. This prevents clients from setting fields they shouldn't control (like `id` or `postedDate`), and keeps the API contract independent of the database schema.

---

## Request lifecycle — example: creating a job

1. **Client** sends `POST /api/jobs` with a JSON body from the `AddJob` form.
2. **Controller** (`JobController.createJob`) deserializes the JSON into a `JobRequest` object and validates it using `@Valid` and Jakarta Bean Validation annotations (`@NotBlank`, etc.).
3. **Service** (`JobServiceImpl.createJob`) receives the validated `JobRequest`, applies any business rules, and maps it to a `Job` entity.
4. **Repository** (`JobRepository.save`) persists the entity via Spring Data JPA / Hibernate, which generates the corresponding SQL `INSERT` statement.
5. The `@PrePersist` lifecycle hook on `Job` sets `postedDate` automatically before the insert executes.
6. The saved `Job` entity (now containing a generated `id` and `postedDate`) is mapped back into a `JobResponse`.
7. **Controller** returns the `JobResponse` as JSON with HTTP status `201 Created`.

The same pattern (Controller → Service → Repository → Database, and back) applies to every other endpoint (`GET`, `PUT`, `DELETE`).

---

## Frontend architecture

The frontend is a single-page application (SPA) built with React and Vite.

| Concern | Location | Responsibility |
|---|---|---|
| Routing | `App.jsx`, `main.jsx` | Maps URL paths to page components using React Router |
| Pages | `pages/` | Top-level views: `Home`, `AddJob`, `EditJob`, `JobDetails`, `NotFound` |
| Components | `components/` | Reusable UI pieces: `Navbar`, `JobCard` |
| API layer | `services/jobService.js` | Centralizes all Axios calls to the backend |

### Why a dedicated API service layer

Rather than calling `axios.get(...)` inside each component, all backend communication is centralized in `jobService.js`. Components import functions like `getAllJobs()` or `createJob()` without needing to know the URL structure or HTTP method — this keeps the API contract in one place and makes the codebase easier to maintain.

### Routing structure

| Route | Component | Purpose |
|---|---|---|
| `/` | `Home` | Lists all jobs, with search |
| `/add-job` | `AddJob` | Form to create a new job |
| `/edit-job/:id` | `EditJob` | Form pre-filled with an existing job's data |
| `/job/:id` | `JobDetails` | Full details of a single job |
| `*` | `NotFound` | Catch-all 404 page |

---

## Data flow diagram

```
User action (browser)
        |
        v
React component (e.g. Home.jsx)
        |
        v
jobService.js (Axios call)
        |
        v
Spring Boot Controller
        |
        v
Service layer (business logic)
        |
        v
Repository (Spring Data JPA)
        |
        v
MySQL database
        |
        v
Response flows back up through each layer to the browser
```

---

## Current limitations

- No authentication or authorization — all endpoints are currently open to any client.
- No role separation between job seekers (read-only) and recruiters (create/update/delete).
- Search is performed client-side on already-fetched data; it is not yet a backend query.
- Error handling for "not found" cases currently returns a generic `500` instead of a `404` (a global exception handler is a planned improvement).

These are documented as known limitations rather than defects, and are listed under Future Enhancements in the README.