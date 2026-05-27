import request from 'supertest';
import app from '../app';

describe('장바구니', () => {
  it('장바구니 목록을 조회할 수 있다.', async () => {
    await request(app).get('/cart').expect(200);
  });
});
