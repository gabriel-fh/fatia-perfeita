import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Produto from "../model/Produto";

export type CartItem = {
  codigo: string;
  nome: string;
  imagem: string;
  descricao: string;
  preco_base: number;
  tipo: string;
  situacao: string;
  quantidade: number;
};

type CartStore = {
  cart: CartItem[];
  addProductToCart: (product: Produto, quantidade: number) => void;
  decreaseProductQuantity: (product: CartItem) => void;
  removeProductFromCart: (codigo: string) => void;
  clearCartItems: () => void;
  getTotalItemsInCart: () => number;
  getProductByCodigo: (codigo: string) => CartItem | undefined;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      addProductToCart: (product: Produto, quantidade: number) => {
        set((state) => {
          const exists = state.cart.find((p) => p.codigo === product.getCodigo());
          if (exists) {
            return {
              cart: state.cart.map((p) =>
                p.codigo === product.getCodigo() ? { ...p, quantidade: p.quantidade + quantidade } : p
              ),
            };
          } else {
            const cartItem: CartItem = {
              codigo: product.getCodigo(),
              nome: product.getNome(),
              imagem: product.getImagem(),
              descricao: product.getDescricao(),
              preco_base: product.getPrecoBase(),
              tipo: product.getTipo(),
              situacao: product.getSituacao(),
              quantidade: quantidade,
            };
            return { cart: [...state.cart, cartItem] };
          }
        });
      },

      decreaseProductQuantity: (product) => {
        set((state) => {
          const existingProduct = state.cart.find((p) => p.codigo === product.codigo);
          if (!existingProduct) return state;

          if (existingProduct.quantidade > product.quantidade) {
            return {
              cart: state.cart.map((p) =>
                p.codigo === product.codigo ? { ...p, quantidade: p.quantidade - product.quantidade } : p
              ),
            };
          }

          return {
            cart: state.cart.filter((p) => p.codigo !== product.codigo),
          };
        });
      },
      removeProductFromCart: (codigo) => {
        set((state) => ({ cart: state.cart.filter((p) => p.codigo !== codigo) }));
      },
      clearCartItems: () => set({ cart: [] }),
      getTotalItemsInCart: () => get().cart.reduce((acc, item) => acc + item.quantidade, 0),
      getProductByCodigo: (codigo) => {
        return get().cart.find((p) => p.codigo === codigo);
      },
    }),
    {
      name: "@FatiaPerfeita:cart",
      storage: {
        getItem: async (name) => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name);
        },
      },
    }
  )
);
