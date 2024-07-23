const mongoose = require("mongoose");
const leadSchema = new mongoose.Schema({
  clientname: {
    type: String,
    required: true,
  },
  propertyType: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"PropertyType",
  },
  source: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Source",
    required: true,
  },
  agentName: {
    type: String,
    required: true,
  }
}, {
  timestamps: true, 
});

module.exports = mongoose.model("Lead", leadSchema);
