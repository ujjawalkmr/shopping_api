const e = require("express");
const Sheller = require("../model/shellerModel");
const mongoose = require("mongoose");


async function handleCreateSheller(req, res) {
    try {
        /// this only for json formate 
        /// if use param then use (req.params.body)
        const body = req.body;
        if (!body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
            return res.status(400).json({ msg: "All field are required" });
        }

        const existingSheller = await Sheller.findOne({ email: body.email });
        if (existingSheller) {
            return res.status(409).json({ error: "Email already exists" });
        }
        const result = await Sheller.create(
            {
                firstName: body.first_name,
                lastName: body.last_name,
                email: body.email,
                gender: body.gender,
                jobTitle: body.job_title,
                shellItems: body.sheller_items,
            }
        );
        console.log("updated result :", result);
        return res.status(200).json({ msg: "success", id: result.id });
    } catch (err) {
        console.log("error is :", err);
        return res.status(500).json({ err: err });
    }

}

async function handleFetchAllSheller(req, res) {
    try {
        const allShellerData = await Sheller.find({});
        if (!allShellerData || allShellerData.length === 0) {
            return res.status(404).json({ msg: "No data fond" });
        }
        else {
            return res.status(200).json({ data: allShellerData, msg: "success" });
        }
    } catch (err) {
        return res.status(500).json({ err: err });
    }
}

module.exports = { handleCreateSheller, handleFetchAllSheller };