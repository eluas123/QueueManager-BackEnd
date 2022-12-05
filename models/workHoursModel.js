const mongoose = require("mongoose");
const Joi = require('joi');


const workhoursScehma = new mongoose.Schema({
    start: String,
    end: String,
    date: String,
    break:String,
    appointmentsArr: {
        type: Array,
        default: []
    }
})

exports.workHoursModel = mongoose.model("workhours", workhoursScehma);

exports.workHoursValidate = (_reqBody) => {
    let joiSchema = Joi.object({
        start: Joi.string().min(0).max(2).required(),
        end: Joi.string().min(0).max(2).required(),
        date: Joi.string().min().max(2).required(),
    })
    return joiSchema.validate(_reqBody)
}