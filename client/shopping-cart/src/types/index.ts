export type Product = {
  productId: string;
  name: string;
  price: number;
  image: string;
  stock: number;
};

export type CartItem = {
  cartItemId: string;
  productId: string;
  quantity: number;
};

export type CartItemWithProduct = CartItem & Product;
