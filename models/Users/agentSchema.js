const mongoose = require('mongoose');
const agentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  contact: {
    type: String,
    trim: true,
    required:true,
    maxlength: 10,  
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  licenseInfo: {
    type: String,
  },
  commissionInfo: {
    type: String,
  },
  qatarId: {
    type: String,
    required: true,
  },
  projects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  }],
  // properties: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Property",
  // }],
}, {
  timestamps: true,
});

module.exports = mongoose.model("Agent", agentSchema);
