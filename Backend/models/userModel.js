const pool = require("../config/db");

const createUserTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role ENUM('user', 'admin') DEFAULT 'user' NOT NULL
    )
  `);
};

module.exports = { createUserTable };
