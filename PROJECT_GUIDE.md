# Inventory Management System - Project Guide

## 🏗️ Project Structure

```
inventory-management-system/
├── apps/
│   └── web/                 # Frontend Application (Next.js)
│       ├── pages/          # Website Pages
│       ├── src/            # Source Code
│       │   ├── components/ # Reusable UI Components
│       │   └── contexts/   # State Management
│       └── public/         # Static Files (images, etc.)
├── server/                 # Backend Server (Node.js)
│   ├── src/
│   │   ├── models/        # Database Models
│   │   ├── routes/        # API Endpoints
│   │   └── middleware/    # Server Middleware
└── packages/
    └── types/             # Shared TypeScript Types
```

## 🛠️ Technologies Explained

### 1. Frontend (Next.js)
- **What it is**: A React framework for building websites
- **Key Files**:
  - `pages/`: Each file here becomes a webpage
  - `src/components/`: Reusable UI pieces
  - `src/contexts/`: Global state management
  - `public/`: Images and static files

### 2. Backend (Node.js/Express)
- **What it is**: Server-side JavaScript runtime
- **Key Files**:
  - `server/src/models/`: Database structure
  - `server/src/routes/`: API endpoints
  - `server/src/middleware/`: Server logic

### 3. Database (MongoDB)
- **What it is**: NoSQL database for storing data
- **Key Concepts**:
  - Collections (like tables)
  - Documents (like rows)
  - Schemas (data structure)

## 📁 Important Files Explained

### Frontend Files
1. `pages/_app.tsx`
   - Main application wrapper
   - Handles global styles and layouts

2. `pages/index.tsx`
   - Homepage of your website
   - First page users see

3. `src/components/Layout.tsx`
   - Common layout for all pages
   - Contains header, footer, navigation

4. `src/contexts/AuthContext.tsx`
   - Manages user authentication
   - Handles login/logout

### Backend Files
1. `server/src/index.ts`
   - Server entry point
   - Sets up Express server

2. `server/src/models/User.ts`
   - Defines user data structure
   - Handles user-related database operations

3. `server/src/routes/auth.ts`
   - Handles authentication endpoints
   - Login, register, logout

## 🔄 How It All Works Together

1. **User Visits Website**
   - Opens browser → goes to your domain
   - Next.js serves the frontend

2. **User Logs In**
   - Frontend sends login request
   - Backend verifies credentials
   - MongoDB stores/retrieves user data

3. **User Performs Actions**
   - Frontend makes API calls
   - Backend processes requests
   - Database updates accordingly

## 🚀 Development Workflow

1. **Starting Development**
   ```bash
   # Start frontend
   cd apps/web
   yarn dev

   # Start backend
   cd server
   yarn dev
   ```

2. **Making Changes**
   - Frontend: Edit files in `apps/web/`
   - Backend: Edit files in `server/src/`
   - Changes auto-reload in development

3. **Adding New Features**
   - Create new page in `pages/`
   - Add API endpoint in `routes/`
   - Update database model if needed

## 🔧 Common Tasks

### Adding a New Page
1. Create file in `pages/`
2. Export a React component
3. Add link in `Layout.tsx`

### Adding New API Endpoint
1. Create route in `server/src/routes/`
2. Add handler function
3. Connect to database if needed

### Updating Database
1. Modify model in `server/src/models/`
2. Update related API endpoints
3. Test with frontend

## 📚 Learning Resources

1. **Next.js**
   - [Next.js Documentation](https://nextjs.org/docs)
   - [React Documentation](https://reactjs.org/docs)

2. **Node.js/Express**
   - [Express Documentation](https://expressjs.com/)
   - [Node.js Documentation](https://nodejs.org/en/docs/)

3. **MongoDB**
   - [MongoDB Documentation](https://docs.mongodb.com/)
   - [Mongoose Guide](https://mongoosejs.com/docs/guide.html)

## 🛠️ Troubleshooting

### Common Issues
1. **Port Already in Use**
   - Check if another process is using the port
   - Change port in `.env` file

2. **Database Connection Issues**
   - Check MongoDB is running
   - Verify connection string in `.env`

3. **Build Errors**
   - Check TypeScript errors
   - Verify all dependencies are installed

### Debugging Tips
1. Use `console.log()` for debugging
2. Check browser console for frontend errors
3. Monitor server logs for backend errors

## 📝 Best Practices

1. **Code Organization**
   - Keep components small and focused
   - Use meaningful file/folder names
   - Comment complex logic

2. **Security**
   - Never commit `.env` files
   - Validate all user input
   - Use proper authentication

3. **Performance**
   - Optimize images
   - Use proper database indexing
   - Implement caching where needed

## 🔄 Deployment Process

1. **Prepare for Deployment**
   - Update environment variables
   - Build production version
   - Test thoroughly

2. **Deploy to AWS**
   - Set up EC2 instance
   - Configure MongoDB Atlas
   - Deploy frontend and backend

3. **Post-Deployment**
   - Monitor logs
   - Check performance
   - Update documentation

Remember: This is a living document. Update it as you learn more about the project! 