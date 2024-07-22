const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const adminSchema = require('../../models/Users/adminSchema');
const agentSchema = require('../../models/Users/agentSchema');
const clientSchema = require('../../models/Users/clientSchema');
const ownerSchema = require('../../models/Users/ownerSchema');
const userSchema = require('../../models/Users/userSchema');
const additionalDetailSchema = require('../../models/Users/additionalDetailSchema');
require("dotenv").config();
exports.adminregister = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ success: false, message: "Please Provide All Details Admin" });
    }

    let hashPassword;
    try {
      hashPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      console.log("Error hashing password", error);
      return res.status(500).json({ success: false, message: "Server Error" });
    }

    const existingAdmin = await adminSchema.findOne();
    if (existingAdmin) {
      return res.status(400).json({ success: false, message: "Admin Already Exists" });
    }

    const Admin = new adminSchema({
      name,
      email,
      password: hashPassword,
      role
    });

    await Admin.save();
    return res.status(201).json({ success: true, message: "Admin Created Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Unexpected Error" });
  }
};


exports.register = async (req, res) => {
  try {
    const { name, email, password, role, contact } = req.body;

    if (!name || !email || !password || !role || !contact) {
      return res.status(401).json({
        success: false,
        message: "Please provide all the details"
      });
    }

    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }
    let hashPassword;
    try {
      hashPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      console.log("Error hashing password", error);
      return res.status(500).json({ success: false, message: "Server error" });
    }

    const profileDetails = await additionalDetailSchema.create({
      dateOfBirth: null,
      address: null,
      qatarId: null,
      preferredLanguage: null,
      pinCode: null
    });

    const newUser = await userSchema.create({
      name,
      email,
      contact,
      password: hashPassword,
      role,
      additionalDetails: profileDetails._id
    });

    return res.status(200).json({
      success: true,
      user: newUser,
      message: "User registered successfully"
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: `Please fill up all the required fields`,
      });
    }

    let user;
    
    if (role === 'Admin') {
      user = await adminSchema.findOne({ email }); 
    } else {
      user = await userSchema.findOne({ email }).populate('additionalDetails'); // Query user schema
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: `User is not registered with us. Please sign up to continue.`,
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { email: user.email, id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie('token', token, options).status(200).json({
        success: true,
        token,
        user,
        message: `User login successful`,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: `Password is incorrect`,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: `Login failure. Please try again.`,
    });
  }
};
exports.logout = async (req, res) => {
  try {
    res.cookie('token', '', { maxAge: 1 });
    return res.status(200).json({
      success: true,
      message: 'User Logged Out Successfully'
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Unexpected Error'
    });
  }
};

exports.checkAuthenticated=async (req,res)=>{
    const decoded=jwt.verify(req.cookies.token,process.env.JWT_SECRET);
    
    try{
        if(decoded){
            res.json({
                isAuthenticated:true,
            })
        }else{
            res.json({
                isAuthenticated:false,
            })
        }
    }catch(error){
console.log(error);
return res.status(404).json({
    success:false,
    message:"Unexpected Error"
})
    }
   

}
  //** //lIST CLIENT*//
exports.getClients=async (req,res)=>{
  try{
const clientFind=await clientSchema.find().select("-password");
if(!clientFind){
  return res.status(400).json({
    success:false,
    message:"Client not Found",
    
  })
}
return res.status(200).json({
  success:true,
  message:"Client Fetched Successfully",
  clientFind
})
  }catch(error){
console.log(error);
return res.status(400).json({
  success:true,
  message:"Unexpected Error"
})
  }
}
  //** //lIST owner*//
  exports.getOwners=async (req,res)=>{
    try{
  const ownerFind=await ownerSchema.find().select("-password");
  if(!ownerFind){
    return res.status(400).json({
      success:false,
      message:"Owner not Found",
      
    })
  }
  return res.status(200).json({
    success:true,
    message:"Owner Fetched Successfully",
    ownerFind
  })
    }catch(error){
  console.log(error);
  return res.status(400).json({
    success:true,
    message:"Unexpected Error"
  })
    }
  }

    //** //lIST agents*//
exports.getAgents=async (req,res)=>{
  try{
const agentFind=await agentSchema.find().select("-password");
if(!agentFind){
  return res.status(400).json({
    success:false,
    message:"Agent not Found",
    
  })
}
return res.status(200).json({
  success:true,
  message:"Agent Fetched Successfully",
  agentFind
})
  }catch(error){
console.log(error);
return res.status(400).json({
  success:true,
  message:"Unexpected Error"
})
  }
}


 //** //Delete Clients*//
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
 //** //Delete Clients*//
