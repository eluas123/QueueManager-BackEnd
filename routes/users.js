const express = require("express");
const { validateUser, validateLogin, userModel, genToken } = require("../models/userModel");
const bcrypt = require("bcrypt");
const { authAdmin, auth } = require("../middlewares/auth");
const router = express.Router();

///get all users by perpage 10 admin only
router.get("/", authAdmin, async(req, res) => {
    try {
        let perPage = req.query.perPage || 30;
        let page = req.query.page || 1;
        let data = await userModel.find({})
            .limit(perPage)
            .skip((page - 1) * perPage)
            // .sort({_id:-1}) like -> order by _id DESC
            .sort({ _id: -1 })
        res.json(data);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "there error try again later", err })
    }
})

///check token
router.get("/checkToken", auth, async(req, res) => {
    return res.json({ status: "ok", role: req.tokenData.role })
})

router.get("/userInfo", auth, async(req, res) => {
    try {
        let user = await userModel.findOne({ _id: req.tokenData._id }, { password: 0 })
        return res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err_msg: "There is problem, try again later", err })
    }
})

//get user by id
router.get("/userInfo/:idUser", async(req, res) => {
    try {
        let idUser = req.params.idUser;
        ////finding user by id and encryping the password
        let user = await userModel.findOne({ _id: idUser }, { password: 0 })
        return res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "there error try again later", err })
    }
})

////user sign up
router.post("/", async(req, res) => {
    ////validate the input from client side
    let validBody = validateUser(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let user = new userModel(req.body);
        user.password = await bcrypt.hash(user.password, 10);
        await user.save();
        user.password = "*****";
        return res.status(201).json(user);
    } catch (err) {
        ////error 11000 is if the phone number exist in the system
        if (err.code == 11000) {
            return res.status(400).json({ code: 11000, err_msg: "Phone number already in system" })
        }
        return res.status(500).json({ err_msg: "There is problem, try again later" })
    }
})

////user login
router.post("/login", async(req, res) => {
    let validBody = validateLogin(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        //// check if there phone with this user
        let user = await userModel.findOne({ phone: req.body.phone });
        if (!user) {
            return res.status(401).json({ msg: "User not found!" });
        }
        ////check password
        let validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(401).json({ msg: "Password wrong!" })
        }
        ////generate and send token
        let token = genToken(user.id, user.role);
        return res.json({ token, user: { name: user.name, role: user.role } });
    } catch (err) {
        return res.status(500).json({ err_msg: "There is problem, try again later" })
    }
})

////delete user by id only admin
router.delete("/:idDelete", authAdmin, async(req, res) => {
    try {
        let idDelete = req.params.idDelete;
        let data = await userModel.deleteOne({ _id: idDelete })
        return res.json(data);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "there error try again later", err })
    }
})



module.exports = router;