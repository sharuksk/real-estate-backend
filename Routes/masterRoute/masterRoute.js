const express=require('express');
const { isAuthenticated } = require('../../middlewares/isAuthenticated');
const { addAmenity, deleteAmenity, listAmenity, addSource, deleteSource, listSource, addPropertyType, deletepropertyType, listPropertyType } = require('../../controllers/realEstateController/masterController');
const masterRouter=express.Router();
//**Amenity  */
masterRouter.post('/add-amenity',isAuthenticated,addAmenity);
masterRouter.delete('/delete-amenity/:id',isAuthenticated,deleteAmenity);
masterRouter.get('/list-amenity',isAuthenticated,listAmenity)

//**Source  */
masterRouter.post('/add-source',isAuthenticated,addSource);
masterRouter.delete('/delete-source/:id',isAuthenticated,deleteSource);
masterRouter.get('/list-source',isAuthenticated,listSource)

//**Property Type */
masterRouter.post('/add-propertyType',isAuthenticated,addPropertyType);
masterRouter.delete('/delete-propertyType/:id',isAuthenticated,deletepropertyType);
masterRouter.get('/list-propertyType',isAuthenticated,listPropertyType)



module.exports=masterRouter;