exports.removeAgent = async (req, res) => {
  try {
    const {id } = req.params; 
    const agent = await agentSchema.findByIdAndDelete(id);

    if (!agent) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.status(200).json({ message: 'Agent successfully deleted', });
  } catch (error) {

    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};


exports.removeOwner = async (req, res) => {
  try {
    const {id } = req.params; 
    const owner = await ownerSchema.findByIdAndDelete(id);

    if (!owner) {
      return res.status(404).json({ message: 'Owner not found' });
    }

    res.status(200).json({ message: 'Owner successfully deleted', });
  } catch (error) {

    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.updateClient=async (req,res)=>{
  const { name, contact, email, address, state, occupation, designation, organization, dob, preferredLanguage, city, pinCode } = req.body;
  const clientId = req.user.id; 
  console.log("Client User is",clientId);
  try {

    const client = await clientSchema.findById(clientId);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }


    client.name = name || client.name;
    client.contact = contact || client.contact;
    client.email = email || client.email;
    client.address = address || client.address;
    client.state = state || client.state;
    client.occupation = occupation || client.occupation;
    client.designation = designation || client.designation;
    client.organization = organization || client.organization;
    client.dob = dob || client.dob;
    client.preferredLanguage = preferredLanguage || client.preferredLanguage;
    client.city = city || client.city;
    client.pinCode = pinCode || client.pinCode;


    await client.save();

    res.status(200).json({ message: 'Client details updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}


exports.adminClientUpdate=async (req,res)=>{
  const { id } = req.params;
  const { name, contact, email, address, state, occupation, designation, organization, dob, preferredLanguage, city, pinCode } = req.body;
  
  try {

    const client = await clientSchema.findById(id);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    client.name = name || client.name;
    client.contact = contact || client.contact;
    client.email = email || client.email;
    client.address = address || client.address;
    client.state = state || client.state;
    client.occupation = occupation || client.occupation;
    client.designation = designation || client.designation;
    client.organization = organization || client.organization;
    client.dob = dob || client.dob;
    client.preferredLanguage = preferredLanguage || client.preferredLanguage;
    client.city = city || client.city;
    client.pinCode = pinCode || client.pinCode;


    await client.save();

    res.status(200).json({ message: 'Client details updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

///Agent//
exports.updateAgentSelf = async (req, res) => {
  const { name, contact, address, email, licenseInfo } = req.body;
  const agentId = req.user.id; 

  try {
    const agent = await agentSchema.findById(agentId);
    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    agent.name = name || agent.name;
    agent.contact = contact || agent.contact;
    agent.address = address || agent.address;
    agent.email = email || agent.email;
    agent.licenseInfo = licenseInfo || agent.licenseInfo;
    await agent.save();
    res.status(200).json({ message: 'Agent details updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
exports.updateAgentAdmin = async (req, res) => {
  const { id } = req.params;
  const { name, contact, address, email, licenseInfo, commissionInfo, role, } = req.body;

  try {
    const agent = await agentSchema.findById(id);
    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    agent.name = name || agent.name;
    agent.contact = contact || agent.contact;
    agent.address = address || agent.address;
    agent.email = email || agent.email;
    agent.licenseInfo = licenseInfo || agent.licenseInfo;
    agent.commissionInfo = commissionInfo || agent.commissionInfo;
    agent.role = role || agent.role;
    // agent.projects = projects || agent.projects;
    // agent.properties = properties || agent.properties;

    await agent.save();
    res.status(200).json({ message: 'Agent details updated successfully by admin' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


exports.updateOwnerSelf = async (req, res) => {
  const { name, contact, address, email,qatarId,pinCode,state,preferredLanguage,city,dob } = req.body;
  const ownerId = req.user.id; 

  try {
    const owner = await ownerSchemaSchema.findById(ownerId);
    if (!owner) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    owner.name = name || owner.name;
    owner.contact = contact || owner.contact;
    owner.address = address || owner.address;
    owner.dob = dob || owner.dob;
    owner.preferredLanguage = preferredLanguage || owner.preferredLanguage;
    owner.email = email || owner.email;
    owner.qatarId = qatarId || owner.qatarId;
    owner.pinCode = pinCode || owner.pinCode;
    owner.state = state || owner.state;
    owner.city = city || owner.city;

    // owner.licenseInfo = licenseInfo || owner.licenseInfo;
    await owner.save();
    res.status(200).json({ message: 'Owner details updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
exports.updateOwnerAdmin = async (req, res) => {
  const { id } = req.params;
  const { name, contact, address, email,qatarId,pinCode,state,preferredLanguage,city,dob } = req.body;
  try {
    const owner = await agentSchema.findById(id);
    if (!owner) {
      return res.status(404).json({ error: 'Owner not found' });
    }

    owner.name = name || owner.name;
    owner.contact = contact || owner.contact;
    owner.address = address || owner.address;
    owner.dob = dob || owner.dob;
    owner.preferredLanguage = preferredLanguage || owner.preferredLanguage;
    owner.email = email || owner.email;
    owner.qatarId = qatarId || owner.qatarId;
    owner.pinCode = pinCode || owner.pinCode;
    owner.state = state || owner.state;
    owner.city = city || owner.city;
    // agent.projects = projects || agent.projects;
    // agent.properties = properties || agent.properties;

    await agent.save();
    res.status(200).json({ message: 'Owner details updated successfully by admin' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.postOwnerByAdmin=async (req,res)=>{
  try{
    const { name, contact, address, email,qatarId,pinCode,state,preferredLanguage,city,dob } = req.body;

    if (!name || !email || !contact || !address || !qatarId || !pinCode || !state || !preferredLanguage || !city || !dob) {
      return res.status(400).json({ success: false, message: "Please Provide All Required Details" });
    }
    const findOwner=await ownerSchema.findOne({email});
    if(findOwner){
      return res.status({
        message:"Owner Already Exists"
      })
    }
    const newOwner=new ownerSchema({
      name,email,contact,address,qatarId,pinCode,state,preferredLanguage,dob
    })
    newOwner.save();
    return res.status(200).json({
      success:false,
      message:"Details of Owner Saved by Admin"
    })
  }catch(error){
console.log(error);
return res.status(400).json({
  success:false,
  message:"Unexpected Error",
})
  }
}