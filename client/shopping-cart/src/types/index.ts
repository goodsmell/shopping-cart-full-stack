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
