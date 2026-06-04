import type { Meta, StoryObj } from '@storybook/react-vite';
import CartItemRaw from './CartItemRaw';

const meta: Meta<typeof CartItemRaw> = {
  component: CartItemRaw,
};

export default meta;
type Story = StoryObj<typeof CartItemRaw>;

export const Default: Story = {
  args: {
    image: 'https://picsum.photos/150',
    name: '상품 이름',
    price: 10000,
    quantity: 1,
  },
};
