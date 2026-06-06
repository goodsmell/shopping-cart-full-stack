import { useState } from 'react';
import type { CartItem } from '../types';
import useLocalStorage from './useLocalStorage';

const useSelectItems = (cartItems: CartItem[]) => {
  const [selectItems, setSelectItems] = useLocalStorage<string[]>('selectItems', []);
  const [isAllSelect, setIsAllSelect] = useState<boolean>(false);

  const handleToggleSelect = (id: string) => {
    setSelectItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    if (selectItems.length === cartItems.length) {
      setSelectItems([]);
      setIsAllSelect(false);
    } else {
      setSelectItems(cartItems.map((item) => item.cartItemId));
      setIsAllSelect(true);
    }
  };

  const removeSelectItem = (id: string) => {
    setSelectItems((prev) => prev.filter((itemId) => itemId !== id));
  };

  return { selectItems, isAllSelect, handleToggleSelect, handleSelectAll, removeSelectItem };
};

export default useSelectItems;
