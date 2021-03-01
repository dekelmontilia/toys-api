const express = require('express');
const {UserModel,validUser,validLogin, genToken}=require("../models/userModels");
const router = express.Router();
const bcrypt = require('bcrypt');
const{auth} = require("../middleware/auth");
const _ = require("lodash");

router.get('/', async(req, res) => {
  let perPage=(req.query.perPage)? Number(req.query.perPage):5;
  let page=req.query.page;
  let sortQ=req.query.sort;
  let ifReverse=(req.query.reverse=="yes")? -1:1;
  try {
    let data=await UserModel.find({},{password:0})
    .sort({[sortQ]: ifReverse}) 
    .limit(perPage)
    .skip(page*perPage)
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(400).json({err:"there is a problem, try again later!"})
  }
});


router.get('/myInfo',auth,async(req, res) => {
   
    try {
      let data=await UserModel.findOne({_id:req.userData._id},{password:0})
      res.json(data);
    }
    catch(err){
      console.log(err);
      res.status(400).json({err:"there is a problem, try again later!"})
    }
  });

router.post('/login', async(req, res) => {
  let validate=validLogin(req.body);
  if (validate.error){
    return res.status(400).json(validate.error.details)
  }
  try {
   let user= await UserModel.findOne({email:req.body.email});
    if(!user){
        return res.status(400).json({msg:"user or password invalid 1"});
    }
   
    let validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass){
      return res.status(400).json({msg:"user or password invalid 2"});  
    }
    let myToken = genToken(user._id);
    res.json({token:myToken});
  }
  catch(err){
    console.log(err);
    res.status(400).json({err:"there is a problem, try again later!"})
  }
})

router.post('/', async(req, res) => {
    let validate=validUser(req.body);
    if (validate.error){
      return res.status(400).json(validate.error.details)
    }
    try {
     let user= new UserModel(req.body);
      let salt=  await bcrypt.genSalt(10);
      user.password=await bcrypt.hash(user.password, salt);
     await user.save();
      res.status(201).json(_.pick(user,["_id", "name", "email", "date_created"]))

    }
    catch(err){
      console.log(err);
      res.status(400).json({err:"there is a problem, try again later!"})
    }
  })

module.exports = router;