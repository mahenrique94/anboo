module.exports = api => {

    const controller = api.controllers.usuarios;
    const router = api.get("router");

    router.route("/usuarios").delete(controller.deletar).get(controller.listar).post(controller.salvar).put(controller.atualizar);
    router.route("/usuarios/:id").get(controller.editar);

}