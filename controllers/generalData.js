const {generalDataModel} = require('../models');
const { matchedData } = require("express-validator");
const { handleHttpError } = require('../utils/handleError');

const getInformeFilter = async (req, res) => {
  try {
    //const data = await generalDataModel.findAll({where: {idUser:req.idUser}});
    //res.send({ data});
    const body = req.body;
    const options = {
      where: {},
      attributes: [
          'CID',
          'Name',
          'PhoneNumber',
          'Ticket',
          'BackupEquipment',
          'AddressSede',
          'Sede',
          'Date',
          'Time',
          'ClientName',
          'ClientPhoneNumber',
          'Requirement',
          'Observation',
          'idUser'
      ]
    };
    if (body.idUser !== undefined){
    options.where.idUser = body.idUser;}
    if (body.CID !== undefined){
      options.where.CID = body.CID;}
    if (body.Name !== undefined){
      options.where.Name = body.Name;}
    if (body.Ticket !== undefined){
      options.where.Ticket = body.Ticket;}
    if (body.Date !== undefined){
      options.where.Date = body.Date;}       
    const data = await generalDataModel.findAll(options);
    res.send({ data});
  } catch (e) {
    console.log(e)
    handleHttpError(res, "ERROR_GET_INFORME");
  }
};

const createInforme = async (req, res) => {
    try {
      req = matchedData(req);
      const data = await generalDataModel.create(req);
      
      res.send({ data });
    } catch (e) {
      console.log(e)
      handleHttpError(res, "ERROR_CREATE_INFORME");
    }
};
  
module.exports = {getInformeFilter,createInforme};