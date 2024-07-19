const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  for: {
    type: String,
    enum: ['Sale', 'Rent'],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  uploader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agent', 
    required: true,
  },
  status: {
    type: String,
    enum: ['Available', 'Pending', 'Sold'],
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
