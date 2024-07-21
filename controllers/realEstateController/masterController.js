const amenitySchema = require("../../models/RealEstate/amenitySchema");
const propertyType = require("../../models/RealEstate/propertyType");
const sourceSchema = require("../../models/RealEstate/sourceSchema");

exports.addAmenity = async (req, res) => {
    try {
        const { amenityname } = req.body;
        const role = req.user.role; // Assuming req.user.role contains the role

        const newAmenity = new amenitySchema({
            amenityname,
            createdBy: role // Store the role as a string
        });

        await newAmenity.save();

        return res.status(201).json({
            message: "Amenity created successfully",
            amenity: newAmenity,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Unexpected Error",
            error: error.message,
        });
    }
};
exports.deleteAmenity = async (req, res) => {
    try {
        const {id} = req.params;
        console.log("Delete params from amenut",id);

        const deletedAmenity = await amenitySchema.findByIdAndDelete(id);

        if (!deletedAmenity) {
            return res.status(404).json({
                message: "Amenity not found",
            });
        }

        return res.status(200).json({
            message: "Amenity deleted successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Unexpected Error",
            error: error.message,
        });
    }
};
exports.listAmenity=async (req,res)=>{
    try{
        const amenity=await amenitySchema.find();
        return res.status(200).json({
            success:true,
            message:"Amenity Fetched Successfully",
            amenity,
        })

    }catch(error){
console.log(error);
return res.status(500).json({
    success:"Unexptecd Error"
})
    }
}


exports.addSource = async (req, res) => {
    try {
        const { sourcename } = req.body;
        const role = req.user.role;

        const newSource = new sourceSchema({
            sourcename,
            createdBy: role 
        });

        await newSource.save();

        return res.status(201).json({
            message: "Source created successfully",
           source: newSource,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Unexpected Error",
            error: error.message,
        });
    }
};

exports.deleteSource = async (req, res) => {
    try {
        const {id} = req.params;
        console.log("Delete params from amenut",id);

        const deletedSource= await sourceSchema.findByIdAndDelete(id);

        if (!deletedSource) {
            return res.status(404).json({
                message: "Source not found",
            });
        }

        return res.status(200).json({
            message: "Source deleted successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Unexpected Error",
            error: error.message,
        });
    }
};

exports.listSource=async (req,res)=>{
    try{
        const source=await sourceSchema.find();
        return res.status(200).json({
            success:true,
            message:"Source Fetched Successfully",
            source,
        })

    }catch(error){
console.log(error);
return res.status(500).json({
    success:"Unexptecd Error"
})
    }
}
//Property Type Schema ///
exports.addPropertyType = async (req, res) => {
    try {
        const { propertyTypeName } = req.body;
        const role = req.user.role;

        const  newpropertyType = new propertyType({
            propertyTypeName,
            createdBy: role 
        });

        await  newpropertyType.save();

        return res.status(201).json({
            message: "New Property Type created successfully",
           newproperty: newpropertyType,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Unexpected Error",
            error: error.message,
        });
    }
};
exports.deletepropertyType = async (req, res) => {
    try {
        const {id} = req.params;
        console.log("Delete params from amenut",id);

        const deletedpropertyType = await propertyType.findByIdAndDelete(id);

        if (!deletedpropertyType) {
            return res.status(404).json({
                message: "Property Type not found",
            });
        }

        return res.status(200).json({
            message: "Property Type deleted successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Unexpected Error",
            error: error.message,
        });
    }
};
exports.listPropertyType=async (req,res)=>{
    try{
        propertyType=await propertyType.find();
        return res.status(200).json({
            success:true,
            message:" PropertyType Fetched Successfully",
            propertyType,
        })

    }catch(error){
console.log(error);
return res.status(500).json({
    success:"Unexptecd Error"
})
    }
}