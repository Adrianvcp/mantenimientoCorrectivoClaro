const { generalDataModel, imagenModel } = require("../models");
const { matchedData } = require("express-validator");
const { handleHttpError } = require("../utils/handleError");

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
          'DateTime',
          'ClientName',
          'ClientPhoneNumber',
          'Requirement',
          'Observation',
          'idUser',
          'registro'
      ],
      order:[['registro', 'DESC']]
    };
    if (body.idUser !== undefined){
    options.where.idUser = body.idUser;}
    if (body.CID !== undefined){
      options.where.CID = body.CID;}
    if (body.Name !== undefined){
      options.where.Name = body.Name;}
    if (body.Ticket !== undefined){
      options.where.Ticket = body.Ticket;}
    if (body.DateTime !== undefined){
      options.where.DateTime = body.DateTime;}       
    const data = await generalDataModel.findAll(options);
    res.send({ data});
  } catch (e) {
    console.log(e)
    handleHttpError(res, "ERROR_GET_INFORME");
  }

};

const getInformeByCID = async (req, res) => {
  try {
    console.log('entro getInformeByCID')
    const body = req.body;
    const options = {
      where: {},
      include: [
        {
          model: imagenModel,
          as: "imagen",
        },
      ],
    };
    console.log('validacion CID')
    if (body.CID !== undefined) {
      options.where.CID = body.CID;
    }

    const data = await generalDataModel.findAll(options);
    console.log('options')

    const result = data.reduce((accumulator, item) => {
      const { imagen, ...generalData } = item.toJSON();
      const imagenList = [imagen];
      accumulator.imagen = [...(accumulator.imagen || []), ...imagenList];
      return {  ...generalData,...accumulator };
    }, {});
    console.log('obtiene Resultado')

    res.send({ data: result });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_GET_INFORME");
  }
};

const createInforme = async (req, res) => {
  try {
    req = matchedData(req);
    const data = await generalDataModel.create(req);

    res.send({ data });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_CREATE_INFORME");
  }
};

const updateInforme = async (req, res) => {
  try {
    const { id } = req.body; 


    const {
      CID,
      Name,
      PhoneNumber,
      Ticket,
      BackupEquipment,
      AddressSede,
      Sede,
      DateTime,
      ClientName,
      ClientPhoneNumber,
      Requirement,
      Observation,
      eliminacion_logica,
      finishedAt,
      observacion_pop_site,
      conclusion,
      id_tipo_ticket,
      id_codigoqr,
      id_vericom,
      id_ubicacion_atencion,
      id_estado_sup,
      id_empresa_contratista,
      id_provincia
    } = req.body;
    const updatedData = {
      CID,
      Name,
      PhoneNumber,
      Ticket,
      BackupEquipment,
      AddressSede,
      Sede,
      DateTime,
      ClientName,
      ClientPhoneNumber,
      Requirement,
      Observation,
      eliminacion_logica,
      finishedAt,
      observacion_pop_site,
      conclusion,
      id_tipo_ticket,
      id_codigoqr,
      id_vericom,
      id_ubicacion_atencion,
      id_estado_sup,
      id_empresa_contratista,
      id_provincia
    }; 


    await generalDataModel.findOne({where: { id:id }}).then(
      async (registro) => {
        if (registro) {
          const updatedRowsCount= await registro.update(updatedData);
          res.send({
            message: "Informe actualizado correctamente",
          });
        } else {
          res
            .status(404)
            .send({ message: "informe no encontrado" });
        }
      }
    ).catch((error) => {
      console.error(error);
      handleHttpError(res, "ERROR_UPDATE_INFORME");
    });

  } catch (e) {
    console.error(e);
    handleHttpError(res, "ERROR_UPDATE_INFORME");
  }
};


module.exports = { getInformeFilter, getInformeByCID,createInforme,updateInforme };
