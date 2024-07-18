const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  contact: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true, 
  },
  licenseInfo: {
    type: String,
    required: true,
  },
  commissionInfo: {
    type: String,
    required: true,
  },
  projects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  }],
  properties: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
  }],
  role: {
    type: String,
    enum: ['Agent'],
    required: true,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model("Agent", agentSchema);
