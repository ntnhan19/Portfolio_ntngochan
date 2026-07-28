## Background

Smart Media Analytics (SMA) is a comprehensive platform for managing and searching media assets using AI. Built by a team of 4 from April to July 2026, it solves the problem of manually scrubbing through hours of video by automatically extracting scenes, transcribing audio, and generating semantic tags.

## System Architecture

The system is split into three main components:
1. **Frontend (React)**: User interface for media upload, dashboard, and semantic search.
2. **Backend API (FastAPI)**: Handles routing, database interactions, and orchestrates the AI pipeline.
3. **AI Worker (ECS Fargate)**: Isolated task for heavy processing (Whisper transcription, OpenCV scene detection).

## Key Technical Decisions

**Separation of Concerns:** Isolated heavy AI processing from the Backend API to prevent blocking. The AI Worker runs as an independent container.

**Cloud Optimization:** Deployed the AI pipeline to AWS ECS Fargate with on-demand invocation, reducing idle compute costs by automatically shutting down tasks after processing.

**Database Selection:** Migrated from a local ChromaDB instance to pgvector on Amazon RDS for robust, production-ready vector search capabilities.

## Results

- Containerized backend, frontend, and AI pipeline services with Docker Compose, giving all team members a consistent environment free of dependency conflicts.
- Successfully set up a GitHub Actions CI/CD pipeline to auto-deploy on every push to main.
- Solved real-time update issues by fixing a WebSocket race condition.
- Wrote unit tests (pytest) for the Ingest and Search APIs to ensure pipeline reliability.
