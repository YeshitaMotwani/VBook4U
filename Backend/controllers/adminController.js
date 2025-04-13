const pool = require("../config/db");

const getDashboardStats = async (req, res) => {
  try {
    const [totalUsers] = await pool.query("SELECT COUNT(*) AS users FROM users");
    const [totalEvents] = await pool.query("SELECT COUNT(*) AS events FROM events");
    const [totalBookings] = await pool.query("SELECT COUNT(*) AS bookings FROM bookings");
    

    res.json({
      users: totalUsers[0].users,
      events: totalEvents[0].events,
      bookings: totalBookings[0].bookings,
      revenue: totalRevenue[0].revenue || 0,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
};

module.exports = { getDashboardStats };
