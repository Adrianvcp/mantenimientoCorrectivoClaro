require("dotenv").config();
const express = require("express");
const cors = require("cors");
const{dbConnectMySql} = require("./config/mysql")
const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

app.use("/api",require("./routes"))

app.listen(port,() => {
    console.log('http://localhost:'+port)
});

dbConnectMySql();