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
  "https://fydp-c.vercel.app",  // ✅ production Vercel domain
  "http://localhost:3000",      // ✅ local development
];

app.use(
  cors({
    origin: function (origin, callback) {
      // ✅ Allow requests with no origin (Postman/curl/server-to-server)
      if (!origin) return callback(null, true);

      // ✅ Allow if origin is in whitelist
      if (allowedOrigins.includes(origin)) return callback(null, true);

      // ✅ Allow ALL Vercel preview deployments automatically
      if (origin.endsWith(".vercel.app")) return callback(null, true);

      // ❌ Block everything else
      return callback(new Error("Not allowed by CORS: " + origin));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// ✅ Handle preflight requests
app.options("*", cors());

/* =========================
   Middleware
========================= */
app.use(express.json());

/* =========================
   Health Check Routes
========================= */

// Main route
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Backend is running ✅" });
});

// Render health check
app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});

/* =========================
   Start Server + DB Connect
========================= */

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    console.log("🔌 Connect
