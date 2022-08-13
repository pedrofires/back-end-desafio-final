const verificarStatusCliente = (listaClientes, listarStatus) => {
  for (let i = 0; i < listarStatus.length; i++) {
    const cobranca = listarStatus[i];
    if (new Date() > cobranca.vencimento) {
      for (let z = 0; z < listaClientes.length; z++) {
        if (listaClientes[z].id == cobranca.id_cliente) {
          listaClientes[z].status = "Inadimplente";
        }
      }
    }
  }
  return listaClientes;
};

module.exports = verificarStatusCliente;
