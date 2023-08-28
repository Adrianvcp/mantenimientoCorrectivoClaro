const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const Imagen = sequelize.define(
    "T_Imagen",
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        t_general_data_id:{
            type: DataTypes.INTEGER,
        },
        CID:{
            type: DataTypes.STRING,
        },
        Nivel1:{
            type: DataTypes.STRING,
        },
        Nivel2:{
            type: DataTypes.STRING,
        },
        URL:{
            type: DataTypes.STRING,
        },
        Description:{
            type: DataTypes.STRING,
        },
        nro_imagen:{
            type: DataTypes.INTEGER,
        },
        createdAt:{
            type: DataTypes.DATE,
        },
        eliminacion_logica:{
            type: DataTypes.INTEGER,
            defaultValue:0
        },
        updatedAt:{
            type: DataTypes.DATE,
        }
    },
    {
        timestamps: true,
        tableName: "T_Imagen",

    },
);



module.exports = Imagen;