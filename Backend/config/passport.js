const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("./db");
const bcrypt = require("bcryptjs");

// Configure Local Strategy
passport.use(new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    try {
      // Check if the user exists
      const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
      if (rows.length === 0) {
        return done(null, false, { message: "No user found with this email." });
      }

      const user = rows[0];

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: "Incorrect password." });
      }

      return done(null, user);
    } catch (error) {
      console.error("Passport Authentication Error:", error);
      return done(error);
    }
  }
));

//Serialize User
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//Deserialize User
passport.deserializeUser(async (id, done) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    if (rows.length === 0) {
      return done(null, false);
    }
    done(null, rows[0]);
  } catch (error) {
    console.error("Deserialize Error:", error);
    done(error);
  }
});

module.exports = passport;
