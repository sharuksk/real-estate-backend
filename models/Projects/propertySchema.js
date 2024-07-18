const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  referenceAgent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent",
  },
  priceUSD: {
    type: Number,
    required: true,
  },
  amenities: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Amenity",
  }],
  description: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  images: [{
    type: String,
  }],
  loanAvailability: {
    type: Boolean,
    required: true,
  }
}, {
  timestamps: true, 
});

module.exports = mongoose.model("Property", propertySchema);
