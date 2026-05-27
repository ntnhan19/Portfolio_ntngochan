// src/data/staticData.ts
const BASE_PATH =
  process.env.NODE_ENV === "production" ? "/Portfolio_ntngochan" : "";

// ─── TYPES ────────────────────────────────────────────────

export interface Project {
  id: number;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  content: string;
  tech_stack: string[];
  highlights: string[];
  category: "AI/ML" | "Fullstack" | "Backend" | "Frontend";
  role: string;
  team_size: number;
  duration: string;
  year: number;
  repo_url?: string;
  demo_url?: string;
  image_url: string;
  featured: boolean;
  status: "completed" | "in-progress" | "archived";
}

export interface Certificate {
  id: number;
  name: string;
  issuer: string;
  type: "Title" | "Course" | "Award";
  date: string;
  image_url: string;
  url?: string;
}

export interface Activity {
  id: number;
  name: string;
  role: string;
  description: string;
  date: string;
  image_url: string;
}

export interface TimelineItem {
  id: number;
  date: string;
  year: number;
  type: "project" | "award" | "activity" | "cert";
  title: string;
  subtitle: string;
  description: string;
  tags?: string[];
  link?: string;
}

export interface SkillCategory {
  key: string;
  title: string;
  i18nKey: string;
  colorVar: string;
  /** Day-to-day, project-proven skills */
  core: string[];
  /** Used in projects or actively learning — shown with lower emphasis */
  secondary: string[];
}

/** Top stack for homepage — intern recruiters scan these first */
export const coreStackSkills = [
  "React.js",
  "Node.js",
  "PostgreSQL",
  "TypeScript",
  "Next.js",
  "FastAPI",
] as const;

// ─── PROFILE ──────────────────────────────────────────────

export const profile = {
  full_name: "Nguyen Tran Ngoc Han",
  title: "Fullstack Developer Intern — PERN · React.js · FastAPI",
  bio: `Year 4 Software Engineering student at HUTECH with a solid foundation in Backend Development, built through academic projects and self-study.

**Strengths:**
- Building RESTful APIs with Node.js (Express)
- Database schema design and query optimisation with PostgreSQL
- Real-time communication with WebSocket / Socket.io
- Working with AI/LLM: RAG pipelines, Vector Databases (Pinecone)

**Goal:** Seeking a Backend Developer Internship at a tech company to gain hands-on experience with large-scale systems, microservices architecture, and best practices from senior engineers.`,
  email: "ngochanpt2018@gmail.com",
  github: "https://github.com/ntnhan19",
  linkedin: "https://linkedin.com/in/nguyentranngochan",
  avatar: `${BASE_PATH}/images/avatar.jpg`,
  avatar_hero: `${BASE_PATH}/images/ava_hero.jpg`,
  avatar_about: `${BASE_PATH}/images/ava_about.jpg`,
};

