import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';
import updateCartQuantity from './updateCartQuantity';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

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
