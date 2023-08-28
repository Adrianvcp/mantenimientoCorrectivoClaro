require("dotenv").config();
const express = require("express");
const cors = require("cors");
const{dbConnectMySql} = require("./config/mysql")
const{conexionFTP} = require("./config/ftp")
const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

app.use("/api",require("./routes"))

app.listen(port,() => {
    console.log('Connecting to http://localhost:'+port)
});

dbConnectMySql();
// conexionFTP();