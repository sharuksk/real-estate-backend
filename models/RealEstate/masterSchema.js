const mongoose = require('mongoose');
const masterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true,
  },
  active: {
    type: Boolean,
    default: true,
    required: true
  },
}, { timestamps: true }); 

module.exports = mongoose.model("Master", masterSchema);
