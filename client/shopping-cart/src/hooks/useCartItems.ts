import { useState, useEffect } from 'react';
import type { CartItem } from '../types';

const useCartItems = (fetchCartItems: () => Promise<CartItem[]>) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const data = await fetchCartItems();
        setCartItems(data);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadCartItems();
  }, []);

  return { cartItems, setCartItems, isLoading, isError };
};

export default useCartItems;
