# Inventory Management System

A modern inventory management system built with Next.js, Node.js, and MongoDB.

## Project Structure

```
inventory-management-system/
├── apps/
│   └── web/           # Next.js frontend application
├── server/            # Node.js backend server
└── packages/
    └── types/         # Shared TypeScript types
```

## Prerequisites

- Node.js (v18 or higher)
- Yarn (v1.22 or higher)
- MongoDB (local or Atlas)

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd inventory-management-system
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Create a `.env` file in the server directory:
   ```
   MONGODB_URI=mongodb://localhost:27017/inventory
   PORT=3001
   JWT_SECRET=your-secret-key
   ```

4. Start the development servers:
   ```bash
   # Start the backend server
   cd server
   yarn dev

   # In a new terminal, start the frontend
   cd apps/web
   yarn dev
   ```

5. Open your browser and navigate to:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## Features

- User authentication and authorization
- Product inventory management
- Stock tracking and alerts
- Sales and purchase history
- Reporting and analytics

## Tech Stack

- Frontend:
  - Next.js
  - React
  - Chakra UI
  - React Query
  - TypeScript

- Backend:
  - Node.js
  - Express
  - MongoDB
  - TypeScript
  - JWT Authentication

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
