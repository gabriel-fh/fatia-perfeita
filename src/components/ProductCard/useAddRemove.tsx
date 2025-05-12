import { useCartStore } from "@/src/contexts/Cart";
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface UseAddRemoveProps {
  id: string;
}

function useContinuousCounter(
  isActive: boolean,
  delta: number,
  onComplete: (value: number) => void,
  resetTrigger: any
) {
  const [counter, setCounter] = useState(0);
  const counterRef = useRef(counter);

  useEffect(() => {
    counterRef.current = counter;
  }, [counter]);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setCounter((c) => c + delta);
      }, 100);
      return () => clearInterval(interval);
    }
    if (!isActive && counter !== 0) {
      onComplete(counter);
      setCounter(0);
    }
  }, [isActive, delta, onComplete, counter]);

  useEffect(() => {
    setCounter(0);
  }, [resetTrigger]);

  return counterRef.current;
}

export default function useAddRemove({ id }: UseAddRemoveProps) {
  const cartContext = useCartStore();

  const product = useMemo(() => cartContext.getProductById(id), [cartContext, id]);

  const addProduct = useCallback(
    (quantity: number = 1) => {
      cartContext.addProductToCart({ id, quantity });
    },
    [id, cartContext]
  );

  const removeProduct = useCallback(
    (quantity: number) => {
      cartContext.decreaseProductQuantity({ id, quantity });
    },
    [cartContext, id]
  );

  const handleClickProduct = useCallback(() => {
    addProduct(1);
    impactAsync(ImpactFeedbackStyle.Heavy);
  }, [addProduct]);

  const [addDelta, setAddDelta] = useState(0);
  const [removeDelta, setRemoveDelta] = useState(false);

  const addedCount = useContinuousCounter(addDelta > 0, addDelta, addProduct, product?.quantity);
  const removedCount = useContinuousCounter(removeDelta, -1, (qty) => removeProduct(Math.abs(qty)), product?.quantity);

  const counterValue = useMemo(() => {
    const base = product?.quantity || 0;
    return base + addedCount + removedCount;
  }, [product?.quantity, addedCount, removedCount]);

  const onLongPressAdd = useCallback(() => {
    impactAsync(ImpactFeedbackStyle.Heavy);
    setAddDelta(1);
  }, []);

  const onPressOutAdd = useCallback(() => {
    setAddDelta(0);
  }, []);

  const onLongPressLess = useCallback(() => {
    impactAsync(ImpactFeedbackStyle.Heavy);
    setRemoveDelta(true);
  }, []);

  const onPressOutLess = useCallback(() => {
    setRemoveDelta(false);
  }, []);

  return {
    counterValue,
    product,
    addProduct,
    removeProduct,
    handleClickProduct,
    onLongPressAdd,
    onPressOutAdd,
    onLongPressLess,
    onPressOutLess,
  };
}
