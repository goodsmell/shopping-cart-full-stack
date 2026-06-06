import { cartItems } from './CartItemsRepository';
import { products } from './ProductsRepository';

export const seedInitialData = () => {
  if (products.size > 0 || cartItems.size > 0) {
    return;
  }

  products.set('seed-product-1', {
    productId: 'seed-product-1',
    name: '말랑 인형 키링',
    price: 12000,
    image: 'https://picsum.photos/seed/seed-product-1/320/320',
    stock: 12,
  });

  products.set('seed-product-2', {
    productId: 'seed-product-2',
    name: '브라운 머그컵',
    price: 18000,
    image: 'https://picsum.photos/seed/seed-product-2/320/320',
    stock: 8,
  });

  products.set('seed-product-3', {
    productId: 'seed-product-3',
    name: '데일리 노트 세트',
    price: 9500,
    image: 'https://picsum.photos/seed/seed-product-3/320/320',
    stock: 20,
  });

  cartItems.set('seed-cart-item-1', {
    cartItemId: 'seed-cart-item-1',
    productId: 'seed-product-1',
    quantity: 1,
  });

  cartItems.set('seed-cart-item-2', {
    cartItemId: 'seed-cart-item-2',
    productId: 'seed-product-2',
    quantity: 2,
  });
};
