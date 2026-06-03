import { http, HttpResponse } from 'msw';

const BASE_URL = 'http://localhost:3000';

const mockProducts = [
  { productId: '1', name: '상품 A', price: 10000, image: 'https://via.placeholder.com/150', stock: 10 },
  { productId: '2', name: '상품 B', price: 20000, image: 'https://via.placeholder.com/150', stock: 5 },
];

const mockCartItems = [
  { cartItemId: '1', productId: '1', quantity: 2 },
];

export const handlers = [
  http.get(`${BASE_URL}/products`, () => {
    return HttpResponse.json({ status: 'success', data: mockProducts });
  }),

  http.post(`${BASE_URL}/products`, async ({ request }) => {
    const body = await request.json() as { name: string; price: number; image: string; stock: number };
    const newProduct = { productId: String(mockProducts.length + 1), ...body };
    mockProducts.push(newProduct);
    return HttpResponse.json({ status: 'success', data: newProduct }, { status: 201 });
  }),

  http.delete(`${BASE_URL}/products/:productId`, ({ params }) => {
    const { productId } = params;
    return HttpResponse.json({ status: 'success', data: productId });
  }),

  http.get(`${BASE_URL}/cart`, () => {
    return HttpResponse.json({ status: 'success', data: mockCartItems });
  }),

  http.post(`${BASE_URL}/cart`, async ({ request }) => {
    const body = await request.json() as { productId: string; quantity: number };
    const newItem = { cartItemId: String(mockCartItems.length + 1), ...body };
    mockCartItems.push(newItem);
    return HttpResponse.json({ status: 'success', data: newItem }, { status: 201 });
  }),

  http.patch(`${BASE_URL}/cart/:cartItemId`, async ({ params, request }) => {
    const { cartItemId } = params;
    const body = await request.json() as { quantity: number };
    const item = mockCartItems.find((i) => i.cartItemId === cartItemId);
    if (item) item.quantity = body.quantity;
    return HttpResponse.json({ status: 'success', data: item });
  }),

  http.delete(`${BASE_URL}/cart/:cartItemId`, ({ params }) => {
    const { cartItemId } = params;
    return HttpResponse.json({ status: 'success', data: cartItemId });
  }),
];
