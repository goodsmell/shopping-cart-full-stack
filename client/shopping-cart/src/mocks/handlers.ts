import { http, HttpResponse } from 'msw';

const BASE_URL = 'http://localhost:3000';

type Product = {
  productId: string;
  name: string;
  price: number;
  image: string;
  stock: number;
};

type StoredCartItem = {
  cartItemId: string;
  productId: string;
  quantity: number;
};

const mockProducts: Product[] = [
  {
    productId: '1',
    name: '데일리 라운드 티셔츠',
    price: 10000,
    image: 'https://picsum.photos/seed/cart-item-1/150',
    stock: 10,
  },
  {
    productId: '2',
    name: '와이드 데님 팬츠',
    price: 20000,
    image: 'https://picsum.photos/seed/cart-item-2/150',
    stock: 5,
  },
  {
    productId: '3',
    name: '아주 긴 이름의 프리미엄 코튼 오버핏 셔츠',
    price: 32000,
    image: 'https://picsum.photos/seed/cart-item-3/150',
    stock: 8,
  },
];

const mockCartItems: StoredCartItem[] = [
  { cartItemId: '1', productId: '1', quantity: 2 },
  { cartItemId: '2', productId: '2', quantity: 1 },
  { cartItemId: '3', productId: '3', quantity: 4 },
];

const toCartItemResponse = (cartItem: StoredCartItem) => {
  const product = mockProducts.find((item) => item.productId === cartItem.productId);

  return {
    cartItemId: cartItem.cartItemId,
    quantity: cartItem.quantity,
    product,
  };
};

export const handlers = [
  http.get(`${BASE_URL}/products`, () => {
    return HttpResponse.json({ status: 'success', data: mockProducts });
  }),

  http.post(`${BASE_URL}/products`, async ({ request }) => {
    const body = (await request.json()) as {
      name: string;
      price: number;
      image: string;
      stock: number;
    };
    const newProduct = { productId: String(mockProducts.length + 1), ...body };
    mockProducts.push(newProduct);
    return HttpResponse.json({ status: 'success', data: newProduct }, { status: 201 });
  }),

  http.delete(`${BASE_URL}/products/:productId`, ({ params }) => {
    const { productId } = params;
    return HttpResponse.json({ status: 'success', data: productId });
  }),

  http.get(`${BASE_URL}/cart`, () => {
    return HttpResponse.json({ status: 'success', data: mockCartItems.map(toCartItemResponse) });
  }),

  http.post(`${BASE_URL}/cart`, async ({ request }) => {
    const body = (await request.json()) as { productId: string; quantity: number };
    const newItem = { cartItemId: String(mockCartItems.length + 1), ...body };
    mockCartItems.push(newItem);
    return HttpResponse.json(
      { status: 'success', data: toCartItemResponse(newItem) },
      { status: 201 },
    );
  }),

  http.patch(`${BASE_URL}/cart/:cartItemId`, async ({ params, request }) => {
    const { cartItemId } = params;
    const body = (await request.json()) as { quantity: number };
    const item = mockCartItems.find((i) => i.cartItemId === cartItemId);
    if (item) item.quantity = body.quantity;
    return HttpResponse.json({ status: 'success', data: item ? toCartItemResponse(item) : item });
  }),

  http.delete(`${BASE_URL}/cart/:cartItemId`, ({ params }) => {
    const { cartItemId } = params;
    return HttpResponse.json({ status: 'success', data: cartItemId });
  }),
];
