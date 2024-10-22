const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const rateLimit = require("express-rate-limit");
const cors = require("cors"); // Import the cors package
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
require("dotenv").config(); // Use environment variables from .env file

const app = express();

// Enable CORS for all routes
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true, // Allow cookies and credentials to be sent
  })
);


app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret_key", // Replace with a secure key in production
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI || process.env.URI,
    }), // Store sessions in MongoDB
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day expiration for session cookies
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production (requires HTTPS)
    },
  })
);

const loginLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // Limit each IP to 5 login requests per `windowMs`
  message:
    "Too many login attempts from this IP, please try again after an hour",
});

app.use("/api/users/login", loginLimiter);

app.use("/api/users", userRoutes);

app.use("/api/projects", projectRoutes);

app.get("/", (req, res) => {
  const data = { message: "Welcome to MyBaseCamp API" };
  res.send(data);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
