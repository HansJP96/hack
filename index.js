const express = require("express")
const cors = require("cors")
const { conexionBD } = require("./bd.config/conexionBD")
const { ApolloServer } = require("apollo-server-express")
const { tipos } = require("./graphql/tipos")
const { resolvers } = require("./graphql/resolvers")

require("dotenv").config()

const app = express()
const port = process.env.PORT || 3100

const lista = ["http://localhost:3100",
    "http://localhost:3100/graphql",
    "https://studio.apollographql.com"
]

const corsOptions = {
    origin: function(origin, callback) {
        console.log(origin)
        if (lista.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors())
app.use(express.json())

/* app.get("/", (req, res) => {
    res.send(fecha)
}) */

const getUserData = (token) => {
    const verificacion = validateToken(token.split(' ')[1]);
    if (verificacion.data) {
        return verificacion.data;
    } else {
        return null;
    }
};


const server = new ApolloServer({
    typeDefs: tipos,
    resolvers: resolvers,
    context: ({ req }) => {
        const token = req.headers ? req.headers.authorization : null
        if (token) {
            const userData = getUserData(token);
            if (userData) {
                return { userData };
            }
        }
        return null;
    },
})

app.listen(port, () => {
    conexionBD()
        .then(async() => {
            await server.start()
            server.applyMiddleware({ app })
            console.log("conexion al servidor en el puerto => ", port)

        })
        .catch(e => console.log("error conectando al servidor =>", e))
})