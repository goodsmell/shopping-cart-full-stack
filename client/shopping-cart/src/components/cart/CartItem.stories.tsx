import type { Meta, StoryObj } from '@storybook/react-vite';
import CartItem from './CartItem';

const meta: Meta<typeof CartItem> = {
  component: CartItem,
};

export default meta;
type Story = StoryObj<typeof CartItem>;

export const Default: Story = {
  args: {
    image: 'https://picsum.photos/150',
    name: '상품 이름',
    price: 10000,
    quantity: 1,
  },
};
