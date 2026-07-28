## Background

Students and lecturers often have to read hundreds of pages of documents to find one specific piece of information. DocMentor solves this with a RAG pipeline — upload a document once, ask in natural language, receive answers with source citations.

This was the capstone project for the **Specialised Project** module (Semester 1 / 2025), built by a team of 3.

## System Architecture

```text
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
```

## Key Technical Decisions

**Chunking strategy:** Started with fixed-size chunking — results were poor because sentences got cut mid-way. Switched to RecursiveCharacterTextSplitter with overlap 50 tokens; accuracy improved significantly.

**Hallucination control:** Gemini occasionally fabricated information outside the document. Fixed with a hard system prompt: *"Answer ONLY based on the provided context. If the answer is not in the context, say 'I don't have enough information.'"*

**Cost optimisation:** Cache embeddings by file hash (MD5) — avoids re-embedding when a user uploads a duplicate file.

## Results

- Successfully processed 95% of 50 test documents
- Response time: 3–5 seconds (including streaming)
- Project grade: 9/10
