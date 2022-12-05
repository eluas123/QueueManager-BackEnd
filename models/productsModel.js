const mongoose = require("mongoose");
const Joi = require('joi');


const productsSchema = new mongoose.Schema({
    created_at: {
        type: Date,
        default: Date.now()
    },
    name:String,
    img_url:String,
    Description:String,
    price:Number,
})

exports.productsModel = mongoose.model("products", productsSchema);

exports.productsValidate = (_reqBody) => {
    let joiSchema = Joi.object({
        name: Joi.string().min(2).max(99).required(),
        img_url: Joi.string().min(2).required(),
        Description:Joi.string().min(2),
        price: Joi.number().min(2)
    })
    return joiSchema.validate(_reqBody)
}