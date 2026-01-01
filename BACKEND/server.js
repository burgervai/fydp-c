const express = require("express");
const cors = require("cors");
const db = require("./models");

const app = express();

// Middleware
app.use(cors({
  origin: "*", // later replace with your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// Health check (Render uses this sometimes)
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Backend is running ✅" });
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    console.log("🔌 Connecting to database...");
    await db.sequelize.authenticate();
    console.log("✅ Database connected");

    // IMPORTANT:
    // Use alter:true temporarily during development/deploy
    console.log("🛠️ Syncing database...");
    await db.sequelize.sync({ alter: true });
    console.log("✅ Database synced");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ DB Error:", err);
    process.exit(1); // ensures Render restarts service
  }
}

startServer();
