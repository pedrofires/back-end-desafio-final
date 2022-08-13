const knex = require("../BancoDeDados/conexao");
const jwt = require("jsonwebtoken");

const verificarLogin = async (req, res, next) => {
   const { authorization } = req.headers;

   if (!authorization) {
      return res
         .status(401)
         .json({
            mensagem:
               "Para acessar este recurso um token de autenticação válido deve ser enviado.",
         });
   }

   try {
      const token = authorization.replace("Bearer ", "").trim();
      const { id } = await jwt.verify(token, process.env.SEGREDO_JWT);

      const usuarioEncontrado = await knex("usuarios")
         .select("id", "nome", "email", "cpf", "telefone")
         .where("id", id)
         .first();

      if (!usuarioEncontrado) {
         return res
            .status(404)
            .json({ mensagem: "O usuário não foi encontrado." });
      }

      req.usuario = usuarioEncontrado;

      next();
   } catch (error) {
      return res.status(500).json(error.message);
   }
};

module.exports = { verificarLogin };
