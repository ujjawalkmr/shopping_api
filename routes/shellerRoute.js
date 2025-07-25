const express = require('express');
const { handleCreateSheller, handleFetchAllSheller } = require("../controller/shellerController");

const router = express.Router();


router.route("/").post(handleCreateSheller);
router.route("/fetchAll/sheller").get(handleFetchAllSheller);

module.exports = router;