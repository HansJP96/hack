const { Schema, model } = require("mongoose")

const esquemaVariables = new Schema({

    Nombre: {
        type: String,
        enum: ["TEMPERATURA", "HUMEDAD_AIRE", "pH", "HUMEDAD_SUELO"],
        required: true
    },
    Valor: {
        type: Number,
        required: true
    },
    Unidad: {
        type: String,
        enum: ["C", "g_m3"],
        required: true
    },
    Instante: {
        type: Date,
        required: true
    }
})

const modeloVariables = model("variable", esquemaVariables)

module.exports = { modeloVariables }