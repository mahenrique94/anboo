const mongoose = require("mongoose");

module.exports = () => {

    const tipos = mongoose.Schema({
        descricao : {
            index : {
                unique : true
            },
            maxlength: 120,
            required : true,
            type : String
        },
        slug : {
            index : {
                unique : true
            },
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

    return mongoose.model("tipos", tipos);

}