const {generalDataModel} = require('../models');
const { matchedData } = require("express-validator");
const { handleHttpError } = require('../utils/handleError');


const getInformes = async (req, res) => {
    try {
      const user = req.user;
      const data = await generalDataModel.findAll({});
      res.send({ data,  user });
    } catch (e) {
      console.log(e)
      handleHttpError(res, "ERROR_GET_ITEMS");
    }
  };

const createInforme = async (req, res) => {
    try {
      //const body = req.body;
      //const data = await generalDataModel.create(body);
      //res.send({ data });
      
      req = matchedData(req);
      const data = await generalDataModel.create(req);
      
      res.send({ data });
    } catch (e) {
      console.log(e)
      handleHttpError(res, "ERROR_CREATE_ITEM");
    }
};
  
module.exports = {getInformes,createInforme};