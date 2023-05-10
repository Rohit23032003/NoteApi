const { model } = require("mongoose");
const userModel = require("../Models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY; 
const signup = async(req,res)=>{
    // Existing user check
    // hash password 
    // usercreation 
    // token generate 

    const {username , email , password} = req.body;
    try {
            const  existinguser  = await userModel.findOne({email : email });
            if(existinguser){
                return res.status(400).json({message  : "User Already Exists "});
            }
            
            const hashPassword = await bcrypt.hash(password,10);

            const result = await userModel.create({
                email : email ,
                password : hashPassword,
                username :  username,

            });
                const token =  jwt.sign({email : result.email , id:result._id } , SECRET_KEY );
                res.status(200).json({user : result , token : token });
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"something went wrong"});
    }

}


const signin = async(req,res)=>{ 
    try {
        const {email , password } = req.body;
        const  existinguser  = await userModel.findOne({email : email });
            if(!existinguser){
                return res.status(404).json({message  : "User Not Found "});
            }

            const matchPassword = await bcrypt.compare(password,existinguser.password);
            if(!matchPassword) {
                return res.status(400).json({message:"invalid Cradential "});
            }
            const token =  jwt.sign({email : existinguser.email , id:existinguser._id } , SECRET_KEY );
            res.status(201).json({user : existinguser , token : token });

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"something went wrong"});
    }
}


module.exports = {signup,signin};     