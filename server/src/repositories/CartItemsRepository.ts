import { CartItem } from './../types';

const cartItems = new Map<string, CartItem>();

class CartItemsRepository {
  store;

  constructor() {
    this.store = cartItems;
  }

  async getAllByUser() {
    return Array.from(this.store.entries()).map((entry) => entry[1]);
  }
}

export default CartItemsRepository;
