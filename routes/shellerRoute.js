const express = require('express');
const { handleCreateSheller, handleFetchAllSheller, handleFetchById } = require("../controller/shellerController");

const router = express.Router();


router.route("/").post(handleCreateSheller);
router.route("/fetchAll/sheller").get(handleFetchAllSheller);
router.route("/shellerByID").get(handleFetchById)

module.exports = router;