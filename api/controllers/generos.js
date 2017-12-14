var mongoSanitize = require("mongo-sanitize");
const slug = require("slug");

module.exports = api => {

    const generos = api.modelos.generos;

    return {
        atualizar : (req, res) => {
            const _id = mongoSanitize(req.body._id);
            req.body.slug = slug(req.body.descricao.toString().toLowerCase());
            req.body.dataatualizacao = new Date();
            generos.findByIdAndUpdate(_id, req.body).exec()
                .then(tipo => res.json(tipo))
                .catch(erro => {
                    console.error(erro);
                    res.status(500).json(erro);
                });
        },
        deletar : (req, res) => {
            const _id = mongoSanitize(req.body._id);
            generos.remove({_id}).exec()
                .then(() => res.status(204).end())
                .catch(erro => {
                    console.error(erro);
                    res.status(500).json(erro);
                });
        },
        editar : (req, res) => {
            const _id = mongoSanitize(req.params.id);
            generos.findOne({_id}).exec()
                .then(tipo => res.json(tipo))
                .catch(erro => {
                    console.error(erro);
                    res.status(404).json(erro);
                });
        },
        listar : (req, res) => {
            generos.find().exec()
                .then(lista => res.json(lista))
                .catch(erro => {
                    console.error(erro);
                    res.status(500).json(erro);
                });
        },
        salvar : (req, res) => {
            req.body.slug = slug(req.body.descricao.toString().toLowerCase());
            req.body.datacadastro = new Date();
            generos.create(req.body)
                .then(tipo => res.status(201).json(tipo))
                .catch(erro => {
                    console.error(erro);
                    res.status(500).json(erro);
                });
        }
    }

}