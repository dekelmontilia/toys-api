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

exports.ToyModel=mongoose.model("toy",toySchema);  

exports.validToy= (_toyBody) => {
 let JoiSchema = Joi.object({
  name:Joi.string().min(1).max(30).required(),
  info:Joi.string().min(1).max(50).required(),
  price:Joi.number().min(5).max(5000).required(),
  category:Joi.string().min(2).max(30).required(),
  img_url:Joi.string().min(5).max(200),
  
  role:Joi.string().min(5).max(15)
 })
 return JoiSchema.validate(_toyBody);
}