// ─── PROJECTS ─────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: 1,
    slug: "docmentor",
    title: "DocMentor",
    tagline: "AI document Q&A — upload PDF, ask anything",
    description:
      "Built a RAG pipeline that lets users upload PDF/DOCX and ask natural-language questions. Chunks with RecursiveCharacterTextSplitter (512 tokens, overlap 50), embeds via Sentence Transformers, stores in Pinecone, retrieves top-5 chunks as context for Gemini Pro. Streaming response via FastAPI SSE.",
    content: `## Background

Students and lecturers often have to read hundreds of pages of documents to find one specific piece of information. DocMentor solves this with a RAG pipeline — upload a document once, ask in natural language, receive answers with source citations.

This was the capstone project for the **Specialised Project** module (Semester 1 / 2025), built by a team of 3.

## System Architecture

\`\`\`
PDF/DOCX Upload
    → Text Extraction (PyMuPDF)
    → Chunking (RecursiveCharacterTextSplitter, 512 tokens, overlap 50)
    → Embedding (Sentence Transformers: all-MiniLM-L6-v2)
    → Store → Pinecone Vector DB

User Query
    → Embed query
    → Similarity Search (top-k=5)
    → Build prompt (chunks + question)
    → Gemini Pro → Streaming SSE response
\`\`\`

## Key Technical Decisions

**Chunking strategy:** Started with fixed-size chunking — results were poor because sentences got cut mid-way. Switched to RecursiveCharacterTextSplitter with overlap 50 tokens; accuracy improved significantly.

**Hallucination control:** Gemini occasionally fabricated information outside the document. Fixed with a hard system prompt: *"Answer ONLY based on the provided context. If the answer is not in the context, say 'I don't have enough information.'"*

**Cost optimisation:** Cache embeddings by file hash (MD5) — avoids re-embedding when a user uploads a duplicate file.

## Results

- Successfully processed 95% of 50 test documents
- Response time: 3–5 seconds (including streaming)
- Project grade: 9/10`,
    tech_stack: [
      "Python",
      "FastAPI",
      "LangChain",
      "Google Gemini",
      "Pinecone",
      "React 19",
      "TypeScript",
    ],
    highlights: [
      "RAG pipeline with custom chunking strategy",
      "Streaming response via FastAPI SSE",
      "Hallucination control via system prompt",
      "Embedding cache by file hash (MD5)",
    ],
    category: "AI/ML",
    role: "Fullstack — Backend lead",
    team_size: 3,
    duration: "3 months",
    year: 2025,
    repo_url: "https://github.com/ntnhan19/DocMentor",
    demo_url: "https://doc-mentor-one.vercel.app",
    image_url: `${BASE_PATH}/images/projects/docmentor.png`,
    featured: true,
    status: "completed",
  },
  {
    id: 2,
    slug: "dhlcinema",
    title: "DHLCinema",
    tagline: "Real-time seat booking — zero double-booking under concurrent load",
    description:
      "Cinema ticket booking system solving the concurrent seat selection problem. Implemented Redis distributed lock (SET NX EX) for atomic reservation, Socket.io for real-time seat-map sync across all clients, VNPay sandbox for payment. Load tested with Artillery: 100 concurrent requests → 1 success, 0 double bookings.",
    content: `## Background

This was the capstone project for the **Network Programming** module (Semester 1 / 2024), built by a team of 3. Requirement: build a real-time system capable of handling race conditions.

**Specific problem:** When 100 users simultaneously click the same seat, how do you guarantee that only 1 person books successfully while the other 99 receive an instant notification?

## Technical Solution

### Redis Distributed Lock

\`\`\`javascript
const lockKey = \`seat:\${movieId}:\${seatId}\`;
const acquired = await redis.set(lockKey, userId, 'EX', 30, 'NX');
// EX 30 — auto-expire after 30s (prevents deadlock if server crashes)
// NX    — only set if key does not exist (atomic check-and-set)

if (!acquired) {
  socket.emit('seat:error', { message: 'Seat already taken' });
  return;
}

await db.query(
  'UPDATE seats SET status=$1, user_id=$2 WHERE id=$3',
  ['locked', userId, seatId]
);

io.to(\`room:\${movieId}\`).emit('seat:updated', { seatId, status: 'locked' });
\`\`\`

**Why Redis instead of a DB transaction?** PostgreSQL row-locks work, but when scaling horizontally across multiple Node processes, each process has its own connection pool — the lock is not shared. Redis is single-threaded and guarantees atomicity cross-process.

### Socket.io Room Management

Each showtime is a Socket.io room. Clients join the room when they open the seat-selection page and leave when they exit. Seat-map updates are broadcast to the entire room — no polling needed.

## Load Testing

\`\`\`bash
# 100 virtual users all selecting seat ID 42
artillery run load-test.yml

# Results:
# Success (seat booked): 1
# Failed (seat taken): 99
# Response time p95: 187ms
# Double bookings: 0
\`\`\`

## Bugs & Fixes

**Bug 1 — Redis lock not released on server crash:** TTL was 30s, but if the server crashed mid-flow, the seat stayed locked. Fix: reduced TTL to 10s and added a heartbeat to extend the lock while the user is in the payment flow.

**Bug 2 — Socket reconnect loses seat state:** After reconnecting, the client had no way to know which seats were locked. Fix: when joining a room, the server now emits the full current seat-map from Redis.

## Results

- Zero double bookings across load tests with 100 concurrent users
- Response time p95: 187ms
- Project grade: 9/10`,
    tech_stack: [
      "Node.js",
      "Express",
      "Socket.io",
      "PostgreSQL",
      "Redis",
      "React.js",
      "Ant Design",
      "VNPay",
    ],
    highlights: [
      "Redis distributed lock — zero double booking",
      "Socket.io real-time seat-map broadcast",
      "Load tested: 100 concurrent → 1 success, p95 187ms",
      "VNPay sandbox payment integration",
    ],
    category: "Fullstack",
    role: "Fullstack — Backend + Real-time",
    team_size: 3,
    duration: "3 months",
    year: 2024,
    repo_url: "https://github.com/ntnhan19/DHLCinema",
    demo_url: "https://dhl-cinema-user.vercel.app",
    image_url: `${BASE_PATH}/images/projects/cinema.png`,
    featured: true,
    status: "completed",
  },
];

