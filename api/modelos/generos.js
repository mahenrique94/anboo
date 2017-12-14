const mongoose = require("mongoose");

module.exports = () => {

    const generos = mongoose.Schema({
        descricao : {
            maxlength: 120,
            required : true,
            type : String
        },
        slug : {
            maxlength: 255,
            required : true,
            type : String
        },
        datacadastro : {
            default : new Date(),
            required : true,
            type : Date
        },
        dataatualizacao : {
            default : new Date(),
            required : true,
            type : Date
        }
    });

    return mongoose.model("generos", generos);

}