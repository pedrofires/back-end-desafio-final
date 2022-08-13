const knex = require("../BancoDeDados/conexao");
const { schemaCadastrarCliente } = require("../Validacoes/schemas");

const cadastrarCliente = async (req, res) => {
   const {
      nome,
      email,
      cpf,
      telefone,
      cep,
      logradouro,
      complemento,
      bairro,
      cidade,
      estado,
   } = req.body;

   try {
      await schemaCadastrarCliente.validate(req.body);

      const verficacaoSeEmailExiste = await knex("clientes")
         .where("email", email)
         .first();

      if (verficacaoSeEmailExiste) {
         return res
            .status(400)
            .json({ mensagem: "O email informado já existe" });
      }

      const verficacaoSeTelefoneExiste = await knex("clientes")
         .where("telefone", telefone)
         .first();

      if (verficacaoSeTelefoneExiste) {
         return res
            .status(400)
            .json({ mensagem: "O telefone informado já existe" });
      }

      const verficacaoSeCpfExiste = await knex("clientes")
         .where("cpf", cpf)
         .first();

      if (verficacaoSeCpfExiste) {
         return res.status(400).json({ mensagem: "O CPF informado já existe" });
      }

      const inserirCliente = await knex("clientes").insert({
         nome,
         email,
         cpf,
         telefone,
         cep,
         logradouro,
         complemento,
         bairro,
         cidade,
         estado,
      });

      if (!inserirCliente) {
         return res
            .status(500)
            .json({ mensagem: "O cliente não foi cadastrado." });
      }

      const clienteCadastrado = await knex("clientes")
         .where("email", email)
         .first();

      return res.status(201).json(clienteCadastrado);
   } catch (error) {
      return res.status(500).json({ mensagem: error.message });
   }
};

const listarClientes = async (req, res) => {
   try {
      await knex.raw(`
      update clientes set status = 'Em dia'
         from cobrancas
	      where clientes.id = cobrancas.id_cliente;
      `);
      await knex.raw(`
        update clientes set status = 'Inadimplente'
        from cobrancas
        where clientes.id = cobrancas.id_cliente
          and cobrancas.status = 'Vencida';
      `);

      const listaClientes = await knex("clientes").orderBy("id");
      return res.status(200).json(listaClientes);
   } catch (error) {
      return res.status(500).json({ mensagem: error.message });
   }
};

const excluirCliente = async (req, res) => {
   const { id } = req.params;

   if (!id) {
      return res.status(400).json({ mensagem: "Id não informado!" });
   }

   try {
      const clienteExcluido = await knex("clientes").del().where("id", id);

      if (!clienteExcluido) {
         return res
            .status(400)
            .json({ mensagem: "Não foi possível exclir o cliente!" });
      }

      return res
         .status(200)
         .json({ mensagem: "Cliente excluido com sucesso." });
   } catch (error) {
      return res.status(500).json({ mensagem: error.message });
   }
};

const editarCliente = async (req, res) => {
   const { id } = req.params;
   const {
      nome,
      email,
      cpf,
      telefone,
      cep,
      logradouro,
      complemento,
      bairro,
      cidade,
      estado,
   } = req.body;

   try {
      await schemaCadastrarCliente.validate(req.body);

      const cliente = await knex("clientes").where("id", id).first();

      if (!cliente) {
         return res.status(404).json({ mensagem: "Cliente não encontrado!" });
      }

      if (cliente.email !== email) {
         const verficacaoSeEmailExiste = await knex("clientes")
            .where("email", email)
            .first();

         if (verficacaoSeEmailExiste) {
            return res
               .status(400)
               .json({ mensagem: "O email informado já existe" });
         }
      }

      if (cliente.telefone !== telefone) {
         const verficacaoSeTelefoneExiste = await knex("clientes")
            .where("telefone", telefone)
            .first();

         if (verficacaoSeTelefoneExiste) {
            return res
               .status(400)
               .json({ mensagem: "O telefone informado já existe" });
         }
      }

      if (cliente.cpf !== cpf) {
         const verficacaoSeCpfExiste = await knex("clientes")
            .where("cpf", cpf)
            .first();

         if (verficacaoSeCpfExiste) {
            return res
               .status(400)
               .json({ mensagem: "O CPF informado já existe" });
         }
      }

      const clienteAtualizado = await knex("clientes")
         .update({
            nome,
            email,
            cpf,
            telefone,
            cep,
            logradouro,
            complemento,
            bairro,
            cidade,
            estado,
         })
         .where("id", id);

      if (!clienteAtualizado) {
         return res.status(500).json({
            mensagem: "Não foi possivel atualizar os dados do Cliente.",
         });
      }
      return res.status(200).json({ mensagem: "Cliente editado com sucesso." });
   } catch (error) {
      return res.status(500).json({ mensagem: error.message });
   }
};

const obterCliente = async (req, res) => {
   const { id } = req.params;

   if (!id) {
      return res.status(400).json({ mensagem: "Id não informado!" });
   }

   try {
      const cliente = await knex("clientes").where("id", id).first();

      if (!cliente) {
         return res
            .status(400)
            .json({ mensagem: "Não foi possível obter o cliente!" });
      }

      return res.status(200).json(cliente);
   } catch (error) {
      return res.status(500).json({ mensagem: error.message });
   }
};

const obterResumoClientes = async (req, res) => {
   try {
      await knex.raw(`
      update clientes set status = 'Em dia'
         from cobrancas
	      where clientes.id = cobrancas.id_cliente;
      `);
      await knex.raw(`
        update clientes set status = 'Inadimplente'
        from cobrancas
        where clientes.id = cobrancas.id_cliente
         and cobrancas.status = 'Vencida';
      `);

      const clientes = await knex("clientes").select(
         "nome",
         "id",
         "cpf",
         "status"
      );

      const clientesEmDia = [];
      const clientesInadimplentes = [];

      clientes.forEach((cliente) => {
         if (cliente.status === "Em dia") {
            clientesEmDia.push(cliente);
         } else if (cliente.status === "Inadimplente") {
            clientesInadimplentes.push(cliente);
         }
      });

      const resposta = {
         clientesEmDia: {
            lista: clientesEmDia,
            quantidade: clientesEmDia.length,
         },
         clientesInadimplentes: {
            lista: clientesInadimplentes,
            quantidade: clientesInadimplentes.length,
         },
      };
      return res.status(200).json(resposta);
   } catch (error) {
      return res.status(500).json({ mensagem: error.message });
   }
};

module.exports = {
   cadastrarCliente,
   listarClientes,
   excluirCliente,
   editarCliente,
   obterCliente,
   obterResumoClientes,
};
