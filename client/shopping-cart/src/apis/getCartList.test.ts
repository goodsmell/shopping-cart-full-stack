import { describe, it, expect } from 'vitest';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';
import getCartList from './getCartList';
import { beforeAll, afterEach, afterAll } from 'vitest';

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
