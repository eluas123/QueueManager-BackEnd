const mongoose = require("mongoose");
const Joi = require('joi');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: String,
    role: {
        type: String,
        default: "user"
    },
    phone: String,
    password: String,
})

exports.userModel = mongoose.model("users", userSchema);

exports.genToken = (_id, role) => {
    let token = jwt.sign({ _id, role }, "EliasSecret", { expiresIn: "525600mins" });
    return token;
}

exports.validateUser = (_reqBody) => {
    let joiSchema = Joi.object({
        name: Joi.string().min(2).max(99).required(),
        phone: Joi.string().min(9).max(99).required(),
        password: Joi.string().min(3).max(99).required()
    })
    return joiSchema.validate(_reqBody);
}

exports.validateLogin = (_reqBody) => {
    let joiSchema = Joi.object({
        phone: Joi.string().min(9).max(99).required(),
        password: Joi.string().min(3).max(99).required()
    })
    return joiSchema.validate(_reqBody);
}