import { useCartStore } from "@/src/contexts/Cart";
import Produto from "@/src/model/Produto";
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";
import { useCallback, useMemo } from "react";

interface UseAddRemoveProps {
  produto: Produto;
}

export default function useAddRemove({ produto }: UseAddRemoveProps) {
  const { addProductToCart, getProductByCodigo, decreaseProductQuantity,cart } = useCartStore();

  const product = useMemo(() => {
    return getProductByCodigo(produto.getCodigo());
  }, [getProductByCodigo, produto, cart.length]);

  const addProduct = useCallback(
    (quantidade: number = 1) => {
      addProductToCart(produto, quantidade);
    },
    [produto, addProductToCart]
  );

  const removeProduct = useCallback(
    (quantidade: number) => {
      if (!produto) return;
      decreaseProductQuantity(produto, quantidade);
    },
    [produto, decreaseProductQuantity]
  );

  const handleClickProduct = useCallback(() => {
    addProduct(1);
    impactAsync(ImpactFeedbackStyle.Heavy);
  }, [addProduct]);

  const counterValue = product?.getQuantidade() || 0;

  return {
    counterValue,
    product,
    addProduct,
    removeProduct,
    handleClickProduct,
  };
}
