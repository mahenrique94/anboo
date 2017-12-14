const mongoose = require("mongoose");

module.exports = () => {

    const midias = mongoose.Schema({
        nome : {
            maxlength: 255,
            required : true,
            type : String
        },
        tipo : {
            maxlength : 10,
            required : true,
            type : String
        },
        genero : [{
            maxlength : 30,
            required : true,
            type : String
        }],
        sinopse : {
            required : true,
            type : String
        },
        imagem : {
            maxlength: 255,
            required : false,
            type : String
        },
        nota : {
            max : 10,
            min : 0,
            required : false,
            type : Number
        },
        slug : {
            required : true,
            type : String
        },
        // Quando a midia for um Livro
        paginas : {
            max : 5000,
            min : 0,
            required : false,
            type : Number
        },
        episodios : [{
            nome : {
                maxlength: 255,
                required : true,
                type : String
            },
            sinopse : {
                required : true,
                type : String
            },
            slug : {
                required : true,
                type : String
            },
            datacadastro : {
                default : new Date(),
                required : false,
                type : Date
            },
            dataatualizacao : {
                default : new Date(),
                required : false,
                type : Date
            }
        }],
        comentarios : [{
            usuario : {
                required : false,
                type : mongoose.Schema.Types.ObjectId
            },
            comentario : {
                required : false,
                type : String
            }
        }],
        notas : [{
            usuario : {
                required : false,
                type : mongoose.Schema.Types.ObjectId
            },
            nota : {
                max : 10,
                min : 0,
                required : false,
                type : Number
            }
        }],
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

    return mongoose.model("midias", midias);

}