const knex = require("../BancoDeDados/conexao");
const jwt = require("jsonwebtoken");
const securePassword = require("secure-password");
const pwd = securePassword();
const { schemaLoginUsuario } = require("../Validacoes/schemas");

const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  try {
    await schemaLoginUsuario.validate(req.body);

    const verificacaoSeUsuarioExiste = await knex("usuarios")
      .where("email", email)
      .first();

    if (!verificacaoSeUsuarioExiste) {
      return res
        .status(400)
        .json({ mensagem: "O email ou a senha estão incorretos" });
    }

    const verificarSenha = await pwd.verify(
      Buffer.from(senha),
      Buffer.from(verificacaoSeUsuarioExiste.senha, "hex")
    );
    switch (verificarSenha) {
      case securePassword.INVALID_UNRECOGNIZED_HASH:
      case securePassword.INVALID:
        return res.status(400).json({ mensagem: "Email ou senha incorretos." });
      case securePassword.VALID:
        break;
      case securePassword.VALID_NEEDS_REHASH:
        try {
          const hash = (await pwd.hash(Buffer.from(senha))).toString("hex");
          await knex("usuarios").update({ senha: hash }).where("email", email);
        } catch {
          return res.status(500).json({ mensagem: error.message });
        }
        break;
    }

    const token = jwt.sign(
      {
        id: verificacaoSeUsuarioExiste.id,
        nome: verificacaoSeUsuarioExiste.nome,
        email: verificacaoSeUsuarioExiste.email,
      },
      process.env.SEGREDO_JWT,
      {
        expiresIn: "1h",
      }
    );

    const usuarioRetornado = {
      usuario: {
        id: verificacaoSeUsuarioExiste.id,
        nome: verificacaoSeUsuarioExiste.nome,
        email: verificacaoSeUsuarioExiste.email,
      },
      token: token,
    };

    return res.status(200).json(usuarioRetornado);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

module.exports = { loginUsuario };
