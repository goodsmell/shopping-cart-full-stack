import type { CartItem } from '../types';

const BASE_URL = 'http://localhost:3000';

type DeleteCartItemResponse = {
  status: 'success';
  data: CartItem[];
};

const deleteCartItem = async (cartItemId: string) => {
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

export default deleteCartItem;
