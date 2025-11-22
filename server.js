import express from "express";
import fs from "fs";
import cors from "cors";
import { v4 as uuid } from "uuid";

const app = express();
app.use(express.json());
app.use(cors());

const DB_PATH = "./db.json";

// Ensure DB exists
function initDB() {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(
      DB_PATH,
      JSON.stringify(
        {
          user_profiles: []
        },
        null,
        2
      )
    );
  }
}
initDB();

// Load DB safely
function loadDB() {
  try {
    return JSON.parse(fs.readFileSync(DB_PATH));
  } catch (err) {
    return { user_profiles: [] };
  }
}

// Save DB safely
function saveDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// -------------------------- AUTH --------------------------

// SIGNUP
app.post("/auth/signup", (req, res) => {
  const { email, password, first_name, last_name, goal } = req.body;

  const db = loadDB();

  const exists = db.user_profiles.find((u) => u.email === email);
  if (exists) return res.status(400).json({ error: "Email already exists" });

  const newUser = {
    id: uuid(),
    email,
    first_name: first_name || "",
    last_name: last_name || "",
    goal: goal || "learn",
    balance: 0,
    total_earnings: 0,
    total_invested: 0,
    xp: 0,
    streak: 0,
    badges: [],
    kyc_status: "pending",
    role: "user",
    plaintext_password: password,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  db.user_profiles.push(newUser);
  saveDB(db);

  res.json({ message: "Signup successful", user: newUser });
});

// LOGIN
app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  const db = loadDB();
  const user = db.user_profiles.find(
    (u) => u.email === email && u.plaintext_password === password
  );

  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  res.json({
    message: "Login successful",
    user,
    role: user.role
  });
});

// ---------------------- ADMIN ROUTES ----------------------

app.get("/admin/users", (req, res) => {
  const role = req.query.role;
  if (role !== "admin") {
    return res.status(403).json({ error: "Admin only" });
  }

  const db = loadDB();
  res.json(db.user_profiles);
});

// ---------------------- SAFER TABLE GET ----------------------

app.get("/table/:name", (req, res) => {
  const table = req.params.name;
  const db = loadDB();

  if (!db[table]) return res.status(404).json({ error: "Table not found" });

  res.json(db[table]);
});

// ---------------------- SERVER START ----------------------

app.listen(3000, () =>
  console.log("Backend running on http://localhost:3000")
);
