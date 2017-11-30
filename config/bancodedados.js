const mongoose = require("mongoose");

module.exports = banco => {

    mongoose.connect(`mongodb://${process.env.mongoUrl || "localhost"}/${banco}`);

    mongoose.connection.on("connected", () => console.log(`[Mongoose] => Conectado no banco de dados: ${banco}`));

    mongoose.connection.on("disconnected", () => console.log(`[Mongoose] => Desconectado do banco de dados: ${banco}`));

    mongoose.connection.on("error", erro => console.log(`[Mongoose] => Erroo ao tentar conectar no banco de dados: ${banco}`));

    process.on("SIGINIT", () => {
        mongoose.connection.close(() => {
            console.log(`[Mongoose] => Desconectado do banco ${banco} por fim da aplicação`);
            process.exit(0);
        });
    });

}