const express = require("express");
const { getItems,createItem } = require("../controllers/generalData");
const router = express.Router();
const { validatorGeneralData } = require("../validators/generalData");

router.get("/", getItems);
router.post("/" ,validatorGeneralData,createItem);

module.exports = router;