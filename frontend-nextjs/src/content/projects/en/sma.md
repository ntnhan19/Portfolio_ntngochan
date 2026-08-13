## Overview

Smart Media Analytics (SMA) is an AI-powered Media Asset Management system. The project solves the time-consuming problem of manually scrubbing through huge video libraries by allowing users to perform Semantic Search using natural language, returning exact timestamp-level scene results.

## Key Features

- **Semantic Search:** Search video/image content using natural language (e.g., "sunset over the ocean").
- **Timestamp-Level Seek:** Search results link directly to the exact second inside a video where a scene occurs.
- **Automatic Scene Detection:** Utilizes PySceneDetect to split videos into meaningful scenes before indexing.
- **Audio Transcription:** Extracts dialogues and narration from audio tracks via the Whisper AI model.
- **Real-time Updates:** The dashboard automatically reflects the pipeline processing progress for each video via WebSocket.

## My Contribution

- **Designed** an AI Worker architecture completely decoupled from the Backend API to isolate heavy processing tasks and prevent blocking.
- **Deployed** the AI pipeline to AWS ECS Fargate using an on-demand invocation mechanism, enabling automatic scaling and cost savings.
- **Configured** AWS Step Functions and Amazon EventBridge to orchestrate the asynchronous AI processing workflow.
- **Built** WebSocket integration on the FastAPI backend to report real-time media processing progress to the Frontend.
- **Configured** a CI/CD pipeline via GitHub Actions to automate testing, Docker containerization, and cloud deployment.
- **Tested** the Ingest and Search APIs extensively by writing a comprehensive Unit Test suite (Pytest).

## Architecture

The system utilizes a distributed Event-driven architecture:
- **Client**: React 19 SPA managing the user interface (Vite, Tailwind CSS).
- **Backend API**: Central Node powered by FastAPI (Python) managing routing, database interactions, and WebSockets.
- **AI Worker**: Isolated task on AWS ECS Fargate running Whisper and Computer Vision (Ollama) models.
- **Database**: PostgreSQL (via `pgvector` extension) storing vector embeddings and metadata.
- **Storage**: Amazon S3 storing raw media files and asset metadata.

## Engineering Challenges

**Non-blocking AI Pipeline for Large Video Assets:**
- **Context:** Scene detection, audio transcription, and running AI models on videos are highly resource-intensive. Running these synchronously on the API Server leads to timeouts and crashes.
- **Solution:** Decoupled the AI Pipeline into an isolated Worker. The Backend API strictly handles receiving files, uploading to S3, saving temporary metadata, and emitting an Event to trigger the Worker.
- **Challenge:** Managing infrastructure so the worker scales up automatically during bulk uploads but costs nothing when the system is idle.
- **Fix:** Deployed the Worker to AWS ECS Fargate as On-demand tasks. The system automatically provisions resources upon receiving EventBridge events and spins down immediately after processing.

## Technical Decisions

**Real-time Progress Updates:**
- **Problem:** Video analysis takes several minutes. Users need precise visibility into the current progress state (Uploading, Scene Detection, Transcribing, Indexing).
- **Decision:** Use WebSocket on FastAPI to broadcast status updates.
- **Implementation:** The AI Worker continuously reports its progress to the Backend API. The backend then pushes this event via WebSocket directly to the Client tracking that specific Job ID.
- **Reason:** Provides a smooth, intuitive UX while eliminating the need for constant HTTP polling from the client, which would otherwise overload the server.

**Migrating Vector Database to pgvector:**
- **Problem:** Initially, the system utilized a standalone ChromaDB instance. Maintaining a relational DB (PostgreSQL) alongside a separate Vector DB created complexities in data synchronization and backups.
- **Decision:** Consolidated both into PostgreSQL using the `pgvector` extension.
- **Implementation:** Stored the relational schema (assets, metadata, scenes) and embeddings within a single unified database on Amazon RDS.
- **Reason:** Minimized network query latency, leveraged SQL ACID compliance, and drastically simplified the storage architecture.

## Results

- **Asynchronous Processing:** Successfully decoupled heavy AI workloads, allowing the API Server to consistently maintain ultra-low response times (under 100ms) even during heavy video rendering.
- **Cloud Infrastructure Optimization:** Utilizing a Serverless model with ECS Fargate completely eliminated idle compute costs.
- **Real-time Synchronization:** Video processing statuses are instantly reflected on the Frontend via WebSockets.
- **Automated Operations:** Deployed a CI/CD pipeline that fully automates the packaging and deployment process.
