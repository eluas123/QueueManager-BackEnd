const express = require("express");
const moment = require("moment");
const { authAdmin, auth } = require("../middlewares/auth");
const { appointmentsModel } = require("../models/appointmentsModel");
const { sendSMS, sendSMSAdmin, sendSMSdel, sendSMSdelAdmin } = require("../service/send_sms");
const router = express.Router();

////get all the appointments by date for the admin only
router.get("/list-appointments/:dateBody", authAdmin, async(req, res) => {
    let dateBody = req.params.dateBody;
    try {
        let data = await appointmentsModel.find({ Date: dateBody })
            .sort({ time: 1 })
        return res.json(data);
    } catch (err) {
        return res.status(500).json({ err_msg: "There is problem try again later,", err });
    }
})

////get graph of all the appointments per month for admin only
router.get("/graphs", authAdmin, async(req, res) => {
    let array = [];
    try {
        let data = await appointmentsModel.find({})
        for (let i = 0; i < 12; i++) {
            if (i < 9) {
                array[i] = { label: moment(`2022-0${i + 1}`).format("MM-YYYY") }
            } else {
                array[i] = { label: moment(`2022-${i + 1}`).format("MM-YYYY") }
            }
        }
        let sameDate = array.map((date) => data.filter(item => item._doc.Date.substring(3) == date.label).length);
        return res.json(sameDate);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "there error try again later", err })
    }
})

////get all appointments
router.get("/", auth, async(req, res) => {
    try {
        let data = await appointmentsModel.find({})
        return res.json(data);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "there error try again later", err })
    }
})

//// get all appointments that the user has scheduled
router.get("/userAppointments/:phone", auth, async(req, res) => {
    let phone = req.params.phone;
    try {
        let data = await appointmentsModel.find({ phone: phone })
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "there error try again later", err })
    }
})

///delete appointments that user has scheduled
///sending sms for user and admin if the delete success
router.delete("/:idDelete", auth, async(req, res) => {
    try {
        let idDelete = req.params.idDelete;
        let data = await appointmentsModel.deleteOne({ _id: idDelete })
            // sendSMSdel(idUser[0]._doc.phone,idUser[0]._doc.time, idUser[0]._doc.Date,idUser[0]._doc.serviceID,idUser[0]._doc.userID);
            // sendSMSdelAdmin(idUser[0]._doc.time, idUser[0]._doc.Date,idUser[0]._doc.serviceID,idUser[0]._doc.userID)
        return res.json(data);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "there error try again later, ", err })
    }
})

////delete appointments that users has scheduleds only admin 
router.delete("/adminDelete/:idDelete", authAdmin, async(req, res) => {
    try {
        let idDelete = req.params.idDelete;
        let data = await appointmentsModel.deleteOne({ _id: idDelete })
            // sendSMSdel(idUser[0]._doc.phone,idUser[0]._doc.time, idUser[0]._doc.Date,idUser[0]._doc.serviceID,idUser[0]._doc.userID);
            // sendSMSdelAdmin(idUser[0]._doc.time, idUser[0]._doc.Date,idUser[0]._doc.serviceID,idUser[0]._doc.userID)
        return res.json(data);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "there error try again later, ", err })
    }
})

///making a appointment
router.post("/", auth, async(req, res) => {
    let validBody = appointmentsModel(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let appointments = new appointmentsModel(req.body);
        await appointments.save();
        // sendSMS(req.body.phone, req.body.userID, req.body.Date, req.body.time, req.body.serviceID);
        // sendSMSAdmin(req.body.userID, req.body.Date, req.body.time, req.body.serviceID);
        return res.status(201).json(appointments);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "There is problem try again later", err })
    }
})

module.exports = router;