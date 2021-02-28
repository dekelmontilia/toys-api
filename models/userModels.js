const mongoose=require("mongoose");
const Joi=require("joi");

const userSchema= new mongoose.Schema({
 name:String,
 email:String,
 password:String,
 role:{
  type:String, default:"regular"
 },
 date_creted:{
  type:Date, default:Date.now()
 }
})

exports.UserModel=mongoose.model("users",userSchema); 

exports.validUser= (_userBody) => {
 let JoiSchema = Joi.object({
  name:Joi.string().min(1).max(30).required(),
  email:Joi.string().email().min(7).max(50).required(),
  password:Joi.string().min(5).max(50).required(),
  role:Joi.string().min(5).max(15)
 })
 return JoiSchema.validate(_userBody);
}

exports.validLogin = (_bodyUser) => {
    
      let joiSchema = Joi.object({
        email:Joi.string().email().min(7).max(50).required(),
        password:Joi.string().min(5).max(50).required(),
      })
    
      return joiSchema.validate(_bodyUser);
    }
    