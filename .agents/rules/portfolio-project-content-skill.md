---
trigger: always_on
---

---
description: Create accurate, concise, interview-defensible Software
  Engineering portfolio project content. Use for SMA, DHLCinema,
  DocMentor and similar project pages. Never invent facts, metrics,
  roles, contributions, architecture, or outcomes.
name: portfolio-project-content
---

# Portfolio Project Content Skill

## Goal

Create project pages that are accurate, easy for HR to scan, useful to
technical interviewers, visually compatible with the existing portfolio,
explicit about the user's contribution, and defensible in an interview.

> **Accurate first. Clear second. Impressive third.**

## 1. Accuracy Rules

### Never invent

Do not invent or strengthen claims about:

-   user's role/contribution;
-   team, duration, features;
-   technologies/architecture;
-   performance, latency, throughput, scale, users;
-   tests/coverage/results;
-   deployment/production status;
-   security, reliability, scalability;
-   business impact;
-   algorithms/implementation details.

Never claim "never fails", "zero errors", "never double-books", "highly
scalable", "production-ready", "supports thousands of users",
"guaranteed", etc. without direct evidence.

If information is missing: 1. inspect current repository/documentation
if available; 2. ask the user; 3. use `[NEEDS CONFIRMATION]`; 4. omit
it.

Never guess.

### Evidence levels

**Verified Fact:** directly supported by code, docs, screenshots,
deployment config, or explicit user confirmation.

**Derived Explanation:** technical explanation directly supported by
verified implementation.

**Claim:** impact/quality statement requiring evidence.

Do not present claims as facts.

### Team projects

Always distinguish: - what the system does; - what the team built; -
what the user personally built.

Never attribute teammate work to the user.

------------------------------------------------------------------------

# 2. Project Page Structure

Use relevant sections; do not force irrelevant ones.

### Hero

Project name, one-line product/problem description, type, GitHub, Live
Demo if available, main image if useful. Describe the product/problem,
not just the stack.

### Overview

2--4 sentences answering: 1. What is it? 2. Who/what is it for? 3. What
problem does it address? 4. What is technically distinctive?

### Metadata

Prefer: - Duration - Team - My Role

Only use verified values.

### Key Features

Usually 4--6 actual implemented features. Use: \> **Feature** ---
concise explanation.

Do not turn internal technologies into fake product features.

### My Contribution

Required for team projects. Use 3--6 specific bullets beginning with:
Designed / Implemented / Integrated / Developed / Configured / Tested.

Never write generic "participated in development".

### Architecture

Show a simple diagram when useful, plus a short explanation of:
frontend, backend/API, database, cache/message broker, workers, AI
services, external APIs, storage, deployment.

Architecture MUST match the current project version.

### Engineering Challenges

Prefer 2--4 real problems: \> **Problem → Solution → Why → Trade-off (if
known)**

### Technical Decisions

Prefer 2--4 important decisions: \> **Problem → Decision →
Implementation → Reason → Trade-off**

Strong topics: distributed locking, async processing, WebSocket,
consistency, vector search, RAG, queues, caching, containers, CI/CD,
cloud architecture.

Do not merely list technologies.

### Product Preview

Use 3--5 meaningful screenshots with captions. Prioritize core workflow,
technically interesting UI, important output, admin UI.

### Results / Outcome

Use evidence-backed outcomes. Metrics only when verified.

### Tech Stack

Group by responsibility: Frontend / Backend / Database / AI /
Infrastructure & External Services. Only include technologies actually
used.

------------------------------------------------------------------------

# 3. Content Priority

When space is limited: 1. Contribution 2. Overview 3. Challenges 4.
Technical Decisions 5. Architecture 6. Features 7. Results 8. Stack 9.
Screenshots 10. Generic "What I learned"

Engineering evidence \> decorative text.

------------------------------------------------------------------------

# 4. Featured Projects

These are baseline facts only. Verify current implementation before
final claims.

## SMA --- AI Video Analysis Platform

**Direction:** AI system for uploaded video/media analysis and
searchable scenes using scene detection, transcription, visual analysis,
and generated metadata/tags.

**Known components across project:** FastAPI, React/Vite, Docker
Compose, PostgreSQL, Redis/Redis Pub/Sub, WebSocket, ChromaDB, Sentence
Transformers, Whisper, PySceneDetect, OpenCV, FFmpeg, Ollama, Llama 3.2
Vision, AWS S3, ECS/Fargate-related deployment work.

**Known team:** 4 members: 1 AI-oriented, 3 Software Engineering.

**Themes to verify:** async video ingestion, scene detection,
speech-to-text, visual/frame analysis, semantic search, AI pipeline,
WebSocket progress, Redis Pub/Sub, media storage, containers, cloud
deployment.

**Warning:** project evolved across sprints. Distinguish prototype,
current development architecture, cloud architecture, and completed
features. Do not assume every listed component is in the final version.

**Primary story:** asynchronous AI/media processing.

