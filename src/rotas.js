const express = require("express");
const rotas = express();

const {
   cadastrarUsuario,
   atualizarUsuario,
   obterPerfilDoUsuario,
} = require("./Controladores/usuarios");

const { verificarLogin } = require("./Intermediario/verificarLogin");

const { loginUsuario } = require("./Controladores/login");

const {
   cadastrarCliente,
   listarClientes,
   excluirCliente,
   editarCliente,
   obterCliente,
   obterResumoClientes,
} = require("./Controladores/clientes");

const {
   adicionarCobranca,
   listarCobrancas,
   editarCobrancas,
   excluirCobrancas,
   listarCobrancasDoCliente,
   obterResumoCobrancas,
} = require("./Controladores/cobrancas");

rotas.post("/usuarios", cadastrarUsuario);
rotas.post("/login", loginUsuario);

rotas.use(verificarLogin);

rotas.put("/usuario", atualizarUsuario);
rotas.get("/usuario", obterPerfilDoUsuario);

rotas.post("/cliente", cadastrarCliente);
rotas.get("/clientes", listarClientes);
rotas.delete("/excluircliente/:id", excluirCliente);
rotas.put("/cliente/:id", editarCliente);
rotas.get("/cliente/:id", obterCliente);
rotas.get("/resumo/clientes", obterResumoClientes);

rotas.post("/cobranca", adicionarCobranca);
rotas.get("/cobrancas", listarCobrancas);
rotas.get("/cobrancas/:id", listarCobrancasDoCliente);
rotas.put("/cobrancas/:id", editarCobrancas);
rotas.delete("/cobrancas/:id", excluirCobrancas);
rotas.get("/resumo/cobrancas", obterResumoCobrancas);

module.exports = rotas;
