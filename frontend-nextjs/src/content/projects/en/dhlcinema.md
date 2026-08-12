## Background

This project was built to solve one of the most challenging problems in e-commerce systems: handling high-concurrency traffic and maintaining real-time data integrity.

## Background

This project was built to solve one of the most challenging problems in e-commerce systems: handling high-concurrency traffic and maintaining real-time data integrity. When hundreds of users access the system simultaneously, standard database row-locking is often insufficient or creates bottlenecks.

## Architecture

The system utilizes a modern decoupled architecture:
- **Client**: React.js SPA managing real-time websocket connections.
- **Server**: Node.js & Express API, heavily relying on Socket.io for bidirectional communication.
- **Database**: PostgreSQL (via Prisma ORM) for persistent data, and Redis for distributed caching and atomic operations (locks).
- **Automation Engine**: A Node-Cron background service seamlessly integrates with the TMDb API to provide a self-healing data pipeline.

## Decisions

**Race Conditions in Seat Booking (Redis Distributed Lock):**
If 100 users click the same seat at the exact same millisecond, a standard database will double-book. We implemented a Redis Distributed Lock (`SET NX EX`) to guarantee atomicity. *Challenge:* Initially set TTL to 30s, but if the server crashed, the seat stayed locked. *Fix:* Reduced TTL to 10s and added a heartbeat to continually extend the lock while the user is active.

**Real-time Synchronization (Socket.io):**
Each showtime operates as a dedicated Room. Seat state changes are broadcast instantly to everyone in the room, completely eliminating the need for client polling. *Challenge:* Users lost seat states upon network reconnect. *Fix:* Upon rejoining, the server immediately emits the full current seat map stored in Redis.

**Payment Integration (VNPay Sandbox):**
Integrated a localized payment gateway to handle checkout transactions. Implemented secure webhook/callback endpoints to verify bank responses before officially booking the ticket in the database, ensuring e-commerce data integrity.

**The "Ghost Project" Problem (Self-Healing Architecture):**
Demo projects usually display outdated data after months of neglect. We integrated a Node-Cron background service with the TMDb API. When a recruiter visits the site, the dormant backend wakes up, fetches the latest "Now Playing" movies, dynamically generates thousands of fresh cinema seats, and purges old tickets. The project remains 100% maintenance-free and always fresh.

## Results

- **Zero Double-Bookings**: Successfully withstood Artillery load testing with 100 concurrent booking requests.
- **High Performance**: Achieved a p95 response time of 187ms under heavy load.
- **Self-Sustaining**: The system has run without manual intervention since deployment, dynamically syncing real-world movie data.
