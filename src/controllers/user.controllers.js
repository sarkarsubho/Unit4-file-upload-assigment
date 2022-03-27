const express=require("express");
const res = require("express/lib/response");
const User= require("../modeles/user.model");

const {uploadedfiles}=require("../middlewear/upload");

const router =express.Router();

router.get("",async(req,res)=>{

    try{
        const user= await User.find().lean().exec();

        return res.status(200).send(user);

    }catch(err){
        console.error({message:err.message});
    }

});
//for single upload *uploads.single("profile_pic")* and multiple value *upload.any("profilePic")* or *upload.array("profilePic",number of file)
router.post("",uploadedfiles("profile_pic","single"),async(req,res)=>{

    try{

        // console.log(req.body);
        // console.log(req.file);
        const user =await User.create({
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            profile_pic:req.file.path
        })

        // const user=User.find().lean().exec();

        return res.status(200).send(user);

    }catch(err){
        console.error({message:err.message});
    }

});

router.post("/multiple",uploadedfiles("profile_pic","multiple"),async(req,res)=>{

    try{

        // console.log(req.body);
        // console.log(req.file);

        const filepaths=req.files.map((file)=>{
            return file.path;
        })
        const user =await User.create({
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            profile_pic:filepaths
        })

        // const user=User.find().lean().exec();

        return res.status(200).send(user);

    }catch(err){
        console.error({message:err.message});
    }

});


module.exports=router;