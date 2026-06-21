import type { OrderCheck } from '../types';
import { BASE_URL } from './client';

type GetOrderCheckResponse = {
  status: 200;
  data: OrderCheck;
};

export const createOrderCheck = async (): Promise<void> => {
  const response = await fetch(`${BASE_URL}/order-check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error('주문 확인 생성에 실패했습니다.');
  }
};

export const getOrderCheck = async (): Promise<OrderCheck> => {
  const response = await fetch(`${BASE_URL}/order-check`);

  if (!response.ok) {
    throw new Error('주문 확인 상품 조회에 실패했습니다.');
  }

  const result: GetOrderCheckResponse = await response.json();
  return result.data;
};
