const mongoose = require("mongoose");
const Joi = require('joi');


const appointmentsSchema = new mongoose.Schema({
    created_at: {
        type: Date,
        default: Date.now()
    },
    userID: String,
    serviceID: String,
    Date: String,
    time: String,
    phone: String,
    indexArray:Number,
    serviceLength:Number
})

exports.appointmentsModel = mongoose.model("appointments", appointmentsSchema);

exports.appointmentsValidate = (_reqBody) => {
    let joiSchema = Joi.object({
        userID: Joi.string().min(2).max(99),
        serviceID: Joi.string().min(2).max(99),
        Date: Joi.string().min(2).max(99),
        time: Joi.string().min(2).max(99),
        phone: Joi.string().min(9).max(99),
        indexArray: Joi.number().min(0).max(99)

    })
    return joiSchema.validate(_reqBody)
}