const mongoose = require("mongoose");
const Joi = require('joi');


const waitingListScehma = new mongoose.Schema({
    name: String,
    phone: String,
    date:String,
  
})

exports.waitingListModel = mongoose.model("waitinglists", waitingListScehma);

exports.waitingListValidate = (_reqBody) => {
    let joiSchema = Joi.object({
        name: Joi.string().min(0).max(99).required(),
        phone: Joi.string().min(0).max(99).required(),
        date: Joi.string().min(0).max(99).required(),
    })
    return joiSchema.validate(_reqBody)
}