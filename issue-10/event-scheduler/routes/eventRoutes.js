const express = require('express');
const { createEvent, getEvents } = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', protect, createEvent);
router.get('/', getEvents);

module.exports = router;
