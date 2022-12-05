const express = require("express");
const moment = require("moment");
const { authAdmin, auth } = require("../middlewares/auth");
const { workHoursModel } = require("../models/workHoursModel");
const router = express.Router();

///get id of workhours
router.get("/infoworkHours/:idworkHours", async(req, res) => {
    let idworkHours = req.params.idworkHours;
    try {
        let workHours = await workHoursModel.findOne({ _id: idworkHours })
        return res.json(workHours);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "there error try again later", err })
    }
})

//get the workhours by date
router.get("/workHoursByDate/:dateworkHours", async(req, res) => {
    let dateworkHours = req.params.dateworkHours;
    try {
        let workHours = await workHoursModel.find({ date: dateworkHours })
        return res.json(workHours);

    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "there error try again later", err })
    }
})



///get all workHours list only admin
router.get("/", authAdmin, async(req, res) => {
    try {
        let perPage = req.query.perPage || 30;
        let page = req.query.page || 1;
        let data = await workHoursModel.find({})
            .limit(perPage)
            .skip((page - 1) * perPage)
            // .sort({_id:-1}) like -> order by _id DESC
            .sort({ _id: -1 })
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "there error try again later", err })
    }
})

///add work hours only admin
router.post("/", authAdmin, async(req, res) => {
    try {
        let workHours = await workHoursModel.create(req.body)
        let find = await workHoursModel.findOne({ _id: workHours._id })
        let distance = ((req.body.end.substring(0, 2) - req.body.start.substring(0, 2)) * 2) + 2;
        for (let i = 1; i < distance - 1; i++) {
            await workHoursModel.updateMany({ _id: find._id }, {
                $push: { appointmentsArr: (req.body.break == req.body.start ? "" : req.body.start) }
            })
            req.body.start = moment(req.body.start, 'HH:mm').add(30, 'minutes').format('HH:mm')
        }
        await workHours.save();
        return res.status(201).json(workHours);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "There is problem try again later", err })
    }
})

///delete workHours only admin
router.delete("/:idDelete", authAdmin, async(req, res) => {
    let idDelete = req.params.idDelete;
    try {
        let data = await workHoursModel.deleteOne({ _id: idDelete })
        return res.json(data);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "there error try again later", err })
    }
})

//edit workHours only admin
router.put("/:idEdit", authAdmin, async(req, res) => {
    try {
        let edit = req.params.idEdit;
        let data = await workHoursModel.updateOne({ _id: edit }, req.body)
        return res.json(data);
    } catch (err) {
        console.log(err);
        return res.status(501).json({ msg: "There error try again later", err })
    }
})

///edit workHours by date
router.put("/appointmentsArray/:DateSelect", auth, async(req, res) => {
    try {
        let DateSelect = req.params.DateSelect;
        let data = await workHoursModel.updateOne({ date: DateSelect }, req.body)
        return res.json(data);
    } catch (err) {
        console.log(err);
        return res.status(501).json({ msg: "There error try again later", err })
    }
})

///updating the array of workHours after user shculded appointment
router.put("/newAppointmentsArray/:DateSelect/:lengthService/:time", async(req, res) => {
    try {
        let DateSelect = req.params.DateSelect;
        let lengthService = req.params.lengthService;
        let time = req.params.time;
        let index;
        let data = await workHoursModel.findOne({ date: DateSelect })
        let appointmentsArr = data._doc.appointmentsArr
        for (let i = 0; i < appointmentsArr.length; i++) {
            if (time == appointmentsArr[i]) {
                index = i;
            }
        }

        for (let j = index; j < index + lengthService / 30; j++) {
            await workHoursModel.findOne({
                $set: { appointmentsArr: data._doc.appointmentsArr[j] = "" }
            })
        }

        let RealData = await workHoursModel.updateOne({ date: DateSelect }, { $set: { appointmentsArr: data._doc.appointmentsArr } })
        return res.json(RealData);

    } catch (err) {
        console.log(err);
        return res.status(501).json({ msg: "There error try again later", err })
    }
})

///get workHours by Date
router.get("/appointmentsArray/:DateSelect", auth, async(req, res) => {
    try {
        let DateSelect = req.params.DateSelect;
        let data = await workHoursModel.findOne({ date: DateSelect })
        return res.json(data);
    } catch (err) {
        console.log(err);
        return res.status(501).json({ msg: "There error try again later", err })
    }
})



module.exports = router;