const express = require('express');
const userRouter = express.Router();
const { registerClient, registerOwner, registerAgent, adminregister, login } = require('../controllers/AdminControllers/AdminController');


userRouter.post('/register', async (req, res) => {
  const { role, name, email, password } = req.body;
  
  console.log("Request body:", req.body);
  
  if (!role || !name || !email || !password || (role !== 'Client' && role !== 'Owner' && role !== 'Agent')) {
    return res.status(400).json({ success: false, message: 'Invalid or missing parameters' });
  }
  
  switch (role) {
    case "Client":
      return registerClient(req, res);
    case "Owner":
      return registerOwner(req, res);
    case "Agent":
      return registerAgent(req, res);
    default:
      return res.status(400).json({ success: false, message: 'Invalid role' });
  }
});
userRouter.post('/register-admin', adminregister);
userRouter.post('/login', login);

module.exports = userRouter;
