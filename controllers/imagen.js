const { imagenModel } = require("../models");
const { matchedData } = require("express-validator");
const { handleHttpError } = require("../utils/handleError");
const fs = require("fs");
const Client = require("ftp");
const { v4: uuidv4 } = require("uuid");
const { uploadToFTP } = require('../config/ftp');

const findById = async (req, res) => {
  try {
    const id = req.body.id;
    console.log(id);
    const image = await imagenModel.findOne({ where: { CID: id } });

    if (!image) {
      return handleHttpError(res, "Imagen no encontrada", 404);
      //res.status(404).json({ error: 'Imagen no encontrada' });
    }

    return res.send({ image });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_IMAGE");
  }
};

const createImage = async (req, res) => {
  try {
    const { CID, Nivel1, Nivel2, URL, Description } = req.body;
    const newImage = await imagenModel.create({
      CID,
      Nivel1,
      Nivel2,
      URL,
      Description,
    });

    return handleHttpError(res, "IMAGEN SAVE SUCCESSFULL", 201).json({
      image: newImage,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_CREATE_IMAGE");
  }
};

const saveImage = async (req, res) => {
  try {
    const imageFile = req.file;
    const uniqueId = uuidv4();

    const requiredFields = ["CID", "Nivel1", "Description"];

    const missingFields = [];

    requiredFields.forEach((field) => {
      if (!req.body[field]) {
        missingFields.push(field);
      }
    });

    if (missingFields.length > 0) {
      const missingFieldsMsg = missingFields.join(", ");
      return res
        .status(400)
        .json({ error: `Falta dato(s): ${missingFieldsMsg}` });
    }

    const { CID, Nivel1, Nivel2, Description } = req.body;
    const destinationPath = `${CID}/${uniqueId}.png`;

    if (!imageFile) {
      return res
        .status(400)
        .json({ error: "No se ha proporcionado ninguna imagen" });
    }


       // Guardar la imagen en el servidor FTP
       await uploadToFTP(imageFile.buffer, destinationPath);
          
        // Guardar información de la imagen en la base de datos
       const newImage = await imagenModel.create({ CID, Nivel1, Nivel2, URL:destinationPath, Description });
   
       return res.status(200).json({
        message: 'Imagen guardada exitosamente en el servidor FTP',
        image: newImage,
      });
     
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al guardar la imagen" });
  }
};

module.exports = {
  findById,
  createImage,
  saveImage,
};
