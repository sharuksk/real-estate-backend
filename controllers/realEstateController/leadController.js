const leadSchema = require("../../models/RealEstate/leadSchema");
const propertyTypeSchema=require("../../models/RealEstate/propertyType");
const sourceSchema = require("../../models/RealEstate/sourceSchema");
exports.createLead = async (req, res) => {
    try {
      const { clientname, propertyType, source, agentName } = req.body;

      if (propertyType) {
        const propertyTypeExists = await propertyTypeSchema.findById(propertyType);
        if (!propertyTypeExists) return res.status(400).json({ message: 'Invalid property type ID' });
      }
  
      const sourceExists = await sourceSchema.findById(source);
      if (!sourceExists) return res.status(400).json({ message: 'Invalid source ID' });
  
      const newLead = new Lead({
        clientname,
        propertyType,
        source,
        agentName
      });
  
      await newLead.save();
      res.status(201).json({
        message: "Lead created successfully",
        newLead
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
        message: "Unexpected error occurred"
      });
    }
  };
  
  // Get a lead by ID
  exports.getLeadById = async (req, res) => {
    try {
      const { id } = req.params;
      const lead = await leadSchema.findById(id).populate('PropertyType').populate('Source');
  
      if (!lead) return res.status(404).json({ message: 'Lead not found' });
  
     return res.status(200).json({
        message:"Lead Fetched Successfully",
        lead,
     })
    } catch (error) {
      res.status(500).json({
        error: error.message,
        message: "Unexpected error occurred"
      });
    }
  };
  
  // Update a lead by ID
  exports.updateLead = async (req, res) => {
    try {
      const { id } = req.params;
      const { clientname, propertyType, source, agentName } = req.body;

      if (propertyType) {
        const propertyTypeExists = await propertyTypeSchema.findById(propertyType);
        if (!propertyTypeExists) return res.status(400).json({ message: 'Invalid property type ID' });
      }
  
      const sourceExists = await sourceSchema.findById(source);
      if (!sourceExists) return res.status(400).json({ message: 'Invalid source ID' });
  
      const updatedLead = await Lead.findByIdAndUpdate(
        id,
        {
          clientname,
          propertyType,
          source,
          agentName
        },
        { new: true } 
      );
  
      if (!updatedLead) return res.status(404).json({ message: 'Lead not found' });
  
      res.status(200).json({
        message: "Lead updated successfully",
        updatedLead
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
        message: "Unexpected error occurred"
      });
    }
  };
  
  // Delete a lead by ID
  exports.deleteLead = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedLead = await leadSchema.findByIdAndDelete(id);
  
      if (!deletedLead) return res.status(404).json({ message: 'Lead not found' });
  
      res.status(200).json({
        message: "Lead deleted successfully",
        deletedLead
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
        message: "Unexpected error occurred"
      });
    }
  };
  
  // Get all leads
  exports.getAllLeads = async (req, res) => {
    try {
      const leads = await leadSchema.find().populate('PropertyType').populate('Source');
      res.status(200).json(leads);
    } catch (error) {
      res.status(500).json({
        error: error.message,
        message: "Unexpected error occurred"
      });
    }
  };