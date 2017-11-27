const http = require("http");
const express = require("./config/express")();
require("./config/database")(express.get("app_name"));

http.createServer(express).listen(express.get("port"), () => console.log(`[HTTP] => Servidor rodando na porta: ${express.get("port")}`))