const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const passport = require("passport");

const signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    //Check if the user already exists
    const [existingUser] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role || "user"]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ error: "Signup failed" });
  }
};
const login = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Authentication failed" });
  }
const token = jwt.sign(
  { id: req.user.id, role: req.user.role }, 
  process.env.JWT_SECRET, 
  { expiresIn: "1h" }
);

res.json({
  message: "Login successful",
  user: {
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  },
  token,
});
};

const logout = (req, res) => {
  if (!req.user) {
    return res.status(400).json({ error: "No user logged in" });
  }

  req.logout(() => res.json({ message: "Logged out successfully" }));
};

module.exports = { signup, login, logout };
