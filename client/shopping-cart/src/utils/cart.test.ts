import { describe, it, expect } from 'vitest';
import { countCartItemTypes } from './cart';
import type { CartItem } from '../types';

const makeCartItem = (cartItemId: string): CartItem => ({
  cartItemId,
  quantity: 1,
  product: {
    productId: 'p1',
    name: '상품',
    price: 10000,
    image: '',
    stock: 10,
  },
});

describe('countCartItemTypes', () => {
  it('장바구니가 비어있으면 0을 반환한다', () => {
    expect(countCartItemTypes([])).toBe(0);
  });

  it('담긴 상품 종류의 수를 반환한다', () => {
    const cartItems = [makeCartItem('1'), makeCartItem('2'), makeCartItem('3')];
    expect(countCartItemTypes(cartItems)).toBe(3);
  });
});
