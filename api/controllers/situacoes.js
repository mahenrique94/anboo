var mongoSanitize = require("mongo-sanitize");
const slug = require("slug");

module.exports = api => {

    const situacoes = api.modelos.situacoes;

    return {
        atualizar : (req, res) => {
            const _id = mongoSanitize(req.body._id);
            req.body.slug = slug(req.body.descricao.toString().toLowerCase());
            req.body.dataatualizacao = new Date();
            situacoes.findByIdAndUpdate(_id, req.body).exec()
                .then(situacao => res.json(situacao))
                .catch(erro => {
                    console.error(erro);
                    res.status(500).json(erro);
                });
        },
        deletar : (req, res) => {
            const _id = mongoSanitize(req.body._id);
            situacoes.remove({_id}).exec()
                .then(() => res.status(204).end())
                .catch(erro => {
                    console.error(erro);
                    res.status(500).json(erro);
                });
        },
        editar : (req, res) => {
            const _id = mongoSanitize(req.params.id);
            situacoes.findOne({_id}).exec()
                .then(situacao => res.json(situacao))
                .catch(erro => {
                    console.error(erro);
                    res.status(404).json(erro);
                });
        },
        listar : (req, res) => {
            situacoes.find().exec()
                .then(lista => res.json(lista))
                .catch(erro => {
                    console.error(erro);
                    res.status(500).json(erro);
                });
        },
        salvar : (req, res) => {
            req.body.slug = slug(req.body.descricao.toString().toLowerCase());
            req.body.datacadastro = new Date();
            situacoes.create(req.body)
                .then(situacao => res.status(201).json(situacao))
                .catch(erro => {
                    console.error(erro);
                    res.status(500).json(erro);
                });
        }
    }

}