// ─── CERTIFICATES ─────────────────────────────────────────

export const certificates: Certificate[] = [
  { id: 1, name: "Outstanding Student — Faculty Level", issuer: "Ho Chi Minh City University of Technology (HUTECH)", type: "Title", date: "2024", image_url: `${BASE_PATH}/images/certs/sv5tot.jpg` },
  { id: 2, name: "Distinguished Student — Faculty Level", issuer: "Faculty of Information Technology — HUTECH", type: "Title", date: "2024", image_url: `${BASE_PATH}/images/certs/svtbieu.jpg` },
  { id: 3, name: "Networking Basics", issuer: "Cisco Networking Academy", type: "Course", date: "Dec 2024", image_url: `${BASE_PATH}/images/certs/cisco_basics.jpg`, url: "https://www.credly.com/badges/849ccbed-8429-4e57-a3be-e3177f447cce/public_url" },
  { id: 4, name: "JavaScript Essentials 1", issuer: "Cisco Networking Academy", type: "Course", date: "Dec 2024", image_url: `${BASE_PATH}/images/certs/javascript1.jpg`, url: "https://www.credly.com/badges/04dcaaad-cc55-4403-af59-ad15cd36150f/public_url" },
  { id: 5, name: "JavaScript Essentials 2", issuer: "Cisco Networking Academy", type: "Course", date: "Dec 2024", image_url: `${BASE_PATH}/images/certs/javascript2.jpg`, url: "https://www.credly.com/badges/7b330edf-fa4c-46d6-ac25-74e50e2c3773/public_url" },
  { id: 6, name: "3rd Place — Genz's Thinking Competition", issuer: "HUTECH Innovation & Startup Club", type: "Award", date: "Oct 2024", image_url: `${BASE_PATH}/images/certs/genz_award.jpg` },
];

// ─── ACTIVITIES ───────────────────────────────────────────

export const activities: Activity[] = [
  { id: 1, name: "HUTECH Student Sports Festival 2024", role: "Athlete — Women's Football Team, Faculty of IT", description: "Competed in Women's Football and secured 2nd place university-wide.", date: "Mar 2024", image_url: `${BASE_PATH}/images/activities/hoithao.jpg` },
  { id: 2, name: "A Complete Tet — A Whole Spring 2025", role: "Volunteer — Faculty of IT Student Association", description: "Packed 500+ Tet gift packages for low-income families in Ho Chi Minh City. 50+ volunteers over 2 consecutive days.", date: "Jan 2025", image_url: `${BASE_PATH}/images/activities/tinhnguyenvien.png` },
];

