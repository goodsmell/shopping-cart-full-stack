import type { CartItem, UpdateCartQuantity, DeleteCartItem } from '../types';

type CartActionsParams = {
  cartItems: CartItem[];
  setCartItems: (updater: (prev: CartItem[]) => CartItem[]) => void;
  removeSelectItem: (id: string) => void;
  updateQuantity: UpdateCartQuantity;
  deleteItem: DeleteCartItem;
};

const useCartActions = ({
  cartItems,
  setCartItems,
  removeSelectItem,
  updateQuantity,
  deleteItem,
}: CartActionsParams) => {
  const handleQuantityChange = async (cartItemId: string, quantity: number) => {
    try {
      await updateQuantity(cartItemId, quantity);
      setCartItems((prev) =>
        prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity } : item)),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteItem = async (cartItemId: string) => {
    if (!window.confirm('장바구니에서 삭제하시겠습니까?')) return;
    const itemName = cartItems.find((item) => item.cartItemId === cartItemId)?.product.name;
    try {
      await deleteItem(cartItemId);
      setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
      removeSelectItem(cartItemId);
    } catch (error) {
      console.error(error);
      alert(`${itemName} 삭제에 실패했습니다.`);
    }
  };

  return { handleQuantityChange, handleDeleteItem };
};

export default useCartActions;
