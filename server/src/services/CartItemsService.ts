import CartItemsRepository from '../repositories/CartItemsRepository';;

class CartItemsService {
  repository;

  constructor() {
    this.repository = new CartItemsRepository();
  }

  async getCartItems() {
    const cartItems = await this.repository.getAllByUser();

    return cartItems.filter((item) => item.isDeleted === false);
  }
}

export default CartItemsService;
