const knex = require("../BancoDeDados/conexao");
const securePassword = require("secure-password");
const pwd = securePassword();
const {
  schemaCadastrarUsuario,
  schemaAtualizarUsuario,
} = require("../Validacoes/schemas");

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    await schemaCadastrarUsuario.validate(req.body);

    const verficacaoSeEmailExiste = await knex("usuarios")
      .where("email", email)
      .first();

    if (verficacaoSeEmailExiste) {
      return res.status(400).json({ mensagem: "O email informado já existe" });
    }

    const hash = (await pwd.hash(Buffer.from(senha))).toString("hex");

    const inserirUsuario = await knex("usuarios").insert({
      nome,
      email,
      senha: hash,
    });

    console.log(inserirUsuario)
    
    if (!inserirUsuario) {
      return res
        .status(500)
        .json({ mensagem: "O usuário não foi cadastrado." });
    }

    const usuarioCadastrado = await knex("usuarios")
      .select("id", "nome", "email")
      .where("email", email)
      .first();

    return res.status(201).json(usuarioCadastrado);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const atualizarUsuario = async (req, res) => {
  const { usuario } = req;
  let { nome, email, senha, cpf, telefone } = req.body;

  try {
    await schemaAtualizarUsuario.validate(req.body);

    const verificarSeUsuarioExiste = await knex("usuarios")
      .where("id", usuario.id)
      .first();

    if (!verificarSeUsuarioExiste) {
      return res
        .status(400)
        .json({ mensagem: "Não foi posssível encontrar esse usuário" });
    }

    if (email !== usuario.email) {
      const verificarSeEmailExiste = await knex("usuarios")
        .where({ email })
        .first();

      if (verificarSeEmailExiste) {
        return res
          .status(404)
          .json({ mensagem: "O e-mail informado já existe." });
      }
    }

    if (senha) {
      senha = (await pwd.hash(Buffer.from(senha))).toString("hex");
    }

    const usuarioAtualizado = await knex("usuarios")
      .where("id", usuario.id)
      .update({ nome, email, senha, cpf, telefone });

    if (!usuarioAtualizado) {
      return res
        .status(400)
        .json({ mensagem: "Não foi posssível atualizar esse usuário" });
    }

    return res.status(200).json({ mensagem: "O usuário foi atualizado" });
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};
const obterPerfilDoUsuario = (req, res) => {
  return res.status(200).json(req.usuario);
};
module.exports = {
  cadastrarUsuario,
  atualizarUsuario,
  obterPerfilDoUsuario,
};
