const mongoose = require("mongoose");
const Joi = require('joi');


const typeservicesSchema = new mongoose.Schema({
    name: String,
    price: Number,
    lengthService: Number,
})

exports.typeServicesModel = mongoose.model("typeServices", typeservicesSchema);