# Inventory Management System

A full-stack inventory management system built with Next.js, MongoDB, and Express.

## Features

- User Authentication (Super Admin, Admin, Regular User)
- Product Management
- Order Management
- User Management
- Dashboard Analytics
- Referral System
- Shopping Cart
- Checkout Process

## Tech Stack

- Frontend: Next.js, TypeScript, Chakra UI
- Backend: Node.js, Express, MongoDB
- Authentication: JWT
- State Management: React Context API

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/meetbalajiap/inventory-management-system.git
cd inventory-management-system
```

2. Install dependencies:
```bash
yarn install
```

3. Set up environment variables:
- Create `.env` files in both `apps/web` and `server` directories
- Copy the example environment variables from `.env.example`

4. Start the development servers:
```bash
# Start the web application
yarn dev

# Start the server (in a separate terminal)
cd server
yarn dev
```

## Project Structure

```
inventory-management-system/
├── apps/
│   └── web/                 # Next.js frontend application
│       ├── pages/          # Next.js pages
│       ├── src/            # Source code
│       │   ├── components/ # React components
│       │   └── contexts/   # React contexts
│       └── public/         # Static files
├── server/                 # Express backend server
│   ├── src/
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   └── middleware/    # Express middleware
│   └── .env               # Environment variables
└── packages/
    └── types/             # Shared TypeScript types
```

## Test Accounts

1. Super Admin:
   - Email: meetbalajiap@gmail.com
   - Password: AravindhUdhay@12415

2. Admin:
   - Email: admin@okeetropics.com
   - Password: Admin@123

3. Regular User:
   - Email: user@okeetropics.com
   - Password: User@123

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
