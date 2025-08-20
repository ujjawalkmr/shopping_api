
const Sheller = require("../model/shellerModel");
const mongoose = require("mongoose");

function validateProductDetails(details) {
    const errors = [];

    if (details.productName) {
        if (!details.productPrice || typeof details.productPrice !== 'string' || details.productPrice.trim() === '') {
            errors.push({ field: 'productPrice', message: 'Product price is required when productName is provided' });
        }

        if (!details.productStoreLink || typeof details.productStoreLink !== 'string' || details.productStoreLink.trim() === '') {
            errors.push({ field: 'productStoreLink', message: 'Store link is required when productName is provided' });
        }

        if (!details.productQuantity || typeof details.productQuantity !== 'string' || details.productQuantity.trim() === '') {
            errors.push({ field: 'productQuintity', message: 'Product quantity is required when productName is provided' });
        }

        if (!Array.isArray(details.productImage)) {
            errors.push({ field: 'productImage', message: 'Product image must be an array' });
        } else if (details.productImage.length < 1 || details.productImage.length > 6) {
            errors.push({ field: 'productImage', message: 'Product image must contain between 1 and 6 URLs' });
        }

        // if (!details.aboutProduct || typeof details.aboutProduct !== 'string' || details.aboutProduct.trim() === '') {
        //     errors.push({ field: 'aboutProduct', message: 'About product is required when productName is provided' });
        // }
    }

    return errors;
}

async function handleCreateSheller(req, res) {
    try {
        /// this only for json formate 
        /// if use param then use (req.params.body)
        const body = req.body;
        const pdetails = body.productDetails;
        console.log(`details is: ` + pdetails.productName, pdetails);
        if (!body.firstName || !body.lastName || !body.email || !body.gender || !body.jobTitle) {
            return res.status(400).json({ msg: "All field areeeeee required" });
        }

        const productErrors = validateProductDetails(pdetails);
        if (productErrors.length > 0) {
            return res.status(400).json({
                status: 'error',
                errors: productErrors
            });
        }
        const existingSheller = await Sheller.findOne({ email: body.email });
        if (existingSheller) {
            return res.status(409).json({ error: "Email already exists" });
        }
        const result = await Sheller.create(
            {
                firstName: body.firstName,
                lastName: body.lastName,

                productDetails: body.productDetails,

                email: body.email,
                gender: body.gender,
                jobTitle: body.jobTitle,

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

async function handleFetchById(req, res) {
    try {
        const body = req.body;

        console.log("start fetching by id", body.id);
        if (!body.id || !mongoose.Types.ObjectId.isValid(body.id)) {
            return res.status(400).json({ error: "ID Not found" });
        }
        const result = await Sheller.findById(body.id);
        return res.status(200).json({ data: result, msg: "success" });
    } catch (err) {
        console.log("error is:", err);
        return res.status(500).json({ err: err });
    }
}

module.exports = { handleCreateSheller, handleFetchAllSheller, handleFetchById };