const passport = require("passport");

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: "Unauthorized. Please log in." });
};

const ensureAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === "admin") return next();
  res.status(403).json({ message: "Forbidden. Admin access only." });
};

module.exports = { ensureAuthenticated, ensureAdmin };
