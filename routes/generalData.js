const express = require("express");
const { getInformes,createInforme } = require("../controllers/generalData");
const router = express.Router();
const { validatorGeneralData } = require("../validators/generalData");

router.get("/", getInformes);
router.post("/" ,validatorGeneralData,createInforme);

module.exports = router;