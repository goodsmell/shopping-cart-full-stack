import type { CartItem } from '../types';

const BASE_URL = 'http://localhost:3000';

type UpdateCartQuantityResponse = {
  status: 'success';
  data: CartItem;
};

const updateCartQuantity = async (cartItemId: string, quantity: number) => {
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

export default updateCartQuantity;
