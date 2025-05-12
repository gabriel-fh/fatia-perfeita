import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type CartItem = {
  id: string;
  quantity: number;
};

type CartStore = {
  cart: CartItem[];
  addProductToCart: (product: CartItem) => void;
  decreaseProductQuantity: (product: CartItem) => void;
  removeProductFromCart: (id: string) => void;
  clearCartItems: () => void;
  getTotalItemsInCart: () => number;
  getProductById: (id: string) => CartItem | undefined;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      addProductToCart: (product) => {
        set((state) => {
          const exists = state.cart.find((p) => p.id === product.id);
          if (exists) {
            return {
              cart: state.cart.map((p) => {
                return p.id === product.id ? { ...p, quantity: p.quantity + product.quantity } : p;
              }),
            };
          } else {
            return { cart: [...state.cart, product] };
          }
        });
      },
      decreaseProductQuantity: (product) => {
        set((state) => {
          const existingProduct = state.cart.find((p) => p.id === product.id);
          if (!existingProduct) return state;

          if (existingProduct.quantity > product.quantity) {
            return {
              cart: state.cart.map((p) =>
                p.id === product.id ? { ...p, quantity: p.quantity - product.quantity } : p
              ),
            };
          }

          return {
            cart: state.cart.filter((p) => p.id !== product.id),
          };
        });
      },
      removeProductFromCart: (id) => {
        set((state) => ({ cart: state.cart.filter((p) => p.id !== id) }));
      },
      clearCartItems: () => set({ cart: [] }),
      getTotalItemsInCart: () => get().cart.reduce((acc, item) => acc + item.quantity, 0),
      getProductById: (id): CartItem | undefined => {
        return get().cart.find((p) => p.id === id);
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
