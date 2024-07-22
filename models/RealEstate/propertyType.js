const mongoose = require('mongoose');

const propertyTypeSchema = new mongoose.Schema({
    propertyTypeName: {
    type: String,
    required: true,
    trim: true
  },
  createdBy: {
    type: String, 
    required: true
  }
});

module.exports = mongoose.model("PropertyType", propertyTypeSchema);
