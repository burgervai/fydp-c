const express = require("express");
const cors = require("cors");
const db = require("./models");

// ✅ Import your routes folder index
const apiRoutes = require("./routes"); // this automatically loads routes/index.js

const app = express();

/* =========================
   CORS CONFIG (for Vercel + Preview URLs)
========================= */
const allowedOrigins = [
  "https://fydp-c.vercel.app",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) return callback(null, true);

      // ✅ allow all Vercel preview deployments
      if (origin.endsWith(".vercel.app")) return callback(null, true);

      return callback(new Error("Not allowed by CORS: " + origin));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// ✅ Handle preflight
app.options("*", cors());

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
   ✅ API ROUTES MOUNTED HERE
========================= */
app.use("/api", apiRoutes);

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
