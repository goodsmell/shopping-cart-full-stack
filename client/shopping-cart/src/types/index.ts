export type Product = {
  id: string;
  name: string;
  price: number;
  imgUrl: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
  checkStatus: boolean;
};

export type PayInfo = {
  orderPrice: number;
  deliveryFee: number;
  totalOrderAmount: number;
};

export type Cart = {
  isAllSelected: boolean;
  cartItems: CartItem[];
  payInfo: PayInfo;
};

export type FetchCart = () => Promise<Cart>;
export type UpdateCartQuantity = (productId: string, quantity: number) => Promise<CartItem>;
export type DeleteCartItem = (productId: string) => Promise<unknown>;
