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
    const { name, email, password ,role} = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ success: false, message: "Please Provide All Required Details" });
    }

   
    let hashPassword;
    try {
      hashPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      console.log("Error hashing password", error);
      return res.status(500).json({ success: false, message: "Server Error" });
    }
    
    const existingUser = await clientSchema.findOne({ email });

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
    });

    await clientuser.save();
    return res.status(201).json({ success: true, message: "Client Created Successfully" });
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
    const { name, email, password ,role} = req.body;
    console.log("ROLE FROM Agent is",role)

    if (!name || !email || !password || !role) {
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
      const { name, email, password, role } = req.body;
     
      if (!name || !email || !password || !role) {
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
        console.log("Admin pass",user.password);
        break;
      case 'Agent':
        user = await agentSchema.findOne({ email });
        console.log("Agenrt pass",user.password);
        break;
      case 'Client':
        user = await clientSchema.findOne({ email });
        console.log("Aclu pass",user.password);
        break;
      case 'Owner':
        user = await ownerSchema.findOne({ email });
        console.log("ow pass",user.password);
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
        message: 'User logged in successfully'
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
