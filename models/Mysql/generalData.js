const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const generalData = sequelize.define(
    "T_GeneralData",
    {
        CID:{
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
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
        Date:{
            type: DataTypes.STRING,
        },
        Time:{
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
        }
    },
    {
        timestamps: false,
    }
);

module.exports = generalData; 