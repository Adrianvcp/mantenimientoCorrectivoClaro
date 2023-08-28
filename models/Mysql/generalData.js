
const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const generalData = sequelize.define(
    "T_GeneralData",
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        CID:{
            type: DataTypes.STRING,
        },
        Name:{
            type: DataTypes.STRING,
        },
        PhoneNumber:{
            type: DataTypes.STRING,
        },
        Ticket:{
            type: DataTypes.STRING,
        },
        BackupEquipment:{
            type: DataTypes.STRING,
        },
        AddressSede:{
            type: DataTypes.STRING,
        },
        Sede:{
            type: DataTypes.STRING,
        },
        DateTime:{
            type: DataTypes.STRING,
        },
        ClientName:{
            type: DataTypes.STRING,
        },
        ClientPhoneNumber:{
            type: DataTypes.STRING,
        },
        Requirement:{
            type: DataTypes.JSON,
        },
        Observation:{
            type: DataTypes.STRING,
        },
        idUser:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        createdAt:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        eliminacion_logica:{
            type: DataTypes.INTEGER,
        },
        finishedAt:{
            type: DataTypes.DATE,
        },
        observacion_pop_site:{
            type: DataTypes.STRING,
        },
        conclusion:{
            type: DataTypes.STRING,
        },
        id_tipo_ticket:{
            type: DataTypes.INTEGER,
        },
        id_codigoqr:{
            type: DataTypes.INTEGER,
        },
        id_vericom:{
            type: DataTypes.INTEGER,
        },
        id_ubicacion_atencion:{
            type: DataTypes.INTEGER,
        },
        id_estado_sup:{
            type: DataTypes.INTEGER,
        },
        id_empresa_contratista:{
            type: DataTypes.INTEGER,
        },
        id_provincia:{
            type: DataTypes.INTEGER,
        },
        id_tipo_trabajo:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);



module.exports = generalData; 