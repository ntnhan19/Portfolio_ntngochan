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

**Race Conditions in Seat Booking:**
If 100 users click the same seat at the exact same millisecond, a standard database might double-book it. We implemented a **Redis Distributed Lock** (`SET NX EX`) to guarantee atomicity. The seat is locked in RAM instantly, and Socket.io broadcasts the update to all other clients, turning the seat gray in real-time.

**The "Ghost Project" Portfolio Problem:**
Demo projects usually display outdated data after a few months of neglect. We built a **Self-Healing Architecture**. When a recruiter visits the site, the dormant backend wakes up, fetches the latest "Now Playing" movies from TMDb, dynamically generates thousands of fresh cinema seats, and purges old tickets. The project remains 100% maintenance-free and always fresh.

## Results

- **Zero Double-Bookings**: Successfully withstood Artillery load testing with 100 concurrent booking requests.
- **High Performance**: Achieved a p95 response time of 187ms under heavy load.
- **Self-Sustaining**: The system has run without manual intervention since deployment, dynamically syncing real-world movie data.
