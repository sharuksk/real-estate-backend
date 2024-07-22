const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  dateOfBirth: {
    type: String,
    default: null
  },
  address: {
    type: String,
    default: null
  },
  qatarId: {
    type: String,
    default: null
  },
  preferredLanguage: {
    type: String,
    default: null
  },
  pinCode: {
    type: Number,
    default: null
  },
});

module.exports = mongoose.model('Profile', profileSchema);
