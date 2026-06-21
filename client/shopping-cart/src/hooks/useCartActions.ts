import {
  deleteCartItem,
  getCart,
  updateCartQuantity,
  updateCartSelect,
  updateCartSelectAll,
} from '../apis/cartApi';
import type { Cart } from '../types';

const useCartActions = (setCart: (cart: Cart) => void) => {
  const handleSelect = async (productId: string, nextCheckStatus: boolean) => {
    try {
      await updateCartSelect(productId, nextCheckStatus);
      setCart(await getCart());
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectAll = async (nextIsAllSelected: boolean) => {
    try {
      await updateCartSelectAll(nextIsAllSelected);
      setCart(await getCart());
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (productId: string) => {
    try {
      await deleteCartItem(productId);
      setCart(await getCart());
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuantity = async (productId: string, quantity: number) => {
    try {
      await updateCartQuantity(productId, quantity);
      setCart(await getCart());
    } catch (error) {
      console.error(error);
    }
  };

  return { handleSelect, handleSelectAll, handleDelete, handleQuantity };
};

export default useCartActions;
