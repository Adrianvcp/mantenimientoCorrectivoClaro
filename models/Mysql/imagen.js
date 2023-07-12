const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const Imagen = sequelize.define(
    "T_Imagen",
    {
        CID:{
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        Nivel1:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        Nivel2:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        URL:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        Description:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        timestamps: false,
        tableName: "T_Imagen",

    },
);


module.exports = Imagen;