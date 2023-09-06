const express = require("express");
const { findById,createImage,saveImage,saveImages, saveImages3,deleteImage,editImage} = require("../controllers/imagen");
const router = express.Router();
const { validatorLogin } = require("../validators/auth");
const multer = require('multer');
const crypto = require('crypto');
const validateAndCreateFolder = require("../middlewares/ftpMiddlewareCreationFoler");

//configuracion multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/byCID",validatorLogin, findById);
router.post("/saveImage",upload.single('image'),saveImage);
router.post("/deleteImage",deleteImage);
router.patch("/editImage",editImage);

// router.post("/saveImages",upload.array('images'),saveImages3)
module.exports = router;