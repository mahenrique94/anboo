const mongoose = require("mongoose");

module.exports = () => {

    const SEXOS = ["Feminino", "Masculino"];
    const SITUACAO_MIDIA = ["Interesse", "Assistindo", "Lendo", "Assistido", "Lido"];

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
                enum : SEXOS,
                maxlength : 10,
                required : true,
                type : String
            },
            slug : {
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
                    required : true
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
                type : Schema.Types.ObjectId,
                situacao : {
                    enum : SITUACAO_MIDIA,
                    maxlength : 10,
                    required : false,
                    type : String
                },
                capitulosassistidos : [{
                    required : false,
                    type : Schema.Types.ObjectId
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
                type : Schema.Types.ObjectId
            }],
            seguindo : [{
                required : false,
                type : Schema.Types.ObjectId
            }]
        }],
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