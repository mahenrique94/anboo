module.exports = api => {

    const controller = api.controllers.tipos;
    const router = api.get("router");

    router.route("/tipos").delete(controller.deletar).get(controller.listar).post(controller.salvar).put(controller.atualizar);
    router.route("/tipos/:id").get(controller.editar);

}