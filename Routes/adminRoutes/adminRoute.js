const express=require('express');
const { getClients, getOwners, getAgents, removeClient, removeAgent, removeOwner, updateClient, adminClientUpdate, updateAgentSelf, updateAgentAdmin, updateOwnerSelf, updateOwnerAdmin, postOwnerByAdmin } = require('../../controllers/AdminControllers/AdminController');
const { isAuthenticated } = require('../../middlewares/isAuthenticated');
const { adminMiddleware, clientMiddleware } = require('../../middlewares/roleMiddleware');
const adminRouter=express.Router();
adminRouter.get('/list-clients',getClients);
adminRouter.get('/list-agents',getAgents);
adminRouter.get('/list-owners',getOwners);

adminRouter.delete('/delete-client/:id',removeClient);
adminRouter.delete('/delete-agent/:id',removeAgent);
adminRouter.delete('/delete-owner/:id',removeOwner);

adminRouter.put('/update/client',isAuthenticated,clientMiddleware,updateClient); //client will update--
adminRouter.put('/update-admin/client/:id',isAuthenticated,adminMiddleware,adminClientUpdate)

adminRouter.put('/update/agent',isAuthenticated,updateAgentSelf);
adminRouter.put('/update-admin/agent/:id',isAuthenticated,updateAgentAdmin)


adminRouter.put('/update/owner',isAuthenticated,clientMiddleware,updateOwnerSelf);
adminRouter.put('/update-admin/owner/:id',isAuthenticated,adminMiddleware,updateOwnerAdmin)


adminRouter.post('/add-owner',isAuthenticated,postOwnerByAdmin);

module.exports=adminRouter;