import { useEffect, useState, useCallback } from "react";
import { get, set } from "utils/localStorageAPI";
import useToast from "./useToast";

const useCart = () => {
  const [cartData, setCartData] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const toast = useToast();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = get("cart") || [];
    setCartData(savedCart);
    setIsReady(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isReady) {
      set("cart", cartData);
    }
  }, [cartData, isReady]);

  const addItem = useCallback((product, user) => {
    setCartData((prev) => {
      const existingItem = prev.find((item) => item.productId === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.productId === product.id ? { ...item, qty: item.qty + 1, qtyPrice: (item.qty + 1) * item.price } : item
        );
      }
      const newItem = {
        id: product.id,
        productId: product.id,
        title: product.name || product.title,
        price: product.price,
        qty: 1,
        qtyPrice: product.price,
        imageUrl: product.imageUrl,
        description: product.description,
      };
      return [...prev, newItem];
    });
    toast.displayToast({
      title: "Added to cart",
      description: `${product.name || product.title} has been added.`,
      status: "success",
    });
  }, [toast]);

  const removeItem = useCallback((id) => {
    setCartData((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const increaseQty = useCallback((item) => {
    setCartData((prev) =>
      prev.map((i) =>
        i.id === item.id ? { ...i, qty: i.qty + 1, qtyPrice: (i.qty + 1) * i.price } : i
      )
    );
  }, []);

  const decreaseQty = useCallback((item) => {
    setCartData((prev) =>
      prev.map((i) =>
        i.id === item.id && i.qty > 1 ? { ...i, qty: i.qty - 1, qtyPrice: (i.qty - 1) * i.price } : i
      )
    );
  }, []);

  const resetCart = useCallback(() => {
    setCartData([]);
  }, []);

  const count = cartData.reduce((acc, item) => acc + item.qty, 0);
  const total = cartData.reduce((acc, item) => acc + item.qtyPrice, 0);
  const isEmpty = cartData.length === 0;

  return {
    data: cartData,
    count,
    total,
    isReady,
    isEmpty,
    addItem,
    removeItem,
    increaseQty,
    decreaseQty,
    resetCart,
  };
};

export default useCart;

