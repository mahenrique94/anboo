const DIRETORIO_UPLOAD = "/Arquivo/Upload/anboo/";
const expres = require("express");
const consign = require("consign");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const methodOverride = require("method-override");

const prefix = expres.Router();
const router = expres.Router();

module.exports = () => {

    const api = express();

    api.set("secret", "chaves");
    api.set("port", 3000);
    api.set("diretorio_upload", DIRETORIO_UPLOAD);

    api.use(expres.static(path.resolve("./app/dist")));

    api.use(bodyParser.urlencoded({extended : true}));
    api.use(bodyParser.json());

    api.use(cors({origin : process.env.apiHost || "http://localhost:3000", credentials : true}));

    api.use(methodOverride);

    api.use(helmet.xssFilter());
    api.use(helmet.noSniff());

    api.use("/anboo", prefix);
    prefix.use("/api", router);

    api.disabled("x-powered-by");

    consign({cwd : "/api"}).include("models").then("controllers").then("routes/auth.js").then("routes").into(api);

    return api;

}