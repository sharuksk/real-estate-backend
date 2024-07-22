const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String, 
    required: true,
    trim: true
  },
  area: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  coverImage: {
    type: String 
   }
}, {
  timestamps: true  
});

module.exports = mongoose.model('Project', projectSchema);
