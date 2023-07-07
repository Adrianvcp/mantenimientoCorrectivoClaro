const express = require("express");
const { getInformeFilter,createInforme } = require("../controllers/generalData");
const router = express.Router();
const { validatorGeneralData,validatorGetGeneralData } = require("../validators/generalData");

router.get("/list", getInformeFilter);
router.post("/create" ,validatorGeneralData,createInforme);

module.exports = router;