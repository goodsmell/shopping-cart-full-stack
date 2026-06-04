import { describe, it, expect } from 'vitest';
import { countCartItemTypes, calcOrderAmount } from './cart';
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

describe('calcOrderAmount', () => {
  it('선택한 아이템들의 주문 금액을 계산한다', () => {
    const cartItems = [
      { ...makeCartItem('1'), quantity: 2, product: { productId: 'p1', name: '상품1', price: 10000, image: '', stock: 10 } },
      { ...makeCartItem('2'), quantity: 1, product: { productId: 'p2', name: '상품2', price: 20000, image: '', stock: 5 } },
    ];
    const selectedIds = ['1', '2'];
    expect(calcOrderAmount(cartItems, selectedIds)).toBe(40000);
  });

  it('선택한 아이템이 없으면 0을 반환한다', () => {
    const cartItems = [makeCartItem('1'), makeCartItem('2')];
    expect(calcOrderAmount(cartItems, [])).toBe(0);
  });

  it('일부만 선택하면 선택한 아이템만 계산한다', () => {
    const cartItems = [
      { ...makeCartItem('1'), quantity: 1, product: { productId: 'p1', name: '상품1', price: 10000, image: '', stock: 10 } },
      { ...makeCartItem('2'), quantity: 1, product: { productId: 'p2', name: '상품2', price: 20000, image: '', stock: 5 } },
    ];
    expect(calcOrderAmount(cartItems, ['1'])).toBe(10000);
  });
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
