// const pool = require("../config/db");

// const bookEvent = async (req, res) => {
//   const { user_id, event_id, seat_number } = req.body;

//   try {
//     // Check if seat is already booked
//     const [existingBooking] = await pool.query(
//       "SELECT * FROM bookings WHERE event_id = ? AND seat_number = ?",
//       [event_id, seat_number]
//     );

//     if (existingBooking.length > 0) {
//       return res.status(400).json({ error: "Seat already booked" });
//     }

//     // Insert booking record
//     await pool.query(
//       "INSERT INTO bookings (user_id, event_id, seat_number, status,created_at) VALUES (?, ?, ?, ?, ?)",
//       [user_id, event_id, seat_number, "confirmed", NOW()]
//     );

//     // Decrease available seats
//     await pool.query(
//       "UPDATE events SET available_seats = available_seats - 1 WHERE id = ?",
//       [event_id]
//     );

//     res.status(201).json({ message: "Booking successful" });
//   } catch (error) {
//     res.status(500).json({ error: "Booking failed" });
//   }
// };
// const getUserBookings = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const [bookings] = await pool.query(`
//       SELECT b.*, e.name AS event_name, e.date, e.venue
//       FROM bookings b
//       JOIN events e ON b.event_id = e.id
//       WHERE b.user_id = ?
//       ORDER BY b.created_at DESC`, [id]);

//     res.json(bookings);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch user bookings" });
//   }
// };

// const cancelBooking = async (req, res) => {
//   const { booking_id } = req.params;

//   try {
//     const [booking] = await pool.query("SELECT * FROM bookings WHERE id = ?", [booking_id]);

//     if (booking.length === 0) {
//       return res.status(404).json({ error: "Booking not found" });
//     }

//     // Update booking status and cancellation timestamp
//     await pool.query("UPDATE bookings SET status = 'cancelled', cancelled_at = NOW() WHERE id = ?", [booking_id]);

//     // Increase available seats
//     await pool.query(
//       "UPDATE events SET available_seats = available_seats + 1 WHERE id = ?",
//       [booking[0].event_id]
//     );

//     res.status(200).json({ message: "Booking cancelled successfully" });
//   } catch (error) {
//     console.error("Error cancelling booking:", error);
//     res.status(500).json({ error: "Cancellation failed" });
//   }
// };

// module.exports = { bookEvent, cancelBooking, getUserBookings };


const pool = require("../config/db");

// Book an Event
const bookEvent = async (req, res) => {
  const { user_id, event_id, seat_number } = req.body;

  if (!user_id || !event_id || !seat_number) {
    return res.status(400).json({ error: "Missing booking details" });
  }

  try {
    // Check if seat is already booked
    const [existingBooking] = await pool.query(
      "SELECT * FROM bookings WHERE event_id = ? AND seat_number = ?",
      [event_id, seat_number]
    );

    if (existingBooking.length > 0) {
      return res.status(400).json({ error: "Seat already booked" });
    }

    // Insert booking record
    await pool.query(
      "INSERT INTO bookings (user_id, event_id, seat_number,total_price, status, created_at) VALUES (?, ?, ?, ?, ?)",
      [user_id, event_id, seat_number,total_price,"confirmed", new Date()]
    );

    // Decrease available seats
    await pool.query(
      "UPDATE events SET available_seats = available_seats - 1 WHERE id = ?",
      [event_id]
    );

    res.status(201).json({ message: "Booking successful" });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ error: "Booking failed" });
  }
};

// Get All Bookings for a User
const getUserBookings = async (req, res) => {
  const { id } = req.params;

  try {
    const [bookings] = await pool.query(`
      SELECT b.*, e.name AS event_name, e.date, e.venue
      FROM bookings b
      JOIN events e ON b.event_id = e.id
      WHERE b.user_id = ?
      ORDER BY b.created_at DESC`, [id]);

    res.json(bookings);
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ error: "Failed to fetch user bookings" });
  }
};
// Get all booked seat numbers for a specific event
const getBookedSeatsByEvent = async (req, res) => {
  const { id: event_id } = req.params;

  try {
    const [seats] = await pool.query(
      "SELECT seat_number FROM bookings WHERE event_id = ? AND status = 'confirmed'",
      [event_id]
    );

    const seatNumbers = seats.map((seat) => seat.seat_number);
    res.json(seatNumbers);
  } catch (error) {
    console.error("Error fetching booked seats:", error);
    res.status(500).json({ error: "Failed to fetch booked seats" });
  }
};

// Cancel a Booking
const cancelBooking = async (req, res) => {
  const { id: booking_id } = req.params; // Correcting key to match route

  try {
    const [booking] = await pool.query("SELECT * FROM bookings WHERE id = ?", [booking_id]);

    if (booking.length === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Update booking status and cancellation time
    await pool.query(
      "UPDATE bookings SET status = 'cancelled', cancelled_at = ? WHERE id = ?",
      [new Date(), booking_id]
    );

    // Increase available seats in the event
    await pool.query(
      "UPDATE events SET available_seats = available_seats + 1 WHERE id = ?",
      [booking[0].event_id]
    );

    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling booking:", error);
    res.status(500).json({ error: "Cancellation failed" });
  }
};

module.exports = { bookEvent, cancelBooking, getUserBookings,getBookedSeatsByEvent };

