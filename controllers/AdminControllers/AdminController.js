const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const adminSchema = require('../../models/Users/adminSchema');
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
