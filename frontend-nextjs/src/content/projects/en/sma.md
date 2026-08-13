## Background

Searching for a specific segment in a video usually requires editors to manually scrub through hours of footage and identify scenes one by one. SMA was built to automate this process by analyzing videos, detecting scenes, extracting voice content, and generating searchable metadata.

Users simply upload a video, and the system places it into an asynchronous processing pipeline for scene detection, transcription, and AI-based content analysis before indexing the content for search.

## Highlights

- 🎬 **Automatic Scene Detection** — splits video into meaningful scenes based on visual changes.
- 🎙️ **Speech-to-Text** — converts spoken content into transcripts using Whisper.
- 🧠 **AI Scene Understanding** — utilizes vision models to generate descriptions and metadata for each scene.
- 🔎 **Semantic Search** — indexes embeddings to find scenes based on content meaning rather than just keyword matching.
- ⚡ **Asynchronous Processing** — offloads heavy AI tasks from the main request lifecycle.
- 📡 **Realtime Progress** — updates the ingestion progress to the frontend via WebSocket and Redis Pub/Sub.

## Key Features

**01 — Upload & Ingestion**
Users upload videos via the UI; the backend creates an asset and pushes it into the asynchronous processing pipeline.

**02 — Video Processing**
The video flows through an independent processing pipeline: `FFmpeg` / `OpenCV` extract frames, `PySceneDetect` identifies scenes, `Whisper` transcribes audio, and Vision Models analyze visual content.

**03 — Scene Intelligence**
Each scene is enriched with: visual descriptions, dialogue transcripts, metadata, and vector embeddings.

**04 — Search**
Users can search for related content using natural language and immediately retrieve the exact matching video scene.

**05 — Realtime Progress**
The frontend receives processing progress reports from the backend via WebSocket connections, eliminating the need for continuous HTTP polling.

## My Contribution

**Backend & API**
Built the FastAPI backend and APIs for managing assets, scenes, media streaming, and the ingestion workflow.

**Realtime Processing**
Designed the progress update flow using Redis Pub/Sub and WebSocket between the AI pipeline, backend, and frontend.

**Data & Search**
Integrated PostgreSQL/pgvector for storing and querying vector data, and built adapters for semantic search.

**Cloud & Deployment**
Participated in containerization and deployed system components on AWS during the FCAJ program phase.

**Team Engineering**
Collaborated on API contracts, sprint planning/task tracking, and review/testing to synchronize work across Backend, Frontend, and AI components.

## Technical Challenges

**Challenge 1 — Long-running AI Processing**
- **Problem:** Video processing and AI inference take a long time, making them unsuitable for synchronous HTTP requests.
- **Solution:** Decoupled ingestion from processing, allowing the pipeline to run asynchronously while the backend monitors job status.

**Challenge 2 — Realtime Progress**
- **Problem:** Users need to know which step a video is currently on (uploading → scene detection → transcription → AI analysis → completed).
- **Solution:** Used Redis Pub/Sub to pass states between processing services and the backend, then WebSocket pushes progress to the frontend.

**Challenge 3 — Multi-stage AI Pipeline**
- **Problem:** The pipeline consists of multiple interdependent steps. A single model cannot process everything in one go.
- **Solution:** Designed the pipeline by processing stage, allowing scene detection, transcription, and visual analysis to be processed independently.

**Challenge 4 — Deployment / Cost**
- **Problem:** AI workloads and cloud infrastructure incur significant operational costs for a student project.
- **Decision:** AWS was used during FCAJ to validate/deploy the system, then shut down after the necessary phase. The direction shifted to self-hosting to reduce recurring costs.

## Technical Decisions

**Why Docker?**
Containerize services to ensure a consistent execution environment between development and deployment.

**Why WebSocket + Redis Pub/Sub?**
WebSocket handles real-time communication with the client, while Redis Pub/Sub isolates the emission of progress events from the backend consumers.

**Why PostgreSQL + pgvector?**
Use PostgreSQL for persistent application data and pgvector to store/query vector embeddings within the same data ecosystem, avoiding fragmentation.

**Why Self-host?**
No need to maintain continuous (and expensive) cloud infrastructure when the project lacks production traffic.

## Deployment Status

**Development / Archived Cloud Deployment**
SMA completed development and deployment on AWS during the FCAJ program. The cloud infrastructure is currently shut down to avoid unnecessary maintenance costs.

*Next step: self-host the containerized system for future demonstrations and continued development.*

## Results

- Built an end-to-end video ingestion pipeline from upload to AI analysis.
- Automatically split videos into scenes and enriched them with transcripts and AI-generated metadata.
- Synchronized processing progress in real-time between backend and frontend.
- Containerized core components for local development and deployment.
- Completed cloud deployment during the FCAJ phase.
- Designed towards self-hosting to reduce operational costs post-cloud deployment.
