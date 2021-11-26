const { gql } = require("apollo-server-express")

const tipo_variables = gql `

    scalar Date

    enum enum_Unidad{
        C
        g_m3
    }

    enum enum_Nombre{
        TEMPERATURA
        HUMEDAD_AIRE 
        pH 
        HUMEDAD_SUELO
    }

    type Variable{
        _id: ID!
        Nombre: String!
        Valor: Float!
        Unidad: String!
        Instante: Date!
    }

    type Query{
        listarTipo(Nombre: enum_Nombre!): [Variable] #el dia por defecto es Date.now()
        listarPorDia(Nombre: enum_Nombre!, Dia: Date): [Variable]
    }

    type Mutation{
        crearVariable(
            Nombre: enum_Nombre!
            Valor: Float!
            Unidad: enum_Unidad!
            Instante: Date!
        ): Variable
    }
`

module.exports = { tipo_variables }