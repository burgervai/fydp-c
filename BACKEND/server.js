const express = require("express");
const cors = require("cors");
const db = require("./models");

// ✅ Load the routes/index.js router
const apiRoutes = require("./routes");

const app = express();

/* =========================
   CORS CONFIG (Vercel + Preview URLs)
========================= */
const allowedOrigins = [
  "https://fydp-c.vercel.app",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // ✅ Allow requests with no origin (Postman/curl)
      if (!origin) return callback(null, true);

      // ✅ Allow listed origins
      if (allowedOrigins.includes(origin)) return callback(null, true);

      // ✅ Allow ALL Vercel preview deployments
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
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Backend is running" });
});

app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});

/* =========================
   ✅ API ROUTES
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
