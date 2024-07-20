const mongoose = require('mongoose');
const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
    maxlength: 10,  
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  qatarId: {
    type: String,
    // required: true,
  },
  role: {
    type: String,
    enum: ['Client'],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    // required: true,
  },
  occupation: {
    type: String,
    // required: true,
  },
  designation: {
    type: String,
    // required: true,
  },
  organization: {
    type: String,
    // required: true,
  },
  dob: {
    type: Date,
    // required: true,
  },
  preferredLanguage: {
    type: String,
    // required: true,
  },
  city: {
    type: String,
    // required: true,
  },
  pinCode: {
    type: Number,
    // required: true,
  },
  source: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Master",
    // required: true,
  },
}, { timestamps: true }); 

module.exports = mongoose.model("Client", clientSchema);
