const express = require("express");
const { getEvents, createEvent,getEventById,updateEvent, deleteEvent  } = require("../controllers/eventController");
const { ensureAuthenticated, ensureAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", getEvents); 
router.post("/", ensureAdmin, createEvent);
// router.post("/", createEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);
router.get("/:id", getEventById); // Ensure this route exists


module.exports = router;
