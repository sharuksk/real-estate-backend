const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const adminSchema = require('../../models/Users/adminSchema');
const agentSchema = require('../../models/Users/agentSchema');
const clientSchema = require('../../models/Users/clientSchema');
const ownerSchema = require('../../models/Users/ownerSchema');
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

exports.registerClient = async (req, res) => {
  try {
    const { name, email, password ,role,  contact,address} = req.body;

    if (!name || !email || !password || !role || !contact || !address) {
      return res.status(400).json({ success: false, message: "Please Provide All Required Details" });
    }

   
    let hashPassword;
    try {
      hashPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      console.log("Error hashing password", error);
      return res.status(500).json({ success: false, message: "Server Error" });
    }
    
    const existingUser = await clientSchema.findOne({ email,contact });

    if (existingUser) {
      return res.status(400).json({ success: false, message: "Client Already Exists" });
    }
const findAdminEmail=await adminSchema.findOne({email});
const findagentEmail=await agentSchema.findOne({email});
const findOwnerEmail=await ownerSchema.findOne({email});
if(findAdminEmail){
    return res.status(400).json({
        message:"Email Already Reggistred "
    })
}else if(findagentEmail){
    return res.status(400).json({
        message:"Email Already Reggistred "
    })
}else if(findOwnerEmail){
    return res.status(400).json({
        message:"Email Already Reggistred "
    })
}
    const clientuser = new clientSchema({
      name,
      email,
      password:hashPassword,
      role: 'Client', 
      contact,
      address
    });

    await clientuser.save();
    return res.status(201).json({ success: true, message: "Client Created Successfully", });
  } catch (error) {
    if (error.code === 11000) { 
        return res.status(400).json({ success: false, message: "Email already in use." });
      }
    console.log(error);
    return res.status(500).json({ success: false, message: "Unexpected Error" });
  }
};

exports.registerAgent = async (req, res) => {
  try {
    const { name, email, password ,role,  contact,address} = req.body;

    if (!name || !email || !password || !role || !contact || !address) {
      return res.status(400).json({ success: false, message: "Please Provide All Required Details" });
    }

    
    let hashPassword;
    try {
      hashPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      console.log("Error hashing password", error);
      return res.status(500).json({ success: false, message: "Server Error" });
    }
    const existingUser = await agentSchema.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ success: false, message: "Agent Already Exists" });
    }
    const findAdminEmail=await adminSchema.findOne({email});
const findclientEmail=await clientSchema.findOne({email});
const findOwnerEmail=await ownerSchema.findOne({email});
if(findAdminEmail){
    return res.status(400).json({
        message:"Email Already Reggistred "
    })
}else if(findclientEmail){
    return res.status(400).json({
        message:"Email Already Reggistred "
    })
}else if(findOwnerEmail){
    return res.status(400).json({
        message:"Email Already Reggistred "
    })
}

    const agentuser = new agentSchema({
      name,
      email,
      password:hashPassword,
      role
    });

    await agentuser.save();
    return res.status(201).json({ success: true, message: "Agent Created Successfully" });
  } catch (error) {
    if (error.code === 11000) { // Duplicate key error code
        return res.status(400).json({ success: false, message: "Email already in use." });
      }
    console.log(error);
    return res.status(500).json({ success: false, message: "Unexpected Error" });
  }
};

exports.registerOwner = async (req, res) => {
    try {
      const { name, email, password ,role,  contact,address} = req.body;

      if (!name || !email || !password || !role || !contact || !address) {
        return res.status(400).json({ success: false, message: "Please Provide All Required Details" });
      }
  
    
      const existingUser = await ownerSchema.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: "Owner Already Exists" });
      }
  
      const findAdminEmail = await adminSchema.findOne({ email });
      const findClientEmail = await clientSchema.findOne({ email });
      const findAgentEmail = await agentSchema.findOne({ email });
  
      if (findAdminEmail || findClientEmail || findAgentEmail) {
        return res.status(400).json({ success: false, message: "Email Already Registered" });
      }
     
       const hashPassword = await bcrypt.hash(password, 10);
        console.log("Hash password:", hashPassword); 
     
      const ownerUser = new ownerSchema({
        name,
        email,
        password:hashPassword,
        role:'Owner'
      });
//   console.log("oWNER PASWORD",ownerUser.password);
      await ownerUser.save();
      return res.status(201).json({ success: true, message: "Owner Created Successfully" });
    } catch (error) {
      console.log("Error during registration:", error);
  
      if (error.code === 11000) { // Duplicate key error code
        return res.status(400).json({ success: false, message: "Email already in use." });
      }
  
      return res.status(500).json({ success: false, message: "Unexpected Error" });
    }
  };

exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    let user;
    // user = await ownerSchema.findOne({ email });
    // console.log("ow pass",user.password);
    
    switch (role) {
      case 'Admin':
        user = await adminSchema.findOne({ email });
        // console.log("Admin pass",user.password);
        break;
      case 'Agent':
        user = await agentSchema.findOne({ email });
        // console.log("Agenrt pass",user.password);
        break;
      case 'Client':
        user = await clientSchema.findOne({ email });
        // console.log("Aclu pass",user.password);
        break;
      case 'Owner':
        user = await ownerSchema.findOne({ email });
        // console.log("ow pass",user.password);
        break;
      default:
        return res.status(400).json({ message: 'Invalid role' });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        role: role
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite:"strict",
      };
      return res.cookie('token', token, options).json({
        success: true,
        message: 'User logged in successfully',
        // user,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Incorrect Password'
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Unexpected Error'
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