## Overview

DHLCinema is an online movie ticket booking system supporting real-time seat selection, booking, payment, and cinema management. The project focuses on maintaining consistent seat availability when multiple users attempt to reserve seats concurrently.

## Key Features

**Real-time Seat Booking:** Seat statuses are updated and reflected instantly for all users viewing the same showtime.
**Integrated Payments:** VNPay Sandbox is directly integrated, supporting secure webhook transaction verification.
**Automated Data Sync:** The system automatically fetches currently playing movies from the TMDB API and generates new showtimes daily.

## My Contribution

- **Designed** a seat locking mechanism using Database Transactions (Prisma) and a time-based expiration strategy to handle concurrent booking attempts.
- **Built** a real-time synchronization architecture using Socket.io for both Frontend and Backend.
- **Integrated** the VNPay Sandbox payment gateway, implementing a Webhook flow to verify cryptographic signatures (HMAC SHA512) before confirming tickets.
- **Developed** background Cron jobs in Node.js to completely automate movie data synchronization and system cleanup.

## Architecture

The system uses a modern decoupled architecture:
- **Client**: React.js SPA managing the interface and state.
- **Server**: Node.js & Express API, combined with Socket.io for bi-directional communication.
- **Database**: PostgreSQL (via Prisma ORM) for all persistent and transactional data state.
- **Automation Engine**: Node-Cron tightly integrated with the TMDb API for automated data flows.

## Engineering Challenges

**Concurrency in Seat Booking:**
- **Context:** When multiple users click the same seat at the exact same time, a standard database approach will double-book. 
- **Solution:** Utilized database transactions to ensure data integrity. Seat statuses are checked and updated atomically in the Database.
- **Challenge:** Users might lock a seat but never complete the payment, leading to seats being permanently "stuck".
- **Fix:** Implemented a 5-minute Time-To-Live (TTL) lock duration in the database, paired with a background Cleanup Job to periodically free up expired seats.

**State Desync on Reconnection:**
- **Context:** Each showtime operates as a dedicated Socket.io room. 
- **Problem:** When a user loses their internet connection and reconnects, they miss all seat status updates broadcasted during their downtime. 
- **Solution:** Instead of solely relying on delta event broadcasts, the server uses WebSockets (via Socket.io) to push the latest seat changes, and clients can re-sync the full seat map from the database upon successful reconnection.

## Technical Decisions

**Automated Data Sync:**
- **Problem:** Demo projects typically display outdated or empty data after months of neglect. 
- **Decision:** Integrate Node-Cron with The Movie Database (TMDb) API. 
- **Implementation:** Every day at 1 AM, the system automatically fetches the latest movie list, generates thousands of cinema seats for new showtimes, and purges old data (older than 7 days).
- **Reason:** Keeps the project alive, fresh, and ready to demo at any time without manual maintenance overhead.

**E-commerce Transaction Management:**
- **Problem:** How to ensure tickets are not issued if the payment fails, while not keeping seats locked forever. 
- **Decision:** Decouple the "Reservation" and "Payment" flows. 
- **Implementation:** Seats are only marked as "Sold" in the database strictly when a successful Webhook payload is received from the VNPay server, securely verified using an HMAC SHA512 signature.

## Results

- **Concurrency Handled**: Successfully implemented a robust seat locking and safe expiration mechanism backed entirely by the Database.
- **Real-time Synchronization**: Fast and reliable seat UI updates via Socket.io.
- **Secure Payments**: Successfully integrated VNPay Sandbox with strict signature validation flows.
- **Automation**: The system automatically synchronizes movie data from TMDB, ensuring the project is always in a fresh state for demonstrations.
