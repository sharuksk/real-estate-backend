const mongoose = require('mongoose');
const amenitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  }
});

module.exports = mongoose.model("Amenity", amenitySchema);
