module.exports = api => {

    const controller = api.controllers.situacoes;
    const router = api.get("router");

    router.route("/situacoes").delete(controller.deletar).get(controller.listar).post(controller.salvar).put(controller.atualizar);
    router.route("/situacoes/:id").get(controller.editar);

}