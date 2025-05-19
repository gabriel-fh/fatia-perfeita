import { database } from "@/src/setup/FirebaseSetup";
import { get, push, ref, set } from "firebase/database";
import { Pedido } from "../Pedido";
import { PedidoDTO } from "../PedidoDTO";
import DaoEndereco from "./DaoEndereco";
import DaoUsuario from "./DaoUsuario";
import ProdutoPedido from "../ProdutoPedido";

export default class DaoPedido {
  async realizarPedido(pedido: Pedido) {
    try {
      const dbRefNovoPedido = ref(database, `pedidos`);
      const novoPedidoRef = push(dbRefNovoPedido);
      const pedidoId = novoPedidoRef.key;

      if (!pedidoId) throw new Error("Erro ao gerar ID do pedido");

      const produtosSerializados = pedido.getProdutos().map((produto) => ({
        id: produto.getCodigo(),
        nome: produto.getNome(),
        imagem: produto.getImagem(),
        preco: produto.getPrecoBase(),
        quantidade: produto.getQuantidade(),
        descricao: produto.getDescricao(),
        tipo: produto.getTipo(),
        situacao: produto.getSituacao(),
      }));

      const pedidoParaSalvar = {
        codigo: pedidoId,
        data: pedido.getData().toISOString(),
        subtotal: pedido.getSubtotal(),
        taxaServico: pedido.getTaxaServico(),
        total: pedido.getTotal(),
        situacao: pedido.getSituacao(),
        metodoPagamento: pedido.getMetodoPagamento(),
        usuario: pedido.getUser().getUid(),
        endereco: pedido.getEndereco().getId(),
        produtos: produtosSerializados,
      };

      const dbRefPedidoFinal = ref(database, `/pedidos/${pedidoId}`);
      await set(dbRefPedidoFinal, pedidoParaSalvar);

      return pedidoId
    } catch (error: any) {
      console.log("#ERRO incluir:", error.code, error.message);
    }
  }

  async obterPedidoPorId(pedidoId: string) {
    try {
      const dbRefPedido = ref(database, `/pedidos/${pedidoId}`);
      const snapshot = await get(dbRefPedido);

      if (!snapshot.exists()) {
        console.log("Pedido não encontrado.");
        return null;
      }

      const data = snapshot.val();

      const enderecoDAO = new DaoEndereco();
      const endereco = await enderecoDAO.obterEnderecoPorId(data.endereco);

      const usuarioDAO = new DaoUsuario();
      const usuario = await usuarioDAO.obterUsuarioPeloUID(data.usuario);

      if (endereco && usuario) {
        const pedido = new PedidoDTO(
          data.subtotal,
          data.taxaServico,
          data.total,
          data.situacao,
          data.metodoPagamento,
          usuario,
          endereco,
          data.produtos.map((produto: any) =>
            new ProdutoPedido(
              produto.id,
              produto.nome,
              produto.imagem,
              produto.descricao || "",         // se descrição não estiver salva
              produto.tipo || "PIZZA",   // ajuste conforme seu enum
              produto.preco,
              produto.situacao || "ATIVO",     // ajuste conforme sua lógica
              produto.quantidade
            )
          ),
          new Date(data.data),
          pedidoId,
        );

        return pedido;
      } else {
        console.log("Endereço ou usuário inválido.");
        return null;
      }
    } catch (error: any) {
      console.error("Erro ao obter pedido:", error.message);
      throw error;
    }
  }


  async alterarStatus(pedidoId: string, novoStatus: string) {
    const dbRefPedido = ref(database, `/pedidos/${pedidoId}`);
    await set(dbRefPedido, { status: novoStatus });
  }

  async obterPedidosDoUsuario(uid: string): Promise<PedidoDTO[]> {
    const dbRefPedidos = ref(database, `/pedidos`);
    const snapshot = await get(dbRefPedidos);
    const pedidos = snapshot.val();

    const pedidosArray: PedidoDTO[] = [];
    const enderecoDAO = new DaoEndereco();
    const usuarioDAO = new DaoUsuario();

    for (const pedidoId in pedidos) {
      const data = pedidos[pedidoId];

      if (data.usuario !== uid) continue; // 🔍 filtra pelo UID do usuário

      const endereco = await enderecoDAO.obterEnderecoPorId(data.endereco);
      const usuario = await usuarioDAO.obterUsuarioPeloUID(data.usuario);

      if (endereco && usuario) {
        const pedido = new PedidoDTO(
          data.subtotal,
          data.taxaServico,
          data.total,
          data.situacao,
          data.metodoPagamento,
          usuario,
          endereco,
          data.produtos.map((produto: any) =>
            new ProdutoPedido(
              produto.id,
              produto.nome,
              produto.imagem,
              produto.descricao || "",         // se descrição não estiver salva
              produto.tipo || "PIZZA",   // ajuste conforme seu enum
              produto.preco,
              produto.situacao || "ATIVO",     // ajuste conforme sua lógica
              produto.quantidade
            )
          ),
          new Date(data.data),
          pedidoId,
        );
        pedidosArray.push(pedido);
      }
    }

    return pedidosArray;
  }


  async obterPedidos() {
    const dbRefPedidos = ref(database, `/pedidos`);
    const snapshot = await get(dbRefPedidos);
    const pedidos = snapshot.val();

    const pedidosArray: PedidoDTO[] = [];
    const enderecoDAO = new DaoEndereco();
    const usuarioDAO = new DaoUsuario();

    for (const pedidoId in pedidos) {
      const data = pedidos[pedidoId];

      const endereco = await enderecoDAO.obterEnderecoPorId(data.endereco);
      const usuario = await usuarioDAO.obterUsuarioPeloUID(data.usuario);

      if (endereco && usuario) {
        const pedido = new PedidoDTO(
          data.subtotal,
          data.taxaServico,
          data.total,
          data.situacao,
          data.metodoPagamento,
          usuario,
          endereco,
          data.produtos.map((produto: any) =>
            new ProdutoPedido(
              produto.id,
              produto.nome,
              produto.imagem,
              produto.descricao || "",         // se descrição não estiver salva
              produto.tipo || "PIZZA",   // ajuste conforme seu enum
              produto.preco,
              produto.situacao || "ATIVO",     // ajuste conforme sua lógica
              produto.quantidade
            )
          ),
          new Date(data.data),
          pedidoId,
        );
        pedidosArray.push(pedido);
      }
    }

    return pedidosArray;
  }
}
