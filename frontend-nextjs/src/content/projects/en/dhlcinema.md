## Overview

DHLCinema is an online movie ticket booking system supporting real-time seat selection, booking, payment, and cinema management. The project focuses on maintaining consistent seat availability when multiple users attempt to reserve seats concurrently.

## Key Features

**Seat Booking & Reservation:** Seats are temporarily locked for a limited time and automatically released if the transaction is not completed.
**Real-time State Synchronization:** Socket.IO updates seat status changes for clients viewing the same showtime.
**VNPay Payment:** Integrated VNPay Sandbox with callback/webhook to confirm transaction status.
**Automated Movie Data Sync:** Node-Cron periodically fetches data from TMDB and updates the system.

## My Contribution

- **Designed** a seat reservation mechanism using Database Transactions (Prisma), combined with expiration time and a cleanup job to handle overdue locked seats.
- **Built** a real-time state synchronization mechanism using Socket.IO between Frontend and Backend.
- **Integrated** VNPay Sandbox, developing a webhook and validating the HMAC SHA512 signature before updating the transaction status.
- **Developed** background Cron jobs in Node.js to automatically synchronize movie data and release overdue reserved seats.

## Architecture

The system uses a modern decoupled architecture:
- **Client**: React.js SPA managing the interface and state.
- **Server**: Node.js & Express API, combined with Socket.io for bi-directional communication.
- **Database**: PostgreSQL (via Prisma ORM) stores users, movies, showtimes, seats, and transactions data.
- **Automation Engine**: Node-Cron periodically calls the TMDb API and handles scheduled cleanup tasks.

## Engineering Challenges

**Concurrency in Seat Booking:**
- **Context:** When multiple users click the same seat at the exact same time, a standard database approach will double-book. 
- **Solution:** Utilized Database Transactions to check and update seat statuses within the same execution flow.
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

- **Concurrent Seat Booking**: Implemented a time-limited seat reservation and state handling mechanism through Database Transactions.
- **Real-time Synchronization**: Seat statuses are updated among clients via Socket.IO.
- **Payment**: Integrated VNPay Sandbox and verified callbacks before updating transaction statuses.
- **Automation**: Utilized Node-Cron to synchronize movie data from TMDB and process periodic tasks.
