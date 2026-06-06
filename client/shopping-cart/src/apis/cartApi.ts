import type { CartItem } from '../types';
import { BASE_URL } from './client';

type GetCartListResponse = {
  status: 'success';
  data: CartItem[];
};

type UpdateCartQuantityResponse = {
  status: 'success';
  data: CartItem;
};

type DeleteCartItemResponse = {
  status: 'success';
  data: string;
};

export const getCartList = async (): Promise<CartItem[]> => {
  const response = await fetch(`${BASE_URL}/cart`);

  if (!response.ok) {
    throw new Error('장바구니 목록 조회에 실패했습니다.');
  }

  const result: GetCartListResponse = await response.json();
  return result.data;
};

export const updateCartQuantity = async (cartItemId: string, quantity: number): Promise<CartItem> => {
  const response = await fetch(`${BASE_URL}/cart/${cartItemId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity }),
  });

  if (!response.ok) {
    throw new Error('수량 변경에 실패했습니다.');
  }

  const result: UpdateCartQuantityResponse = await response.json();
  return result.data;
};

export const deleteCartItem = async (cartItemId: string): Promise<string> => {
  const response = await fetch(`${BASE_URL}/cart/${cartItemId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error('장바구니 삭제에 실패했습니다.');
  }

  const result: DeleteCartItemResponse = await response.json();
  return result.data;
};
