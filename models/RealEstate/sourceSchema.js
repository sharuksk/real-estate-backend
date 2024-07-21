const mongoose = require('mongoose');

const sourceSchema = new mongoose.Schema({
  sourcename: {
    type: String,
    required: true,
    trim: true
  },
  createdBy: {
    type: String, 
    required: true
  }
});

module.exports = mongoose.model("Source", sourceSchema);
