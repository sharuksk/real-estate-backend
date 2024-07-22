const express=require('express');
const { addProject, editProject, deleteProjectById, listAllProjects, getProjectById } = require('../../controllers/ProjectController/projectController');
const { addProperty, listProperties, updateProperty, deleteProperty } = require('../../controllers/ProjectController/propertiesController');
const projectRouter=express.Router();
//Projects
projectRouter.post('/add-project',addProject);
projectRouter.post('/update-project',editProject);
projectRouter.delete('/delete-project',deleteProjectById);
projectRouter.get('/get-project',listAllProjects);
projectRouter.get('/get-project/:projectId ',getProjectById);
//Properties//
projectRouter.post('/add-property',addProperty);
projectRouter.delete('/delete-property',deleteProperty);
projectRouter.put('/update-property/:id',updateProperty);
projectRouter.get('/list-property',listProperties);
module.exports=projectRouter;