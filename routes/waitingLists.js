const express = require("express");
const { authAdmin, auth } = require("../middlewares/auth");
const { waitingListModel, waitingListValidate } = require("../models/waitingListModel");
const { sendSMSwaitingListAdmin } = require("../service/send_sms");
const router = express.Router();

////get all the waiting list by date admin only
router.get("/:dateBody", authAdmin, async(req, res) => {
    let dateBody = req.params.dateBody;
    try {
        let perPage = req.query.perPage || 30;
        let page = req.query.page || 1;
        let data = await waitingListModel.find({ date: dateBody })
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

///adding user to the waiting list
router.post("/", auth, async(req, res) => {
    let validBody = waitingListValidate(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let waitingList = new waitingListModel(req.body);
        await waitingList.save();
        // sendSMSwaitingListAdmin(req.body.name, req.body.date);
        return res.status(201).json(waitingList);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "There is problem try again later", err })
    }
})

////delete user from waiting list only admin
router.delete("/:idDelete", authAdmin, async(req, res) => {
    try {
        let idDelete = req.params.idDelete;
        let data = await waitingListModel.deleteOne({ _id: idDelete })
        return res.json(data);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "there error try again later", err })
    }
})



module.exports = router;