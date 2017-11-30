const mongoose = require("mongoose");

module.exports = () => {

    const atividades = mongoose.Schema({
        descricao : {
            required : true,
            type : String
        },
        perfil : {
            required : true,
            type : mongoose.Schema.Types.ObjectId
        },
        data : {
            dafault : new Date(),
            required : true,
            type : Date
        }
    });

    return mongoose.model("atividades", atividades);

}