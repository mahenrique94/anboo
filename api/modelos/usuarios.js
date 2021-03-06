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
        perfils : [{
            nome : {
                index : {
                    unique : true
                },
                maxlength : 120,
                required : true,
                type : String
            },
            idade : {
                max : 100,
                min : 0,
                required : true,
                type : Number
            },
            sexo : {
                maxlength : 10,
                required : true,
                type : String
            },
            slug : {
                index : {
                    unique : true
                },
                maxlength : 255,
                required : true,
                type : String
            },
            descricao : {
                required : false,
                type : String
            },
            endereco : {
                logradouro : {
                    maxlength : 60,
                    required : true,
                    type : String
                },
                numero : {
                    maxlength : 10,
                    required : true,
                    type : String
                },
                cep : {
                    match : /[0-9]{5}-[0-9]{3}/,
                    maxlength : 9,
                    required : true,
                    type : String
                },
                complemento : {
                    maxlength : 30,
                    required : false,
                    type : String
                },
                bairro : {
                    maxlength : 60,
                    required : true,
                    type : String
                },
                cidade : {
                    max : 999999999,
                    min : 0,
                    required : true,
                    type : Number
                },
                estado : {
                    max : 99,
                    min : 0,
                    required : true,
                    type : Number
                },
                pais : {
                    max : 999999999,
                    min : 0,
                    default : 1058,
                    required : true,
                    type : Number
                }
            },
            midias : [{
                required : false,
                type : mongoose.Schema.Types.ObjectId,
                situacao : {
                    maxlength : 10,
                    required : false,
                    type : String
                },
                episodiosassistidos : [{
                    required : false,
                    type : mongoose.Schema.Types.ObjectId
                }],
                // Quando a midia for um Livro
                paginaAtual : {
                    max : 5000,
                    min : 0,
                    required : false,
                    type : Number
                }
            }],
            seguidores : [{
                required : false,
                type : mongoose.Schema.Types.ObjectId
            }],
            seguindo : [{
                required : false,
                type : mongoose.Schema.Types.ObjectId
            }],
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

    return mongoose.model("usuarios", usuarios);

}