const generalDataModel = require('./Mysql/generalData');
const imagenModel = require('./Mysql/imagen');

const models = {
    userModel: require('./Mysql/user'),
    imagenModel: require('./Mysql/imagen'),
    generalDataModel: require('./Mysql/generalData')
}

// Definición de la relación entre GeneralData y imagenModel
generalDataModel.belongsTo(imagenModel, {
  foreignKey: 'CID',
  targetKey: 'CID',
  as: 'imagen' // Cambiar el alias para reflejar el singular
});

imagenModel.hasMany(generalDataModel, {
  foreignKey: 'CID',
  sourceKey: 'CID',
  as: 'generalData' // Cambiar el alias para reflejar el plural
});

module.exports = models