const express=require('express');
const { createClient, updateClient, getClients, getClientById, createAgent, updateAgent, getAgent, getAgenttById, createOwner, updateOwner, getAllOwners, getOwnerById, removeClient, removeAgent, deleteOwner } = require('../../controllers/UserDetailsController/userDetailsController');
const { isAuthenticated } = require('../../middlewares/isAuthenticated');
const { adminMiddleware } = require('../../middlewares/roleMiddleware');
const adminRouter=express.Router();
//Client
adminRouter.post('/add-client',isAuthenticated,adminMiddleware,createClient);
adminRouter.put('/update-client',isAuthenticated,adminMiddleware,updateClient);
adminRouter.get('/list-clients',isAuthenticated,adminMiddleware,getClients);
adminRouter.get('/client/:id',isAuthenticated,adminMiddleware,getClientById);
adminRouter.delete('/remove-client',isAuthenticated,adminMiddleware,removeClient)
//Agent
adminRouter.post('/add-agent',isAuthenticated,adminMiddleware,createAgent);
adminRouter.put('/update-agent',isAuthenticated,adminMiddleware,updateAgent);
adminRouter.get('/list-agents',isAuthenticated,adminMiddleware,getAgent);
adminRouter.get('/agent/:id',isAuthenticated,adminMiddleware,getAgenttById);
adminRouter.delete('/remove-agent',isAuthenticated,adminMiddleware,removeAgent)
//Owner
adminRouter.post('/add-owner',isAuthenticated,adminMiddleware,createOwner);
adminRouter.put('/update-owner',isAuthenticated,adminMiddleware,updateOwner);
adminRouter.get('/list-owner',isAuthenticated,adminMiddleware,getAllOwners);
adminRouter.get('/owner/:id',isAuthenticated,adminMiddleware,getOwnerById);
adminRouter.delete('/remove-owner',isAuthenticated,adminMiddleware,deleteOwner)

module.exports=adminRouter;