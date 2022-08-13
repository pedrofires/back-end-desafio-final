const knex = require("../BancoDeDados/conexao");

const {
   schemaCadastrarCobrancas,
   schemaAtualizarCobranca,
} = require("../Validacoes/schemas");

const listarCobrancas = async (req, res) => {
   try {
      await knex.raw(
         `UPDATE cobrancas 
      SET status = 'Vencida' 
      WHERE vencimento::date < NOW()::date 
      AND status != 'Pago';`
      );

      const listaCobrancas = await knex("cobrancas")
         .join("clientes", "clientes.id", "=", "cobrancas.id_cliente")
         .select("cobrancas.*", "clientes.nome")
         .orderBy("id");

      return res.status(200).json(listaCobrancas);
   } catch (error) {
      return res.status(500).json({ mensagem: error.message });
   }
};

const obterResumoCobrancas = async (req, res) => {
   try {
      await knex.raw(
         `UPDATE cobrancas 
      SET status = 'Vencida' 
      WHERE vencimento::date < now()::date 
      AND status != 'Pago';`
      );

      const listarCobrancas = await knex("cobrancas")
         .join("clientes", "clientes.id", "=", "cobrancas.id_cliente")
         .select(
            "cobrancas.id",
            "cobrancas.valor",
            "cobrancas.status",
            "clientes.nome"
         )
         .orderBy("id");

      if (!listarCobrancas)
         return res
            .status(404)
            .json({ mensagem: "Não foi possível encontrar nenhuma cobrança" });

      const cobrancasPagas = [];
      const cobrancasPendentes = [];
      const cobrancasVencidas = [];

      let valorTotalPagos = 0;
      let valorTotalPendentes = 0;
      let valorTotalVencidos = 0;

      listarCobrancas.forEach((cobranca) => {
         if (cobranca.status === "Pago") {
            cobrancasPagas.push(cobranca);
            valorTotalPagos += Number(cobranca.valor);
         }
         if (cobranca.status === "Pendente") {
            cobrancasPendentes.push(cobranca);
            valorTotalPendentes += Number(cobranca.valor);
         }
         if (cobranca.status === "Vencida") {
            cobrancasVencidas.push(cobranca);
            valorTotalVencidos += Number(cobranca.valor);
         }
      });
      const resposta = {
         CobrancasPagas: {
            lista: cobrancasPagas,
            total: valorTotalPagos,
            quantidade: cobrancasPagas.length,
         },
         CobrancasVencidas: {
            lista: cobrancasVencidas,
            total: valorTotalVencidos,
            quantidade: cobrancasVencidas.length,
         },
         CobrancasPendentes: {
            lista: cobrancasPendentes,
            total: valorTotalPendentes,
            quantidade: cobrancasPendentes.length,
         },
      };

      return res.status(200).json(resposta);
   } catch (error) {
      return res.status(500).json({ mensagem: error.message });
   }
};

const listarCobrancasDoCliente = async (req, res) => {
   const { id } = req.params;

   if (!id) {
      return res.status(400).json({ mensagem: "Id não informado!" });
   }

   try {
      await knex.raw(
         `UPDATE cobrancas 
      SET status = 'Vencida' 
      WHERE vencimento::date < now()::date 
      AND status != 'Pago';`
      );
      const cobranca = await knex("cobrancas").where("id_cliente", id);
      return res.status(200).json(cobranca);
   } catch (error) {
      return res.status(500).json({ mensagem: error.message });
   }
};

const editarCobrancas = async (req, res) => {
   const { id } = req.params;
   const { descricao, status, valor, vencimento } = req.body;

   if (!id) {
      return res.status(400).json({ mensagem: "Id não informado!" });
   }

   try {
      await schemaAtualizarCobranca.validate(req.body);

      const cobrancaAtualizada = await knex("cobrancas")
         .update({ descricao, status, valor, vencimento })
         .where("id", id);

      if (!cobrancaAtualizada) {
         return res
            .status(200)
            .json({ mensagem: "Não foi possível atualizar a cobrança" });
      }

      return res
         .status(200)
         .json({ mensagem: "Cobrança atualizada com sucesso." });
   } catch (error) {
      return res.status(500).json({ mensagem: error.message });
   }
};

const excluirCobrancas = async (req, res) => {
   const { id } = req.params;

   if (!id) {
      return res.status(400).json({ mensagem: "Id não informado!" });
   }

   try {
      const consultarCobranca = await knex("cobrancas").where("id", id).first();
      if (!consultarCobranca) {
         return res
            .status(404)
            .json({ mensagem: "Não foi possível encontrar a cobrança!" });
      }
      const dataAtual = new Date().setHours(0, 0, 0, 0);

      const cobrancaPodeSerExcluida =
         consultarCobranca.vencimento.setHours(0, 0, 0, 0) >= dataAtual;

      if (consultarCobranca.status === "Pendente" && cobrancaPodeSerExcluida) {
         const cobrancaExcluida = await knex("cobrancas").del().where("id", id);
         if (!cobrancaExcluida) {
            return res
               .status(400)
               .json({ mensagem: "Não foi possível exclir a cobrança!" });
         }
         return res
            .status(200)
            .json({ mensagem: "Cobrança excluída com sucesso." });
      }

      return res.status(406).json({
         mensagem: "Esta cobranças não pode ser excluída!",
      });
   } catch (error) {
      return res.status(500).json({ mensagem: error.message });
   }
};

const adicionarCobranca = async (req, res) => {
   const { id_cliente, descricao, status, valor, vencimento } = req.body;

   try {
      await schemaCadastrarCobrancas.validate(req.body);

      const cobranca = await knex("cobrancas")
         .insert({
            id_cliente,
            descricao,
            status,
            valor,
            vencimento,
         })
         .returning("*");

      if (!cobranca) {
         return res
            .status(500)
            .json({ mensagem: "A cobrança não foi cadastrada." });
      }

      return res.status(201).json(cobranca);
   } catch (error) {
      return res.status(500).json({ mensagem: error.message });
   }
};

module.exports = {
   listarCobrancasDoCliente,
   editarCobrancas,
   excluirCobrancas,
   adicionarCobranca,
   listarCobrancas,
   obterResumoCobrancas,
};
