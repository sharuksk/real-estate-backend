const adminSchema = require("../../models/Users/adminSchema");

exports.register=async (req,res)=>{
    try{
const {name,email,password,role}=req.body;
if(!name || !email || !password || ! role){
    return res.status(400).json({
        success:false,
        message:"Please Provide All Details Admin"
    })
}
let hashPassword;
try{
hashPassword=await bcrypt.hash(password,10);

}catch(error){
console.log("Error hasing password",error);
}
const Admin=new adminSchema({
    name,password:hashPassword,email,role
});
Admin.save();
return res.status(200).json({
    success:false,
    message:"Admin Created Successfully"
})
    }catch(error){
console.log(error);
return res.status(400).json({
    success:false,
    message:"Unexpected Error",
})
    }
}