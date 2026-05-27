import { Request, Response } from 'express';
import CartItemsService from '../services/CartItemsService';

class CartItemContorller {
  service;

  constructor() {
    this.service = new CartItemsService();
  }

  getCartItems = async (_req: Request, res: Response) => {
    try {
      const cartItems = await this.service.getCartItems();
      res.status(200).json({
        status: 'success',
        data: cartItems,
      });
    } catch {
      res.status(500).json({
        status: 'error',
        data: '장바구니 목록을 가져오는 중 에러가 발생했습니다.',
      });
    }
  };
}

export default CartItemContorller;
