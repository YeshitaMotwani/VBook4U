const pool = require("../config/db");

const createEventTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS events (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      date DATE NOT NULL,
      time TIME NOT NULL,
      venue VARCHAR(255) NOT NULL,
      total_seats INT NOT NULL CHECK (total_seats > 0),
      available_seats INT NOT NULL CHECK (available_seats >= 0),
      price DECIMAL(10,2) NOT NULL CHECK (price >= 0)
    )
  `);
};

module.exports = { createEventTable };
