const { Schema, model } = require("mongoose")

const esquemaUsuarios = new Schema({

    Nombre: {
        type: String,
        required: true
    },
    Apellido: {
        type: String,
        required: true
    },
    Correo: {
        type: String,
        unique: true,
        required: true
    },
    Estado: {
        type: String,
        enum: ["AUTORIZADO, NO_AUTORIZADO"],
        default: "NO_AUTORIZADO"
    },
    Rol: {
        type: String,
        required: true,
        enum: ["ADMINISTRADOR", "USUARIO"],
        default: "USUARIO"
    }
})

const modeloUsuarios = model("usuario", esquemaUsuarios)

module.exports = { modeloUsuarios }