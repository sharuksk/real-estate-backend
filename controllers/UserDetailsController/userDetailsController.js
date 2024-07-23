const Project = require("../../models/RealEstate/Project");
const sourceSchema = require("../../models/RealEstate/sourceSchema");
const agentSchema = require("../../models/Users/agentSchema");
const clientSchema=require("../../models/Users/clientSchema");
const ownerSchema = require("../../models/Users/ownerSchema");
exports.createClient = async (req, res) => {
    try {
      const { name, contact, email, qatarId, address, state, occupation, designation, organization, dob, preferredLanguage, city, pinCode, source } = req.body;
  
      const sourceExists = await sourceSchema.findById(source);
      if (!sourceExists) return res.status(400).json({ message: 'Invalid source ID' });
  
      const newClient = new clientSchema({
        name,
        contact,
        email,
        qatarId,
        address,
        state,
        occupation,
        designation,
        organization,
        dob,
        preferredLanguage,
        city,
        pinCode,
        source,
      });
  
      await newClient.save();
    return res.status(200).json({
        message:"Client Created Successfully By Admin",
        newClient
    })
    } catch (error) {
      res.status(500).json({ error: error.message ,
        message:"Unexpected Error"
      });
    }
  };
  
  exports.getClients = async (req, res) => {
    try {
      const clients = await clientSchema.find().populate('source');
   return res.status(200).json({
    messsage:"Clients Details Fetched Successfully",
clients,   })
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.getClientById = async (req, res) => {
    try {
      const client = await clientSchema.findById(req.params.id).populate('Source');
      if (!client) return res.status(404).json({ message: 'Client not found' });
      res.status(200).json(client);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  exports.removeClient = async (req, res) => {
    try {
      const {id } = req.params; 
      const client = await clientSchema.findByIdAndDelete(id);
  
      if (!client) {
        return res.status(404).json({ message: 'Client not found' });
      }
  
      res.status(200).json({ message: 'Client successfully deleted', });
    } catch (error) {
  
      console.error(error);
      res.status(500).json({ message: 'Server error', error });
    }
  };

  exports.updateClient = async (req, res) => {
    try {
      const { id } = req.params; 
      console.log("The clietn for updating param sis",id);
      const { name, contact, email, qatarId, address, state, occupation, designation, organization, dob, preferredLanguage, city, pinCode, source } = req.body;

      if (source) {
        const sourceExists = await sourceSchema.findById(source);
        if (!sourceExists) return res.status(400).json({ message: 'Invalid source ID' });
      }
  
      const updatedClient = await clientSchema.findByIdAndUpdate(
        id,
        {
          name,
          contact,
          email,
          qatarId,
          address,
          state,
          occupation,
          designation,
          organization,
          dob,
          preferredLanguage,
          city,
          pinCode,
          source
        },
      );
  
      if (!updatedClient) return res.status(404).json({ message: 'Client not found' });
  
      res.status(200).json(updatedClient);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  //AGENT Controller//
  exports.createAgent = async (req, res) => {
    try {
      const { name, contact, email, qatarId, address, state, occupation, designation, organization, dob, preferredLanguage, city,  commissionInfo,pinCode, projects } = req.body;
  
      const projectsExists = await Project.findById(projects);
      if (!projectsExists) return res.status(400).json({ message: 'Invalid source ID' });
  
      const newAgent = new agentSchema({
        name,
        contact,
        email,
        qatarId,
        address,
        state,
        occupation,
        designation,
        organization,
        dob,
        preferredLanguage,
        city,
        pinCode,
        source,
        commissionInfo,
        licenseInfo
      });
  
      await newAgent.save();
    return res.status(200).json({
        message:"Client Created Successfully By Admin",
        newAgent
    })
    } catch (error) {
      res.status(500).json({ error: error.message ,
        message:"Unexpected Error"
      });
    }
  };
  exports.getAgent = async (req, res) => {
    try {
      const agents = await agentSchema.find().populate('Project');
   return res.status(200).json({
    messsage:"Clients Details Fetched Successfully",
agents,   })
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  exports.getAgenttById = async (req, res) => {
    try {
        const {id}=req.params.id;
      const agent = await agentSchema.findById(id).populate('Project');
      if (!agent) return res.status(404).json({ message: 'Agent not found' });
     return res.status(200).json({
        message:"Client Fetched Sucessfully",
        agent,
     })
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  exports.removeAgent = async (req, res) => {
    try {
        const {id}=req.params.id;
      const agent = await agentSchema.findByIdAndDelete(id);
      if (!agent) return res.status(404).json({ message: 'Agent not found' });
      return res.status(200).json({
        message:"Client Removed Successfully"
      })
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  exports.updateAgent = async (req, res) => {
    try {
      const { id } = req.params;  
      const { name, contact, email, qatarId, address, state, occupation, designation, organization, dob, preferredLanguage, city, pinCode, commissionInfo, projects } = req.body;
      if (projects) {
        const projectExists = await Project.findById(projects);
        if (!projectExists) return res.status(400).json({ message: 'Invalid project ID' });
      }
  
      // Update the agent
      const updatedAgent = await agent.findByIdAndUpdate(
        id,
        {
          name,
          contact,
          email,
          qatarId,
          address,
          state,
          occupation,
          designation,
          organization,
          dob,
          preferredLanguage,
          city,
          pinCode,
          commissionInfo,
          projects
        },
        { new: true } 
      );
  
      if (!updatedAgent) return res.status(404).json({ message: 'Agent not found' });
  
      res.status(200).json({
        message: "Agent updated successfully",
        updatedAgent
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
        message: "Unexpected error"
      });
    }
  };
  ///Owner //
  exports.createOwner = async (req, res) => {
    try {
      const { name, contact, password, email, qatarId, address, state, dob, preferredLanguage, city, pinCode } = req.body;
  
      const newOwner = new ownerSchema({
        name,
        contact,
        password,
        email,
        qatarId,
        address,
        state,
        dob,
        preferredLanguage,
        city,
        pinCode
      });
  
      await newOwner.save();
      res.status(201).json({
        message: "Owner created successfully",
        newOwner
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
        message: "Unexpected error occurred"
      });
    }
  };
  
  // Get an owner by ID
  exports.getOwnerById = async (req, res) => {
    try {
      const { id } = req.params;
      const owner = await ownerSchema.findById(id);
  
      if (!owner) return res.status(404).json({ message: 'Owner not found' });
  
      res.status(200).json(owner);
    } catch (error) {
      res.status(500).json({
        error: error.message,
        message: "Unexpected error occurred"
      });
    }
  };
  
  // Delete an owner by ID
  exports.deleteOwner = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedOwner = await ownerSchema.findByIdAndDelete(id);
  
      if (!deletedOwner) return res.status(404).json({ message: 'Owner not found' });
  
      res.status(200).json({
        message: "Owner deleted successfully",
        deletedOwner
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
        message: "Unexpected error occurred"
      });
    }
  };
  
  // Get all owners
  exports.getAllOwners = async (req, res) => {
    try {
      const owners = await ownerSchema.find();
      res.status(200).json(owners);
    } catch (error) {
      res.status(500).json({
        error: error.message,
        message: "Unexpected error occurred"
      });
    }
  };
  
  // Update an owner by ID
  exports.updateOwner = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, contact, password, email, qatarId, address, state, dob, preferredLanguage, city, pinCode } = req.body;

      const updatedOwner = await ownerSchema.findByIdAndUpdate(
        id,
        {
          name,
          contact,
          password,
          email,
          qatarId,
          address,
          state,
          dob,
          preferredLanguage,
          city,
          pinCode
        },
        { new: true }
      );
  
      if (!updatedOwner) return res.status(404).json({ message: 'Owner not found' });
  
      res.status(200).json({
        message: "Owner updated successfully",
        updatedOwner
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
        message: "Unexpected error occurred"
      });
    }
  };