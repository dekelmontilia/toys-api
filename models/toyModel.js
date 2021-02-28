const mongoose=require("mongoose");
const Joi=require("joi");


const toySchema= new mongoose.Schema({
 name:String,
 info:String,
 price:Number,
 category:String,
 img_url:String,
role:{
  type:String, default:"regular"
 },
 date_creted:{
  type:Date, default:Date.now()
 }
})

exports.toyModel=mongoose.model("toy",toySchema);  

exports.validUser= (_toyBody) => {
 let JoiSchema = Joi.object({
  name:Joi.string().min(1).max(30).required(),
  info:Joi.string().email().min(7).max(50).required(),
  price:Joi.number().min(5).max(50).required(),
  category:Joi.string().min(10).max(30).required(),
  img_url:Joi.string().min(20).max(200).required(),
  
  role:Joi.string().min(5).max(15)
 })
 return JoiSchema.validate(_toyBody);
}