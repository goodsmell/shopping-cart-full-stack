import type { CartItem } from '../types';

const BASE_URL = 'http://localhost:3000';

type GetCartListResponse = {
  status: 'success';
  data: CartItem[];
};

const getCartList = async () => {
  const response = await fetch(`${BASE_URL}/cart`);

  if (!response.ok) {
    throw new Error('장바구니 목록 조회에 실패했습니다.');
  }

  const result: GetCartListResponse = await response.json();
  return result.data;
};

export default getCartList;
