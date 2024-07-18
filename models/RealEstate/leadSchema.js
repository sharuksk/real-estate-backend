const mongoose = require("mongoose");
const leadSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  propertyType: {
    type: String,
    required: true,
  },
  source: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Source",
    required: true,
  },
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent",
    required: true,
  }
}, {
  timestamps: true, 
});

module.exports = mongoose.model("Lead", leadSchema);
