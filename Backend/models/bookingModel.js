const pool = require("../config/db");

const createBookingTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INT PRIMARY KEY AUTO_INCREMENT,
      user_id INT NOT NULL,
      event_id INT NOT NULL,
      seat_number VARCHAR(10) NOT NULL,
      status ENUM('confirmed', 'cancelled') DEFAULT 'confirmed' NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
      UNIQUE (event_id, seat_number)
    );
      
      ALTER TABLE bookings ADD cancelled_at DATETIME NULL;
      ALTER TABLE bookings ADD created_at DATETIME NULL;
      ALTER TABLE bookings
      ADD COLUMN total_price INT NOT NULL DEFAULT 0;
  `);
};

module.exports = { createBookingTable };
