const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  content: { type: String, required: true },
  rating: { type: Number, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
});

module.exports = mongoose.model('Review', reviewSchema);
