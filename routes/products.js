const express = require("express");
const { authAdmin } = require("../middlewares/auth");
const { productsModel, productsValidate } = require("../models/productsModel");
const router = express.Router();

///get all products
router.get("/", async(req, res) => {
    try {
        let data = await productsModel.find({})
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "there error try again later", err })
    }
})

///add products only admin
router.post("/", authAdmin, async(req, res) => {
    let validBody = productsValidate(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let products = new productsModel(req.body);
        await products.save();
        return res.status(201).json(products);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "There is problem try again later", err })
    }
})

///delete products only admin
router.delete("/:idDelete", authAdmin, async(req, res) => {
    try {
        let idDelete = req.params.idDelete;
        let data = await productsModel.deleteOne({ _id: idDelete })
        return res.json(data);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "there error try again later", err })
    }
})


///edit products only admin
router.put("/:idEdit", authAdmin, async(req, res) => {
    try {
        let edit = req.params.idEdit;
        let data = await productsModel.updateOne({ _id: edit }, req.body)
        return res.json(data);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "there error try again later", err })
    }
})

module.exports = router;