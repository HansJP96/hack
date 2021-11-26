const { tipo_usuarios } = require("../modelos/usuarios/tipo_usuarios");
const { tipo_variables } = require("../modelos/variables/tipo_variables");

const tipos = [tipo_usuarios, tipo_variables]

module.exports = { tipos }