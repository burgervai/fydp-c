const express = require("express");
const cors = require("cors");
const db = require("./models");

const app = express();

/* =========================
   CORS CONFIG (FIXED)
   - Allows production vercel domain
   - Allows all vercel preview domains (*.vercel.app)
   - Allows localhost
========================= */

const allowedOrigins = [
  "https://fydp-c.vercel.app",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman/curl)
      if (!origin) return callback(null, true);

      // Allow whitelisted origins
      if (allowedOrigins.includes(origin)) return callback(null, true);

      // Allow all vercel preview deployments
      if (origin.endsWith(".vercel.app")) return callback(null, true);

      return callback(new Error("Not allowed by CORS: " + origin));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Handle preflight requests
app.options("*", cors());

/* =========================
   Middleware
========================= */
app.use(express.json());

/* =========================
   Health Check Routes
========================= */

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Backend is running" });
});

app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});

/* =========================
   Start Server + DB Connect
========================= */

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    console.log("Connecting to database...");
    await db.sequelize.authenticate();
    console.log("Database connected");

    console.log("Syncing database...");
    await db.sequelize.sync({ alter: true });
    console.log("Database synced");

    app.listen(PORT, "0.0.0.0", () => {
      console.log("Server running on port " + PORT);
    });
  } catch (err) {
    console.error("DB Error:", err);
    process.exit(1);
  }
}

startServer();
