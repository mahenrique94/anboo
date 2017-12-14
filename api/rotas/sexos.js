module.exports = api => {

    const controller = api.controllers.sexos;
    const router = api.get("router");

    router.route("/sexos").delete(controller.deletar).get(controller.listar).post(controller.salvar).put(controller.atualizar);
    router.route("/sexos/:id").get(controller.editar);

}