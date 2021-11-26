const { get } = require("mongoose");
const { modeloVariables } = require("./variables")

const resolvers_variables = {
    Query: {
        listarTipo: async(parent, args, context) => {
            /*  let today = new Date();
             let fechaCompleta = today.toISOString().substring(0, 10).split("T")[0];
             let año = fechaCompleta.split("-")[0]
             let mes = fechaCompleta.split("-")[1]
             let dia = fechaCompleta.split("-")[2] */

            const listadoPorTipo = await modeloVariables.find({
                Nombre: args.Nombre,
                Instante: { $lt: Date.now() }
            })
            return listadoPorTipo
        },
        listarPorDia: async(parent, args, context) => {

            console.log(new Date(args.Dia).getDay())
            const listadoPorDia = await modeloVariables.find({
                Nombre: args.Nombre,
                Instante: {
                    $gte: new Date(args.Dia).getTime(),
                    $lt: new Date(args.Dia).getTime() + 86399000
                }
            })

            return listadoPorDia
        }
    },
    Mutation: {
        crearVariable: async(parent, args, context) => {
            const variableCreada = await modeloVariables.create({
                Nombre: args.Nombre,
                Valor: args.Valor,
                Unidad: args.Unidad,
                Instante: args.Instante
            })
            return variableCreada
        }
    }
}

module.exports = { resolvers_variables }