const mongoose = require("mongoose");

module.exports = () => {

    const usuarios = mongoose.Schema({
        email : {
            index : {
                unique : true
            },
            maxlength : 255,
            required : true,
            type : String
        },
        senha : {
            maxlength : 255,
            required : true,
            type : String
        },
        ativo : {
            default : true,
            type : Boolean
        },
        datacadastro : {
            dafault : new Date(),
            required : true,
            type : Date
        },
        dataatualizacao : {
            dafault : new Date(),
            required : true,
            type : Date
        }
    });

    return mongoose.model("usuarios", usuarios);

}