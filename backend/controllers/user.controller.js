import { User } from "../models/user.model.js";
import { createUser } from "../services/user.service.js";
import { validationResult } from "express-validator";
import BlacklistingToken from "../models/blacklistingToken.model.js";
async function registerUser(req,res){
   try{
     const errors =validationResult(req)
     if(!errors.isEmpty()){
       return res.status(400).json({ errors: errors.array() });
     }
     const { fullName, email, password} = req.body;
     const existingUser = await User.findOne({email});
     if(existingUser){
        return res.status(400).json({msg:"Enter unique email"})
     }
     const user = await createUser({ firstName:fullName.firstName, lastName:fullName.lastName, email, password });
     if(!user) return res.status(401).json({ message:"Enter unique email address"})
     const token = await user.generateAuthToken();
     res.status(201).json({ user, token });
   }catch(error){
    console.log(`Error during registration: ${error}`);
   }
}
async function loginUser(req,res){
   try{
     const errors =validationResult(req)
     if(!errors.isEmpty()){
       return res.status(400).json({ errors: errors.array() });
     }
     const { email, password} = req.body;
     const user = await User.findOne({email}).select('+password');
     if(!user) return res.status(401).json({ msg:'Invalid email or password' });
     const isMatch =await user.comparePassword(password);
     if(!isMatch) return res.status(401).json({ msg: 'Invalid email or password' });
     const token = user.generateAuthToken();
     res.cookie('token', token)
     res.status(200).json({msg:"User login successful",user,token})
   }catch(error){
    console.log(`Error during login : ${error}`);
   }
}
async function changePassword(req,res){
  try {
    const {email,oldPassword,newPassword}=req.body
    const user = await User.findOne({email}).select('+password')
    if(!user) return res.status(401).json({error:"User not found"})
    const isMatch = await user.comparePassword(oldPassword)
    if(!isMatch) return res.status(401).json({error:"Incorrect old password"})
    user.password = newPassword
   await user.save();
   res.status(200).json({success:true,msg:"password updated successfully"})
  } catch (error) {
      res.status(500).json({error:"error during changing password"})
  }
}

async function getUserProfile(req,res,next){
  res.status(200).json(req.user)
}

async function logoutUser(req,res,next){
  res.clearCookie('token')
  const token = req.cookies.token || req.header.authorization?.split(' ')[1]
  await BlacklistingToken.create({token})
  res.status(200).json({msg:"User logged out"})
}
export { registerUser,loginUser,changePassword,getUserProfile,logoutUser}
