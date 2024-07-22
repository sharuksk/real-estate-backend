const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {
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
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ['Admin','Client','Owner','Agent'],
    required: true
  },
  additionalDetails:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"Profile"
  },
   contact: {
    type: String,
    trim: true,
    required:true,
    maxlength: 10,  
  },
 
});

module.exports = mongoose.model("User", userSchema);
