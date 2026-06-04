import type { CartItem } from '../types';

export const countCartItemTypes = (cartItems: CartItem[]) => cartItems.length;

export const calcOrderAmount = (cartItems: CartItem[], selectedIds: string[]) => {
  return cartItems
    .filter((item) => selectedIds.includes(item.cartItemId))
    .reduce((acc, item) => acc + item.product.price * item.quantity, 0);
};
