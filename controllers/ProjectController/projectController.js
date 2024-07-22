const Project = require("../../models/RealEstate/Project");
const { uploadImageToCloudinary } = require("../../utils/imageUploader");

exports.addProject=async (req,res)=>{
    try{
const {  projectName,location,area,description}=req.body;
const coverImage = req.files.coverImage;
console.log("coverImage:", coverImage);
console.log("coverImage.tempFilePath:", coverImage.tempFilePath);

if(!projectName || !location || !area || !description ||  !coverImage){
    return res.status(400).json({
        success:false,
        message:"All Fields are mandatory",
    })
}
const uploadedImage = await uploadImageToCloudinary(coverImage.tempFilePath, process.env.FOLDER_NAME);
  console.log(uploadedImage)
  const newProject=await Project.create({
    projectName,area,description,   coverImage: uploadedImage.secure_url,location
  })
  await newProject.save();
  return res.status(200).json({
    message:"Project Created Successfullyyy",
    success:true,
    data: newProject
  })
    }catch(error){
console.log(error);
return res.status(500).json({
    success:false,
    message:"Unexpected Error,"
})
    }
}
exports.editProject = async (req, res) => {
  try {
    const { projectId } = req.body;
  
    const project = await Project.findById(projectId);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project Not Found"
      });
    }

    if (req.files && req.files.coverImage) {
      console.log("Cover Image Update");
      const coverImage = req.files.coverImage;
      const uploadedImage = await uploadImageToCloudinary(coverImage.tempFilePath, process.env.FOLDER_NAME);
      project.coverImage = uploadedImage.secure_url;
    }
    const { projectName, location, area, description } = req.body;
    if (projectName) project.projectName = projectName;
    if (location) project.location = location;
    if (area) project.area = area;
    if (description) project.description = description;

    await project.save();

    return res.status(200).json({
      success: true,
      message: "Project Updated Successfully",
      updatedProject: project
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};
exports.deleteProjectById = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findByIdAndDelete(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project Not Found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project Deleted Successfully"
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};
exports.getProjectById = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project Not Found"
      });
    }

    return res.status(200).json({
      success: true,
      project
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};
exports.listAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    return res.status(200).json({
      success: true,
      projects
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};