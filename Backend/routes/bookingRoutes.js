const express = require("express");
const { bookEvent,getUserBookings, cancelBooking,getBookedSeatsByEvent } = require("../controllers/bookingController");
const {getEventById} = require("../controllers/eventController");
const { ensureAuthenticated } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Booking Route Working");
});
router.get("/:id", getEventById);
router.get("/user/:id", getUserBookings);
router.put("/cancel/:id", cancelBooking); //booking_id
router.post("/", ensureAuthenticated, bookEvent);
// router.delete("/cancel/:booking_id", ensureAuthenticated, cancelBooking);

module.exports = router;
