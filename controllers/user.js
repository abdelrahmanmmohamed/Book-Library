const userModel = require ("../schema/user");
const bcrypt = require("bcrypt");
 const jwt = require("jsonwebtoken")
exports.register = async function(req,res){
    try {
        let newUser = new userModel(req.body)
        const hashPassword =await bcrypt.hash(req.body.password,10) 
        newUser.password = hashPassword
        let user = await newUser.save()

        return res.json({message:"User Register sucessfully", user:{name:user.name,email:user.email}})
    } catch (err) {
       return res.status(400).send({ message:err})
    }
}


exports.login = async function(req,res){
    try {
        const user = await userModel.findOne({email:req.body.email})
        if(!user) return res.status(400).send({message:"Authntication failed.. invalid email or password "})
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if(!isMatch) return res.status(400).send({message:"Authntication failed.. invalid email or password "})
        const token = jwt.sign({email:user.email , id:user._id, name:user.name, role:user.role },process.env.JWT_SECRET)
        return res.json({message:"Authntication sucessfully", user:{name:user.name,email:user.email, token:token,id:user._id }})
    } catch (error) {   
        return res.status(400).send({ message:error})
        
    }
}
    
