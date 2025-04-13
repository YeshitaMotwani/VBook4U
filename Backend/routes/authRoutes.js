const express = require("express");
const passport = require("passport");
const { signup, login, logout } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", passport.authenticate("local"), login);
router.get("/logout", logout);

module.exports = router;
