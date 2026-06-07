import { useLayoutEffect } from 'react';
import type { CartItem } from '../types';
import useLocalStorage from './useLocalStorage';

const useSelectItems = (cartItems: CartItem[]) => {
  const isFirstVisit = localStorage.getItem('selectItems') === null;
  const [selectItems, setSelectItems] = useLocalStorage<string[]>('selectItems', []);
  const isAllSelect = cartItems.length > 0 && selectItems.length === cartItems.length;

  useLayoutEffect(() => {
    if (isFirstVisit && cartItems.length > 0) {
      setSelectItems(cartItems.map((item) => item.cartItemId));
    }
  }, [cartItems, isFirstVisit, setSelectItems]);

  const handleToggleSelect = (id: string) => {
    setSelectItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    if (isAllSelect) {
      setSelectItems([]);
    } else {
      setSelectItems(cartItems.map((item) => item.cartItemId));
    }
  };

  const removeSelectItem = (id: string) => {
    setSelectItems((prev) => prev.filter((itemId) => itemId !== id));
  };

  return { selectItems, isAllSelect, handleToggleSelect, handleSelectAll, removeSelectItem };
};

export default useSelectItems;