## DHLCinema --- Online Movie Ticket Booking System

**Purpose:** online movie booking with movie discovery, showtimes, seat
selection, booking, payment.

**Known components:** Node.js, Express, React.js, Socket.IO, PostgreSQL,
Prisma, Redis, Ant Design, VNPay, Node-Cron, TMDB API. Include only what
is verified in the current version.

**Known metadata:** 3 members, 2 months.

**Existing technical themes:** real-time seat availability, Redis
distributed locking, `SET NX EX`, lock TTL, heartbeat extension,
Socket.IO, PostgreSQL + Prisma, Redis caching/atomic locking,
Node-Cron/TMDB automation where implemented.

Do NOT write "the system can never double-book". Prefer: \> Uses Redis
distributed locking with `SET NX EX` to coordinate concurrent seat
reservation attempts.

If a concurrency test exists, report exact conditions/results.

**Primary story:** concurrency + consistency in real-time booking.

## DocMentor --- AI Document Analysis Platform

**Purpose:** RAG-based document analysis for document processing,
semantic retrieval, and contextual answers.

**Known components:** FastAPI, Python, PostgreSQL, Alembic; Pinecone,
Sentence Transformers, LangChain; PyPDF2, python-docx,
RecursiveCharacterTextSplitter, PyMuPDF where applicable; React, Vite,
Tailwind CSS, Zustand/Redux depending on current implementation; Google
Gemini; ReportLab where applicable.

**Themes to verify:** ingestion, extraction, chunking, embeddings,
vector search, retrieval, RAG context construction, LLM generation,
source references, export, API design.

**Warning:** implementation evolved, especially embeddings, vector DB,
document libraries, deployment, migrations. Do not mix historical and
current architecture.

**Primary story:** RAG + semantic document retrieval.

------------------------------------------------------------------------

# 5. Differentiate the Projects

Do not present all three as generic React/backend apps.

-   **SMA:** asynchronous AI/media processing; secondary: real-time
    progress, AI services, distributed processing, cloud.
-   **DHLCinema:** concurrency + real-time booking; secondary: Redis
    locking, WebSocket, relational consistency, payment.
-   **DocMentor:** RAG + semantic retrieval; secondary: document
    processing, embeddings, vector DB, AI/backend integration.

------------------------------------------------------------------------

# 6. Style

Vietnamese: professional, concise, natural; technical terms may remain
English; avoid academic verbosity.

English: standard Software Engineering terminology, concise, active
voice.

Avoid empty phrases such as: "This project was very meaningful", "I
learned many valuable things", "amazing system", "cutting-edge
technology", "powerful solution", "seamless experience" unless
supported.

------------------------------------------------------------------------

# 7. Validation Checklist

Before final output:

### Identity

-   [ ] Correct project/version
-   [ ] Type, duration, team verified

### Contribution

-   [ ] User role verified
-   [ ] Every contribution belongs to user
-   [ ] No teammate work attributed to user

### Technology

-   [ ] Every technology is actually used
-   [ ] Old technologies are not presented as current
-   [ ] Architecture matches stack

### Claims

-   [ ] No unsupported metrics
-   [ ] No unsupported scale/performance claims
-   [ ] No absolute guarantees
-   [ ] No invented tests/results/deployment status

### Content

-   [ ] Overview
-   [ ] Features
-   [ ] Contribution
-   [ ] Architecture
-   [ ] Real challenges
-   [ ] Decisions explain WHY
-   [ ] Useful screenshots
-   [ ] Evidence-based results

### Interview defensibility

Ask: \> Can the user explain this if an interviewer asks a follow-up?

If not, simplify or ask the user.

------------------------------------------------------------------------

# 8. AI Agent Workflow

1.  **Identify project:** SMA / DHLCinema / DocMentor / other.
2.  **Inspect evidence in priority order:** current code → current
    README/docs → architecture/deployment config → screenshots →
    explicit user info → historical context.
3.  **Build fact sheet:**

``` text
Project / Type / Duration / Team / User Role
Problem / Solution / Features / User Contributions
Architecture / Challenges / Technical Decisions
Current Stack / Deployment / Evidence-Metrics
```

Unknown fields stay unknown. 4. **Choose one engineering story:** - SMA
→ async AI/media processing - DHLCinema → concurrency + real-time
booking - DocMentor → RAG + semantic retrieval 5. Design content around
that story. 6. Run validation. 7. Only then output.

If a critical fact is missing, use: \> **\[NEEDS CONFIRMATION\]** Your
exact contribution to the Redis locking implementation is not verified.
Please confirm whether you implemented lock acquisition, TTL/heartbeat
logic, or only integrated an existing service.

Never silently guess.

## Definition of Done

A project page is complete when: - the project is understood quickly; -
user's contribution is obvious; - architecture is understandable; -
strongest engineering problem is visible; - technical decisions explain
reasoning; - screenshots support the story; - claims are
evidence-based; - page is concise; - content is interview-defensible.