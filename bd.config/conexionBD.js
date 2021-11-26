const mongoose = require("mongoose")

const conexionBD = async() => {

    await mongoose.connect(process.env.BASE_DATOS)
        .then(() => {
            console.log("conexion exitosa a la base de datos")
        })

}
module.exports = { conexionBD }