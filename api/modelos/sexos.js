const mongoose = require("mongoose");

module.exports = () => {

    const sexos = mongoose.Schema({
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

    return mongoose.model("sexos", sexos);

}