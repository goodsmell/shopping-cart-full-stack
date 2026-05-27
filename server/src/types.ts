export interface Product {
  isDeleted: boolean;
  productId: string;
  name: string;
  price: number;
  image: string;
  stock: number;
};

export interface CartItem extends Product{
  cartItemId : string;
  quantity: number;
}
