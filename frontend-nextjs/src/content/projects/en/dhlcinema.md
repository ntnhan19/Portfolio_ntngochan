## Overview

DHLCinema is a real-time online movie ticket booking system designed to handle high concurrency and ensure data integrity. When hundreds of users access the system simultaneously, standard database locking mechanisms often get overloaded or create bottlenecks. This system completely solves the double-booking problem through distributed locking and an event-driven architecture.

## Key Features

**Real-time Seat Booking:** Seat status changes are broadcasted instantly to all users viewing the same showtime without needing a page reload.
**Integrated Payment Gateway:** VNPay is seamlessly embedded into the checkout flow, featuring secure callback validation.
**Self-Healing Data:** The system automatically scrapes "Now Playing" movies from the TMDB API and generates new showtime schedules daily without admin intervention.

## My Contribution

- **Designed** and implemented a Distributed Lock system using Redis to handle concurrent seat booking race conditions.
- **Implemented** real-time synchronization architecture using Socket.io for both Backend and Frontend, optimizing bandwidth by isolating events to specific Rooms.
- **Integrated** the VNPay Sandbox payment gateway, building robust webhook handlers to verify transaction integrity before committing tickets to the database.
- **Developed** Node-Cron background jobs to fully automate the TMDB data fetching pipeline and purge expired ticket data.

## Architecture

The system utilizes a modern decoupled architecture:
- **Client**: React.js SPA managing real-time websocket connections.
- **Server**: Node.js & Express API, heavily relying on Socket.io for bidirectional communication.
- **Database**: PostgreSQL (via Prisma ORM) for persistent data, and Redis for distributed caching and atomic operations (locks).
- **Automation Engine**: A Node-Cron background service seamlessly integrates with the TMDb API to provide a self-healing data pipeline.

## Engineering Challenges

**Race Conditions in Seat Booking:**
- **Problem:** When 100 users click the same seat at the exact same millisecond, a standard database will double-book. 
- **Solution:** The solution was using a Redis Distributed Lock (`SET NX EX`) to guarantee atomicity. The seat is locked in RAM instantly. 
- **Challenge:** Initially, the TTL was set to 30s. If the server crashed or the client disconnected, the seat stayed locked and became unbookable. 
- **Fix:** Reduced TTL to 10s and implemented a heartbeat mechanism from the client to continually extend the lock as long as the user remains active.

**State Desync on Reconnection:**
- **Context:** Each showtime operates as a dedicated Socket.io room. 
- **Problem:** When a user loses internet connection and reconnects, they lose all seat status updates broadcasted during the downtime. 
- **Solution:** Instead of solely broadcasting delta events, the server automatically emits the full current seat map (stored in Redis) to the client immediately upon rejoining the room. 
- **Trade-off:** Consumes slightly more bandwidth upon reconnection, but guarantees 100% data consistency on the UI.

## Technical Decisions

**Self-Healing Architecture:**
- **Problem:** Demo projects typically display outdated or empty data after months of neglect. 
- **Decision:** Integrate Node-Cron with The Movie Database (TMDb) API. 
- **Implementation:** When a recruiter visits the site, the dormant backend wakes up, fetches the latest movies, generates thousands of cinema seats for new showtimes, and purges old tickets. 
- **Reason:** Keeps the project alive, fresh, and ready to demo at any time with zero maintenance cost.

**E-commerce Transaction Management:**
- **Problem:** How to ensure tickets are not issued if the payment fails, while not keeping seats locked forever. 
- **Decision:** Decouple the "Reservation" and "Payment" flows. 
- **Implementation:** Seats are only marked as "Sold" in the database strictly when a successful, cryptographically verified Webhook payload is received from the VNPay server.

## Results

- **Data Integrity**: Successfully passed load testing using Artillery with 100 concurrent booking requests hitting the exact same seat without a single double-booking anomaly.
- **High Performance**: Maintained a p95 response time of 187ms under heavy load by offloading all seat validation logic to Redis.
- **Zero Maintenance**: The system has run continuously without manual intervention since deployment, automatically syncing real-world movie data.
