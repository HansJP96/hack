const { gql } = require("apollo-server-express")

const tipo_usuarios = gql `

    enum enum_EstadoUsuarios {
        AUTORIZADO
        NO_AUTORIZADO
    }
    enum enum_Rol{
        ADMINISTRADOR
        USUARIO
    }

    type Usuario {
        _id: ID!
        Nombre: String!
        Apellido: String!
        Correo: String!
        Estado: enum_EstadoUsuarios!
        Rol: enum_Rol!
    }

    type Token{
        Token: String!
    }

    type Query {
        listarUsuarios: [Usuario]
        buscarUsuario(_id: String, Correo: String): Usuario
    }

    type Mutation{
        crearUsuario(
            Nombre: String!
            Apellido: String!
            Correo: String!
            Estado: enum_EstadoUsuarios!
            Rol: enum_Rol!
        ): Usuario

        registrarUsuario(
            Nombre: String!
            Apellido: String!
            Correo: String!
        ): Token

        loginUsuario(correo: String!): Token

        refreshToken: Token
        
        editarUsuario(
            _id: String!
            Nombre: String!
            Apellido: String!
            Correo: String!
            Estado: enum_EstadoUsuarios!
            Rol: enum_Rol!
        ): Usuario

        eliminarUsuario(_id: String, Correo: String): Usuario
    }
`

module.exports = { tipo_usuarios }