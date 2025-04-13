const express = require("express");
const { getDashboardStats } = require("../controllers/adminController");
const { ensureAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/dashboard", ensureAdmin, getDashboardStats);

module.exports = router;
