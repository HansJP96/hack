const { resolver_usuarios } = require("../modelos/usuarios/resolvers_usuarios");
const { resolvers_variables } = require("../modelos/variables/resolvers_variables");

const resolvers = [resolver_usuarios, resolvers_variables]

module.exports = { resolvers }