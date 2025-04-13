const pool = require("../config/db");

const getEvents = async (req, res) => {
  try {
    const [events] = await pool.query("SELECT * FROM events");
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
};
const getEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const [event] = await pool.query("SELECT * FROM events WHERE id = ?", [id]);
    if (event.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json(event[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch event" });
  }
};

const createEvent = async (req, res) => {
  const { name, description, date, time, venue, total_seats, price } = req.body;
  if (!name || !date || !venue || !total_seats || !price) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    await pool.query(
      "INSERT INTO events (name, description, date, time, venue, total_seats, available_seats, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [name, description, date, time, venue, total_seats, total_seats, price]
    );
    console.log("Event data received:", req.body);

    res.status(201).json({ message: "Event created successfully" });
  } catch (error) {
    console.error("Error in getEvents:", error);
    res.status(500).json({ error: "Failed to create event" });
  }
};

const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { name, date, venue, available_seats } = req.body;

  try {
    await pool.query(
      "UPDATE events SET name = ?, date = ?, venue = ?, available_seats = ? WHERE id = ?",
      [name, date, venue, available_seats, id]
    );
    res.json({ message: "Event updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Update failed" });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM events WHERE id = ?", [id]);
    res.json({ message: "Event deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Deletion failed" });
  }
};

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
