import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProdutoPedido from "../model/ProdutoPedido";
import type { PersistStorage } from "zustand/middleware";
import Produto from "../model/Produto";

type CartStore = {
  cart: ProdutoPedido[];
  addProductToCart: (product: Produto, quantidade: number) => void;
  decreaseProductQuantity: (product: Produto, quantidade: number) => void;
  removeProductFromCart: (codigo: string) => void;
  clearCartItems: () => void;
  getTotalItemsInCart: () => number;
  getProductByCodigo: (codigo: string) => ProdutoPedido | undefined;
  getCartValue: () => number;
};

// ✅ Custom storage com suporte à re-hidratação do ProdutoPedido
const customStorage: PersistStorage<CartStore> = {
  getItem: async (name) => {
    const str = await AsyncStorage.getItem(name);
    if (!str) return null;

    const parsed = JSON.parse(str);

    // Reidrata ProdutoPedido
    if (parsed.state?.cart) {
      parsed.state.cart = parsed.state.cart.map(
        (item: any) =>
          new ProdutoPedido(
            item.codigo,
            item.nome,
            item.imagem,
            item.descricao,
            item.tipo,
            item.preco_base,
            item.situacao,
            item.quantidade
          )
      );
    }

    return parsed;
  },
  setItem: async (name, value) => {
    await AsyncStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: async (name) => {
    await AsyncStorage.removeItem(name);
  },
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      addProductToCart: (product: Produto, quantidade: number) => {
        set((state) => {
          const index = state.cart.findIndex((p) => p.getCodigo() === product.getCodigo());

          if (index !== -1) {
            const updatedCart = [...state.cart];
            updatedCart[index].adicionarQuantidade(quantidade);
            return { cart: updatedCart };
          } else {
            const novoProduto = new ProdutoPedido(
              product.getCodigo(),
              product.getNome(),
              product.getImagem(),
              product.getDescricao(),
              product.getTipo(),
              product.getPrecoBase(),
              product.getSituacao(),
              quantidade
            );
            return { cart: [...state.cart, novoProduto] };
          }
        });
      },

      decreaseProductQuantity: (product: Produto, quantidade: number) => {
        set((state) => {
          const index = state.cart.findIndex((p) => p.getCodigo() === product.getCodigo());
          if (index === -1) return state;
      
          const updatedCart = [...state.cart];
          const produto = updatedCart[index];
          const novaQuantidade = produto.getQuantidade() - quantidade;
      
          if (novaQuantidade <= 0) {
            // Remove o produto do carrinho
            return { cart: state.cart.filter((p) => p.getCodigo() !== product.getCodigo()) };
          }
      
          // Atualiza a quantidade
          produto.removerQuantidade(quantidade);
          return { cart: updatedCart };
        });
      },
      

      removeProductFromCart: (codigo) => {
        set((state) => ({
          cart: state.cart.filter((p) => p.getCodigo() !== codigo),
        }));
      },

      clearCartItems: () => set({ cart: [] }),

      getTotalItemsInCart: () => {
        return get().cart.reduce((acc, item) => acc + item.getQuantidade(), 0);
      },

      getProductByCodigo: (codigo) => {
        return get().cart.find((p) => p.getCodigo() === codigo);
      },

      getCartValue: () => {
        return get().cart.reduce((acc, item) => acc + item.getPrecoBase() * item.getQuantidade(), 0);
      },
    }),
    {
      name: "@FatiaPerfeita:cart",
      storage: customStorage,
    }
  )
);
