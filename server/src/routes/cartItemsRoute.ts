import { Router } from 'express';
import CartItemsContorller from '../controllers/CartItemsContorller';
const cartItemsRouter = Router();

const cartItemsController = new CartItemsContorller();

cartItemsRouter.get('/cart', cartItemsController.getCartItems);

export default cartItemsRouter;
