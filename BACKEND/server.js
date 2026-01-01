const express = require("express");
const cors = require("cors");
const db = require("./models");

const app = express();

/* =========================
   Middleware
========================= */
app.use(
  cors({
    origin: [
      "https://fydp-c.vercel.app",
      "http://localhost:3000"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.options("*", cors());

app.use(express.json());

/* =========================
   Health Check Routes
========================= */

// Main route
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Backend is running ✅" });
});

// Render health check path (set this in Render dashboard)
app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});

/* =========================
   Start Server + DB Connect
========================= */

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    console.log("🔌 Connecting to database...");
    await db.sequelize.authenticate();
    console.log("✅ Database connected");

    // ✅ Sync DB tables (TEMPORARY for deployment; later use migrations)
    console.log("🛠️ Syncing database...");
    await db.sequelize.sync({ alter: true });
    console.log("✅ Database synced");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ DB Error:", err);
    process.exit(1); // ✅ Render restarts service automatically
  }
}

startServer();