// ─── DERIVED ──────────────────────────────────────────────
export const timelineData = ([
  {
    id: 1,
    date: "Semester 1 / 2025",
    year: 2025,
    type: "project",
    title: projects[0].title,
    subtitle: projects[0].role,
    description: projects[0].description,
    tags: projects[0].tech_stack.slice(0, 4),
    link: `/projects/${projects[0].slug}`,
  },
  {
    id: 2,
    date: "Jan 2025",
    year: 2025,
    type: "activity",
    title: activities[1].name,
    subtitle: activities[1].role,
    description: activities[1].description,
    tags: ["Community", "Volunteer", "Teamwork"],
  },
  {
    id: 3,
    date: "2024",
    year: 2024,
    type: "award",
    title: certificates[0].name,
    subtitle: certificates[0].issuer,
    description: "Recognised for academic performance, leadership, volunteering, and all-round student contribution at faculty level.",
    tags: ["Academic", "Leadership", "Volunteer"],
  },
  {
    id: 4,
    date: "2024",
    year: 2024,
    type: "award",
    title: certificates[1].name,
    subtitle: certificates[1].issuer,
    description: "Faculty-level distinction awarded for strong study results and active participation in student and departmental activities.",
    tags: ["Faculty", "Achievement", "Campus"],
  },
  {
    id: 5,
    date: "Dec 2024",
    year: 2024,
    type: "cert",
    title: certificates[4].name,
    subtitle: certificates[4].issuer,
    description: "Completed the advanced JavaScript Essentials track, strengthening ES6+, DOM, asynchronous flows, and problem-solving skills.",
    tags: ["JavaScript", "ES6+", "Frontend"],
    link: certificates[4].url,
  },
  {
    id: 6,
    date: "Dec 2024",
    year: 2024,
    type: "cert",
    title: certificates[3].name,
    subtitle: certificates[3].issuer,
    description: "Built a solid foundation in modern JavaScript syntax, functions, objects, and browser-based programming concepts.",
    tags: ["JavaScript", "Programming"],
    link: certificates[3].url,
  },
  {
    id: 7,
    date: "Dec 2024",
    year: 2024,
    type: "cert",
    title: certificates[2].name,
    subtitle: certificates[2].issuer,
    description: "Studied networking fundamentals including IP, switching, routing, and communication concepts useful for backend systems.",
    tags: ["Networking", "Infrastructure"],
    link: certificates[2].url,
  },
  {
    id: 8,
    date: "Oct 2024",
    year: 2024,
    type: "award",
    title: certificates[5].name,
    subtitle: certificates[5].issuer,
    description: "Won 3rd place in an innovation competition by contributing ideas, product direction, and collaborative execution.",
    tags: ["Competition", "Innovation", "Teamwork"],
  },
  {
    id: 9,
    date: "Semester 1 / 2024",
    year: 2024,
    type: "project",
    title: projects[1].title,
    subtitle: projects[1].role,
    description: projects[1].description,
    tags: projects[1].tech_stack.slice(0, 4),
    link: `/projects/${projects[1].slug}`,
  },
  {
    id: 10,
    date: "Mar 2024",
    year: 2024,
    type: "activity",
    title: activities[0].name,
    subtitle: activities[0].role,
    description: activities[0].description,
    tags: ["Sports", "Teamwork", "Discipline"],
  },
] satisfies TimelineItem[]).sort((a, b) => b.year - a.year);

export const skillCategories: SkillCategory[] = [
  {
    key: "frontend",
    title: "Frontend",
    i18nKey: "frontend",
    colorVar: "--info",
    core: ["React.js", "Next.js (App Router)", "TypeScript"],
    secondary: ["TailwindCSS", "Framer Motion"],
  },
  {
    key: "backend",
    title: "Backend",
    i18nKey: "backend",
    colorVar: "--success",
    core: ["Node.js", "Express.js", "RESTful APIs", "Python / FastAPI"],
    secondary: ["Socket.io"],
  },
  {
    key: "database",
    title: "Database",
    i18nKey: "database",
    colorVar: "--warning",
    core: ["PostgreSQL", "Redis"],
    secondary: ["Prisma ORM", "SQL Server"],
  },
  {
    key: "ai-tools",
    title: "AI & Tools",
    i18nKey: "ai",
    colorVar: "--syn-prop",
    core: ["LangChain", "RAG Pipeline"],
    secondary: ["Pinecone", "Google Gemini"],
  },
  {
    key: "devops",
    title: "DevOps",
    i18nKey: "devops",
    colorVar: "--text-muted",
    core: ["Docker & Compose", "Git"],
    secondary: ["GitHub", "Postman"],
  },
];

/** Main skill groups shown on homepage (4 cards) */
export const homepageSkillGroups = skillCategories.filter((c) => c.key !== "devops");

export const devopsSkillGroup = skillCategories.find((c) => c.key === "devops")!;
