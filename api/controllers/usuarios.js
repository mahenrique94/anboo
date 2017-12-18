const mongoSanitize = require("mongo-sanitize");
const slug = require("slug");
const crypto = require("crypto");

const DADOS_CRIPTOGRAFAR = {
    algoritmo : "aes256",
    codificacao : "utf8",
    segredo : "chaves",
    tipo : "hex"
};

module.exports = api => {

    const usuarios = api.modelos.usuarios;

    function criptografar(senha) {
        const cipher = crypto.createCipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo);
        let criptografado = cipher.update(senha, DADOS_CRIPTOGRAFAR.codificacao, DADOS_CRIPTOGRAFAR.tipo);
        criptografado += cipher.final(DADOS_CRIPTOGRAFAR.tipo);
        return criptografado;
    };

    function descriptografar(senha) {
        const decipher = crypto.createDecipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo);
        let descriptografado = decipher.update(senha, DADOS_CRIPTOGRAFAR.tipo, DADOS_CRIPTOGRAFAR.codificacao);
        descriptografado += decipher.final(DADOS_CRIPTOGRAFAR.codificacao);
        return descriptografado;
    };

    return {
        atualizar : (req, res) => {
            const _id = mongoSanitize(req.body._id);
            req.body.senha = criptografar(req.body.senha);
            req.body.dataatualizacao = new Date();
            usuarios.findByIdAndUpdate(_id, req.body).exec()
                .then(usuario => res.json(usuario))
                .catch(erro => {
                    console.error(erro);
                    res.status(500).json(erro);
                });
        },
        deletar : (req, res) => {
            const _id = mongoSanitize(req.body._id);
            usuarios.remove({_id}).exec()
                .then(() => res.status(204).end())
                .catch(erro => {
                    console.error(erro);
                    res.status(500).json(erro);
                });
        },
        editar : (req, res) => {
            const _id = mongoSanitize(req.params.id);
            usuarios.findOne({_id}).exec()
                .then(usuario => res.json(usuario))
                .catch(erro => {
                    console.error(erro);
                    res.status(404).json(erro);
                });
        },
        listar : (req, res) => {
            usuarios.find().exec()
                .then(lista => res.json(lista))
                .catch(erro => {
                    console.error(erro);
                    res.status(500).json(erro);
                });
        },
        salvar : (req, res) => {
            usuarios.create(req.body)
                .then(usuario => res.status(201).json(usuario))
                .catch(erro => {
                    console.error(erro);
                    res.status(500).json(erro);
                });
        }
    }

}