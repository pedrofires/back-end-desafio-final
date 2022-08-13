const yup = require("./configuracoes");

const schemaCadastrarUsuario = yup.object().shape({
   nome: yup.string().required(),
   email: yup.string().email().required(),
   senha: yup.string().required().min(8).max(15),
});

const schemaLoginUsuario = yup.object().shape({
   email: yup.string().email().required(),
   senha: yup.string().required().min(8).max(15),
});

const schemaAtualizarUsuario = yup.object().shape({
   nome: yup.string().required(),
   email: yup.string().email().required(),
   senha: yup.string().min(8).max(15),
   cpf: yup.string().length(14).nullable(),
   telefone: yup.string().length(15).nullable(),
});

const schemaCadastrarCliente = yup.object().shape({
   nome: yup.string().required(),
   email: yup.string().email().required(),
   cpf: yup.string().required().length(14),
   telefone: yup.string().required().length(15),
   cep: yup.string().length(9).nullable(),
   logradouro: yup.string(),
   complemento: yup.string(),
   bairro: yup.string(),
   cidade: yup.string(),
   estado: yup.string(),
});

const schemaCadastrarCobrancas = yup.object().shape({
   id_cliente: yup.number().required(),
   descricao: yup.string(),
   status: yup.string().required(),
   valor: yup.number().required(),
   vencimento: yup.string().required(),
});

const schemaAtualizarCobranca = yup.object().shape({
   descricao: yup.string(),
   status: yup.string(),
   valor: yup.number(),
   vencimento: yup.string(),
});

module.exports = {
   schemaCadastrarUsuario,
   schemaLoginUsuario,
   schemaAtualizarUsuario,
   schemaCadastrarCliente,
   schemaCadastrarCobrancas,
   schemaAtualizarCobranca,
};
