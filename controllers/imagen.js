const { imagenModel } = require("../models");
const { matchedData } = require("express-validator");
const { handleHttpError } = require("../utils/handleError");
const fs = require("fs");
const Client = require("ftp");
const { v4: uuidv4 } = require("uuid");
const { conexionFTP } = require('../config/ftp');

const findById = async (req, res) => {
  try {
    const id = req.body.id;
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

const saveImage = async (req, res) => {
  try {
    const imageFile = req.file;
    const uniqueId = uuidv4();

    const requiredFields = ["t_general_data_id", "CID", "Nivel1", "Description","nro_imagen","createdAt"];
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
      const missingFieldsMsg = missingFields.join(", ");
      console.log(`Falta dato(s): ${missingFieldsMsg}`)
      return res.status(400).json({ error: `Falta dato(s): ${missingFieldsMsg}` });
    }

    const { t_general_data_id, CID, Nivel1, Nivel2, Description,nro_imagen,createdAt } = req.body;

    if (!imageFile) {
      return res.status(400).json({ error: "No se ha proporcionado ninguna imagen" });
    }


    // Guardar la imagen en el servidor FTP
    await uploadToFTP(imageFile.buffer, `${CID}/${uniqueId}.png`);
    
    // Crear un objeto con los datos de la imagen
    const newImageData = {
      t_general_data_id,
      CID,
      Nivel1,
      Nivel2,
      URL: `${CID}/${uniqueId}.png`,
      Description,
      nro_imagen: nro_imagen,
      createdAt: createdAt,
      eliminacion_logica: 0
    };

    // Guardar información de la imagen en la base de datos
    const newImage = await imagenModel.create(newImageData);

    return res.status(200).json({
      message: 'Imagen guardada exitosamente en el servidor FTP y la base de datos',
      image: newImage,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al guardar la imagen" });
  }
};

//cambia la eliminacion logica a 1 
const deleteImage = async (req, res) => {
  try {
    const { id } = req.body;

    const requiredFields = ["id"];
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
      const missingFieldsMsg = missingFields.join(", ");
      console.log(`Falta dato(s): ${missingFieldsMsg}`)
      return res.status(400).json({ error: `Falta dato(s): ${missingFieldsMsg}` });
    }

    // Crear un objeto con los datos
    const deleteImage = {
      id,
      eliminacion_logica: 1
    };

    // Eliminar imagen en la base de datos (eliminacion_logica : 1)
    const [updatedRowsCount, updatedRows] = await imagenModel.update(deleteImage, {
      where: { id: id }    });

    if (updatedRowsCount === 1) {
      res.status(200).send({ message: "Imagen eliminada", updatedRows });
    } else {
      res.status(404).send({ message: "Error al eliminar la imagen" });
    }


  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al guardar la imagen" });
  }
};

//Descripcion y orden(esto por implementar)
const editImage = async (req, res) => {
  try {
    
    const { id } = req.body; 


    const {
    t_general_data_id,
    CID,
    Nivel1,
    Nivel2,
    URL,
    Description,
    nro_imagen,
    createdAt,
    updatedAt,
    } = req.body;
    const updatedData = {
      t_general_data_id,
      CID,
      Nivel1,
      Nivel2,
      URL,
      Description,
      nro_imagen,
      createdAt,
      updatedAt,
    }; 


    await imagenModel.findOne({where: { id:id }}).then(
      async (registro) => {
        if (registro) {
          const updatedRowsCount = await registro.update(updatedData);
          res.status(200).send({
            message: "Imagen actualizada correctamente",
          });
        } else {
          res
            .status(404)
            .send({ message: "Imagen no encontrado" });
        }
      }
    ).catch((error) => {
      console.error(error);
      handleHttpError(res, "ERROR_UPDATE_IMAGE");
    });


  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al editrar la imagen" });
  }
};

const uploadToFTP = async (imageBuffer, destinationPath) => {
  
  const client = await conexionFTP(); 

  return new Promise((resolve, reject) => {

    client.put(imageBuffer, destinationPath, (err) => {
      client.destroy();

      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(
          `Imagen guardada exitosamente en el servidor FTP: ${destinationPath}`
        );
        resolve();
      }
    });

  });
};


module.exports = {
  findById,
  saveImage,
  deleteImage,
  editImage
};
