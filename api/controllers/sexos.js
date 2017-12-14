var mongoSanitize = require("mongo-sanitize");
const slug = require("slug");

module.exports = api => {

    const sexos = api.modelos.sexos;

    return {
        atualizar : (req, res) => {
            const _id = mongoSanitize(req.body._id);
            req.body.slug = slug(req.body.descricao.toString().toLowerCase());
            req.body.dataatualizacao = new Date();
            sexos.findByIdAndUpdate(_id, req.body).exec()
                .then(sexo => res.json(sexo))
                .catch(erro => {
                    console.error(erro);
                    res.status(500).json(erro);
                });
        },
        deletar : (req, res) => {
            const _id = mongoSanitize(req.body._id);
            sexos.remove({_id}).exec()
                .then(() => res.status(204).end())
                .catch(erro => {
                    console.error(erro);
                    res.status(500).json(erro);
                });
        },
        editar : (req, res) => {
            const _id = mongoSanitize(req.params.id);
            sexos.findOne({_id}).exec()
                .then(sexo => res.json(sexo))
                .catch(erro => {
                    console.error(erro);
                    res.status(404).json(erro);
                });
        },
        listar : (req, res) => {
            sexos.find().exec()
                .then(lista => res.json(lista))
                .catch(erro => {
                    console.error(erro);
                    res.status(500).json(erro);
                });
        },
        salvar : (req, res) => {
            req.body.slug = slug(req.body.descricao.toString().toLowerCase());
            req.body.datacadastro = new Date();
            sexos.create(req.body)
                .then(sexo => res.status(201).json(sexo))
                .catch(erro => {
                    console.error(erro);
                    res.status(500).json(erro);
                });
        }
    }

}