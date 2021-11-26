const { modeloUsuarios } = require("./usuarios")

async function GeneradorToken(payload) {
    const firma = await sign(payload, "colocarsecretoaqui", {
        expiresIn: '24h'
    })
    return firma
}

const resolver_usuarios = {
    Query: {
        listarUsuarios: async(parent, args, context) => {
            const listadoUsuarios = await modeloUsuarios.find()
            return listadoUsuarios
        },
        buscarUsuario: async(parent, args, context) => {
            if (args._id) {
                const usuarioEncontrado = await modeloUsuarios.findById({ _id: args._id })
                return usuarioEncontrado
            } else if (args.Correo) {
                const usuarioEncontrado = await modeloUsuarios.findOne({ Correo: args.Correo })
                return usuarioEncontrado
            }
        }
    },
    Mutation: {
        crearUsuario: async(parent, args, context) => {

            const usuarioCreado = await modeloUsuarios.create({
                Nombre: args.Nombre,
                Apellido: args.Apellido,
                Correo: args.Correo,
                Estado: args.Estado,
                Rol: args.Rol
            })
            return usuarioCreado
        },
        registrarUsuario: async(parent, args, context) => {

            const registroCreado = await modeloUsuarios.create({
                Nombre: args.Nombre,
                Apellido: args.Apellido,
                Correo: args.Correo,
            })

            const token = await GeneradorToken({...registroCreado._doc })

            return { Token: token }
        },
        loginUsuario: async(parent, args, context) => {

            const usuarioLogueado = await modeloUsuarios.findOne({ Correo: args.Correo });
            if (usuarioLogueado._doc.Correo) {

                const token = await GeneradorToken({...usuarioLogueado._doc })

                return { Token: token }
            }
        },
        refreshToken: async(parent, args, context) => {
            console.log('contexto', context);
            if (!context.userData) {
                return {
                    error: 'Token no Valido',
                };
            } else {
                return {
                    Token: GeneradorToken({
                        _id: context.userData._id,
                        Nombre: context.userData.Nombre,
                        Apellido: context.userData.Apellido,
                        Correo: context.userData.Correo,
                        Estado: context.userData.Estado,
                        Rol: context.userData.Rol
                    }),
                };
            }
        },
        editarUsuario: async(parent, args, context) => {

            const usuarioEditado = await modeloUsuarios.findOneAndUpdate({ _id: args._id }, {
                Nombre: args.Nombre,
                Apellido: args.Apellido,
                Correo: args.Correo,
                Estado: args.Estado,
                Rol: args.Rol
            })

            return usuarioEditado
        },
        eliminarUsuario: async(parent, args, context) => {

            if (args._id) {
                const usuarioEliminado = await modeloUsuarios.findById({ _id: args._id })
                return usuarioEliminado
            } else if (args.Correo) {
                const usuarioEliminado = await modeloUsuarios.findOne({ Correo: args.Correo })
                return usuarioEliminado
            }
        }
    }
}

module.exports = { resolver_usuarios }