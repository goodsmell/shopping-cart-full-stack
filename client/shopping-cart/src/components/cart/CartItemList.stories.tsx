import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CartItem } from '../../types';
import CartItemList from './CartItemList';

const cartItems: CartItem[] = [
  {
    cartItemId: '1',
    quantity: 1,
    product: {
      productId: '1',
      image: 'https://picsum.photos/150?random=1',
      name: '상품 이름',
      price: 10000,
      stock: 10,
    },
  },
  {
    cartItemId: '2',
    quantity: 3,
    product: {
      productId: '2',
      image: 'https://picsum.photos/150?random=2',
      name: '아주 긴 상품 이름이 들어왔을 때도 레이아웃이 유지되는지 확인하는 예시',
      price: 20000,
      stock: 5,
    },
  },
];

const meta: Meta<typeof CartItemList> = {
  component: CartItemList,
};

export default meta;
type Story = StoryObj<typeof CartItemList>;

export const Default: Story = {
  args: {
    cartItems,
  },
};
