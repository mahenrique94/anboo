const APP_NOME = "anboo";
const DIRETORIO_UPLOAD = `/Arquivo/Upload/${APP_NOME}/`;
const express = require("express");
const consign = require("consign");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const methodOverride = require("method-override");

const prefixo = express.Router();
const router = express.Router();

module.exports = () => {

    const api = express();

    api.set("app_nome", APP_NOME);
    api.set("segredo", "chaves");
    api.set("porta", 3000);
    api.set("diretorio_upload", DIRETORIO_UPLOAD);

    api.use(express.static(path.resolve("./app/dist")));

    api.use(bodyParser.urlencoded({extended : true}));
    api.use(bodyParser.json());

    api.use(cors({origin : process.env.apiHost || "http://localhost:3000", credentials : true}));

    api.use(methodOverride);

    api.use(helmet.xssFilter());
    api.use(helmet.noSniff());

    api.use(`/${APP_NOME}`, prefixo);
    prefixo.use("/api", router);

    api.disabled("x-powered-by");

    consign({cwd : "api"}).include("modelos").then("controllers").then("rotas").into(api);

    return api;

}