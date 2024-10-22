/Basecamp1
│
├── /backend        # Backend code (Node.js + Express)
│   ├── /controllers
│   ├── /models
│   ├── /routes
│   ├── /middlewares (optional for auth or error handling)
│   └── server.js   # Main entry point for the backend
│
├── /frontend       # Frontend code (Vite React)
│   ├── /src
│   │   ├── /components
│   │   ├── /pages
│   │   ├── /services   # API calls to the backend
│   │   └── index.js
│   └── package.json   # Separate package.json for frontend
│
└── README.md
