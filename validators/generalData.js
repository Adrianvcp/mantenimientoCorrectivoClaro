const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");
const { generalDataModel } = require("../models");

const validatorGeneralData = [
    check("CID")
    .notEmpty()
    .custom(value => {
        return generalDataModel.findOne({ where: {CID: value} })
           .then((res) => {
                if(res==null){
              }else{
                return Promise.reject('CID existe')
              }
           })
     }),
    check("idUser")
    .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

module.exports = {validatorGeneralData};