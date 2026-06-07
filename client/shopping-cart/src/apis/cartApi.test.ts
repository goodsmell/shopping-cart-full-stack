import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';
import { getCartList, updateCartQuantity, deleteCartItem } from './cartApi';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('getCartList', () => {
  it('장바구니 목록을 반환한다', async () => {
    const data = await getCartList();

    expect(data).toHaveLength(3);
    expect(data[0]).toMatchObject({ cartItemId: '1', quantity: 2 });
  });

  it('응답이 실패하면 에러를 던진다', async () => {
    server.use(
      http.get('http://localhost:3000/cart', () => {
        return HttpResponse.json({ message: 'error' }, { status: 500 });
      }),
    );

    await expect(getCartList()).rejects.toThrow('장바구니 목록 조회에 실패했습니다.');
  });
});

describe('updateCartQuantity', () => {
  it('수량을 변경하고 변경된 아이템을 반환한다', async () => {
    const result = await updateCartQuantity('1', 5);
    expect(result).toMatchObject({ cartItemId: '1', quantity: 5 });
  });

  it('유효하지 않은 수량이면 에러를 던진다', async () => {
    server.use(
      http.patch('http://localhost:3000/cart/:cartItemId', () => {
        return HttpResponse.json(
          { status: 'fail', data: { quantity: '수량은 1 이상 99 이하의 정수여야 합니다.' } },
          { status: 400 },
        );
      }),
    );

    await expect(updateCartQuantity('1', 0)).rejects.toThrow('수량 변경에 실패했습니다.');
  });

  it('존재하지 않는 장바구니 항목이면 에러를 던진다', async () => {
    server.use(
      http.patch('http://localhost:3000/cart/:cartItemId', () => {
        return HttpResponse.json(
          { status: 'fail', data: { cartItemId: '존재하지 않는 장바구니 항목입니다.' } },
          { status: 404 },
        );
      }),
    );

    await expect(updateCartQuantity('999', 5)).rejects.toThrow('수량 변경에 실패했습니다.');
  });
});

describe('deleteCartItem', () => {
  it('장바구니 아이템을 삭제한다', async () => {
    await expect(deleteCartItem('1')).resolves.not.toThrow();
  });

  it('존재하지 않는 아이템이면 에러를 던진다', async () => {
    server.use(
      http.delete('http://localhost:3000/cart/:cartItemId', () => {
        return HttpResponse.json(
          { status: 'fail', data: { cartItemId: '존재하지 않는 장바구니 항목입니다.' } },
          { status: 404 },
        );
      }),
    );

    await expect(deleteCartItem('999')).rejects.toThrow('장바구니 삭제에 실패했습니다.');
  });
});
