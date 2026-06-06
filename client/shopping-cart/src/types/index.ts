export type Product = {
  productId: string;
  name: string;
  price: number;
  image: string;
  stock: number;
};

export type CartItem = {
  cartItemId: string;
  quantity: number;
  product: Product;
};

export type FetchCartItems = () => Promise<CartItem[]>;
export type UpdateCartQuantity = (cartItemId: string, quantity: number) => Promise<CartItem>;
export type DeleteCartItem = (cartItemId: string) => Promise<unknown>;
