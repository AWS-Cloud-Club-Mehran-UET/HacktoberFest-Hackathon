const Event = require('../models/Event');

// Create Event
exports.createEvent = async (req, res) => {
  const { title, description, date, capacity } = req.body;
  const userId = req.user._id;

  try {
    const event = new Event({ title, description, date, capacity, createdBy: userId });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
