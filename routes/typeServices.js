const express = require("express");
const { authAdmin } = require("../middlewares/auth");
const { typeServicesModel, typeServicesValidate } = require("../models/typeServicesModel");
const router = express.Router();

///get all the services by perpage 10
router.get("/", async(req, res) => {
    try {
        let perPage = req.query.perPage || 30;
        let page = req.query.page || 1;
        let data = await typeServicesModel.find({})
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

////get service by id only admin
router.get("/infoService/:idService", authAdmin, async(req, res) => {
    try {
        let idService = req.params.idService;
        let serv = await typeServicesModel.findOne({ _id: idService })
        return res.json(serv);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "there error try again later", err })
    }
})

///get all the service admin only
router.get("/listTypeService", authAdmin, async(req, res) => {
    try {
        let data = await typeServicesModel.find({});
        return res.json(data);
    } catch (err) {
        return res.status(500).json({ err_msg: "There is problem try again later,", err });
    }
})

/////add type of service by admin only
router.post("/", authAdmin, async(req, res) => {
    try {
        let typeservices = new typeServicesModel(req.body);
        await typeservices.save();
        return res.status(201).json(typeservices);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "There is problem try again later", err })
    }
})

//// edit type of service by admin only
router.put("/:idEdit", authAdmin, async(req, res) => {
    try {
        let edit = req.params.idEdit;
        let data = await typeServicesModel.updateOne({ _id: edit }, req.body)
        return res.json(data);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "there error try again later", err })
    }
})

////delete type of service by admin only
router.delete("/:idDelete", authAdmin, async(req, res) => {
    try {
        let idDelete = req.params.idDelete;
        let data = await typeServicesModel.deleteOne({ _id: idDelete })
        return res.json(data);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "there error try again later", err })
    }
})


module.exports = router;