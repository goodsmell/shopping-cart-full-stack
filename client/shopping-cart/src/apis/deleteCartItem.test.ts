import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';
import deleteCartItem from './deleteCartItem';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

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
