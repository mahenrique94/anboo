module.exports = api => {

    const controller = api.controllers.generos;
    const router = api.get("router");

    router.route("/generos").delete(controller.deletar).get(controller.listar).post(controller.salvar).put(controller.atualizar);
    router.route("/generos/:id").get(controller.editar);

}