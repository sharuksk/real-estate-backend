const express=require('express');
const { isAuthenticated } = require('../../middlewares/isAuthenticated');
const { addAmenity, deleteAmenity, listAmenity, addSource, deleteSource, listSource, addPropertyType, deletepropertyType, listPropertyType } = require('../../controllers/realEstateController/masterController');
const { createLead, deleteLead, getLeadById, updateLead } = require('../../controllers/realEstateController/leadController');
const { adminMiddleware } = require('../../middlewares/roleMiddleware');
const masterRouter=express.Router();
//**Amenity  */
masterRouter.post('/add-amenity',isAuthenticated,adminMiddleware,addAmenity);
masterRouter.delete('/delete-amenity/:id',isAuthenticated,adminMiddleware,deleteAmenity);
masterRouter.get('/list-amenity',isAuthenticated,adminMiddleware,listAmenity)

//**Source  */
masterRouter.post('/add-source',isAuthenticated,adminMiddleware,addSource);
masterRouter.delete('/delete-source/:id',isAuthenticated,adminMiddleware,deleteSource);
masterRouter.get('/list-source',isAuthenticated,adminMiddleware,listSource)

//**Property Type */
masterRouter.post('/add-propertyType',isAuthenticated,adminMiddleware,addPropertyType);
masterRouter.delete('/delete-propertyType/:id',isAuthenticated,adminMiddleware,deletepropertyType);
masterRouter.get('/list-propertyType',isAuthenticated,adminMiddleware,listPropertyType)
//**Lead */
masterRouter.post('/add-lead',isAuthenticated,adminMiddleware,createLead);
masterRouter.delete('/delete-lead/:id',isAuthenticated,adminMiddleware,deleteLead);
masterRouter.get('/list-lead/:id',isAuthenticated,adminMiddleware,getLeadById)
masterRouter.put('/update-lead/:id',isAuthenticated,adminMiddleware,updateLead)

module.exports=masterRouter;