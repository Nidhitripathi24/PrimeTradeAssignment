# 📝 NotesApp - Modern Full Stack Note Taking Application

<div align="center">

![NotesApp](https://img.shields.io/badge/NotesApp-v1.0.0-blueviolet?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-47A248?style=for-the-badge&logo=mongodb)

**A beautiful, modern note-taking application with glassmorphism design**

[Live Demo](#) • [Report Bug](https://github.com/Nidhitripathi24/PrimeTradeAssignment/issues) • [Request Feature](https://github.com/Nidhitripathi24/PrimeTradeAssignment/issues)

</div>

---

## 🌟 Features

### ✨ Modern Glassmorphic UI
- **Stunning gradient background** with purple to violet color scheme (#667eea → #764ba2)
- **Glassmorphism effects** with frosted glass cards and backdrop blur
- **Smooth animations** and transitions with cubic-bezier easing
- **Multi-layer shadows** for enhanced depth and visual hierarchy
- **Responsive design** that works seamlessly on all devices

### 📋 Full CRUD Functionality
- ✅ **Create** - Add new notes with title and content
- ✅ **Read** - View all your notes in a beautiful card layout
- ✅ **Update** - Edit notes inline with a smooth interface
- ✅ **Delete** - Remove notes with confirmation dialog

### 🔐 Authentication & Security
- **User registration** with secure password hashing
- **JWT-based authentication** for secure API access
- **Protected routes** to ensure data privacy
- **User profile management** with ability to update credentials

### 🎨 Design Highlights
- Modern **gradient buttons** with shine animation effects
- **Floating input fields** with enhanced focus states
- **Uppercase labels** for better visual hierarchy
- Custom **styled scrollbar** matching the theme
- **Empty state illustrations** for better UX
- **Hover effects** on all interactive elements

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client for API calls
- **Vite** - Lightning-fast build tool

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **bcryptjs** - Password hashing
- **JWT** - Secure authentication tokens
- **CORS** - Cross-origin resource sharing

---

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Clone the Repository
```bash
git clone https://github.com/Nidhitripathi24/PrimeTradeAssignment.git
cd PrimeTradeAssignment
```

### Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
echo "MONGODB_URI=mongodb://localhost:27017/notesapp
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000" > .env

# Start the server
npm run dev
```

The backend server will start on `http://localhost:5000`

### Frontend Setup
```bash
# Navigate to client directory (in a new terminal)
cd client

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will start on `http://localhost:5173` or `http://localhost:5174`

---

## 🚀 Usage

### 1. **Register an Account**
- Visit the signup page
- Enter your name, email, and password
- Click "Create Account"

### 2. **Login**
- Enter your email and password
- Access your personal dashboard

### 3. **Create Notes**
- Use the sticky creation form on the left
- Enter a title and content
- Click "Add Note"

### 4. **Manage Notes**
- **Edit**: Click the pencil icon to edit any note inline
- **Delete**: Click the trash icon to remove a note
- All changes are saved automatically to the database

### 5. **Update Profile**
- Navigate to Profile settings
- Update your name, email, or password
- Changes apply immediately

---

## 📁 Project Structure

```
PrimeTradeAssignment/
├── client/                      # Frontend React application
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   │   ├── Navbar.jsx       # Navigation bar with glassmorphism
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/             # React Context for state management
│   │   │   └── AuthContext.jsx  # Authentication context
│   │   ├── pages/               # Page components
│   │   │   ├── Dashboard.jsx    # Main notes dashboard
│   │   │   ├── Login.jsx        # Login page
│   │   │   ├── Signup.jsx       # Registration page
│   │   │   └── Profile.jsx      # User profile settings
│   │   ├── utils/               # Utility functions
│   │   │   └── api.js           # Axios API configuration
│   │   ├── App.jsx              # Main app component
│   │   ├── index.css            # Global styles with glassmorphism
│   │   └── main.jsx             # App entry point
│   ├── tailwind.config.js       # Tailwind configuration
│   ├── vite.config.js           # Vite configuration
│   └── package.json
│
├── server/                      # Backend Node.js application
│   ├── controllers/             # Route controllers
│   │   ├── auth.controller.js   # Authentication logic
│   │   └── note.controller.js   # Note CRUD operations
│   ├── middleware/              # Custom middleware
│   │   └── auth.middleware.js   # JWT verification
│   ├── models/                  # Mongoose models
│   │   ├── User.js              # User schema
│   │   └── Note.js              # Note schema
│   ├── routes/                  # API routes
│   │   ├── auth.routes.js       # Auth endpoints
│   │   └── note.routes.js       # Note endpoints
│   ├── index.js                 # Server entry point
│   └── package.json
│
└── README.md                    # This file
```

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/signup` | Register new user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| GET | `/api/auth/me` | Get current user | ✅ |
| PUT | `/api/auth/update` | Update user profile | ✅ |

### Notes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/notes` | Get all user notes | ✅ |
| POST | `/api/notes` | Create new note | ✅ |
| PUT | `/api/notes/:id` | Update note | ✅ |
| DELETE | `/api/notes/:id` | Delete note | ✅ |

---

## 🎨 Design Features

### Glassmorphism Effects
- **Frosted glass cards** with `backdrop-filter: blur(20px)`
- **Semi-transparent backgrounds** (rgba with 0.95-0.98 opacity)
- **Subtle borders** with transparency for depth
- **Multi-layer shadows** for enhanced realism

### Color Palette
- **Primary Gradient**: `#667eea` → `#764ba2`
- **Background**: Linear gradient purple to violet
- **Text**: `#2d3748` (dark slate)
- **Labels**: `#4a5568` (medium slate)
- **Borders**: `rgba(102, 126, 234, 0.15)` (translucent blue)

### Animations
- **Hover lift** effect (-6px translateY)
- **Button shine** animation with pseudo-element
- **Focus rings** with soft glow (4px blur)
- **Cubic-bezier** easing for smooth transitions
- **Scale effects** on icon buttons (1.08x)

---

## 🖼️ Screenshots

### Login Page
Beautiful glassmorphic login card with gradient background

### Dashboard
Modern note management interface with inline editing

### Profile Settings
Clean profile management page

---

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
```env
MONGODB_URI=mongodb://localhost:27017/notesapp
JWT_SECRET=your_secret_key_here
PORT=5000
```

**Frontend**
- API URL is configured in `client/src/utils/api.js`
- Default: `http://localhost:5000/api`

---

## 🚢 Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy the 'dist' folder
```

### Backend (Heroku/Railway)
```bash
cd server
# Set environment variables
# Deploy using platform-specific commands
```

### Database (MongoDB Atlas)
- Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Update `MONGODB_URI` in your environment variables

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👩‍💻 Author

**Nidhi Tripathi**

- GitHub: [@Nidhitripathi24](https://github.com/Nidhitripathi24)
- Project Link: [https://github.com/Nidhitripathi24/PrimeTradeAssignment](https://github.com/Nidhitripathi24/PrimeTradeAssignment)

---

## 🙏 Acknowledgments

- Design inspiration from [Dribbble](https://dribbble.com) 2024 trends
- Glassmorphism UI patterns
- Modern web design best practices
- React and Node.js communities

---

<div align="center">

**Made with ❤️ and React**

If you found this project helpful, please give it a ⭐!

</div>
