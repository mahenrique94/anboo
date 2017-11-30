const http = require("http");
const express = require("./config/express")();
require("./config/bancodedados")(express.get("app_nome"));

http.createServer(express).listen(express.get("porta"), () => console.log(`[HTTP] => Servidor rodando na porta: ${express.get("porta")}`))