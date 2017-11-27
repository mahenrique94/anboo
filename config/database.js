const mongoose = require("mongoose");

module.exports = database => {

    mongoose.connect(`mongodb://${process.env.mongoHost || "localhost"}/${database}`);

    mongoose.connection.on("connected", () => console.log(`[Mongoose] => Conectado no banco de dados: ${database}`));

    mongoose.connection.on("disconnected", () => console.log(`[Mongoose] => Desconectado do banco de dados: ${database}`));

    mongoose.connection.on("error", erro => console.log(`[Mongoose] => Erroo ao tentar conectar no banco de dados: ${erro}`));

    process.on("SIGINIT", () => {
        mongoose.connection.close(() => {
            console.log(`[Mongoose] => Desconectado do banco ${database} por fim da aplicação`);
            process.exit(0);
        });
    });

}