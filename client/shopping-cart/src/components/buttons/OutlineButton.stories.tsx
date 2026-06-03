import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckIcon, MinusIcon, PlusIcon } from '../icons';
import OutlineButton from './OutlineButton';

const meta: Meta<typeof OutlineButton> = {
  component: OutlineButton,
  argTypes: {
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof OutlineButton>;

export const WithPlusIcon: Story = {
  args: {
    children: <PlusIcon />,
  },
};

export const WithMinusIcon: Story = {
  args: {
    children: <MinusIcon />,
  },
};

export const WithDeleteText: Story = {
  args: {
    variant: 'text',
    children: '삭제',
  },
};

export const ActiveWithCheckIcon: Story = {
  args: {
    isActive: true,
    children: <CheckIcon isActive />,
  },
};

export const ToggleWithCheckIcon: Story = {
  args: {},
  render: (args) => {
    const [isActive, setIsActive] = useState(false);

    return (
      <OutlineButton
        {...args}
        isActive={isActive}
        onClick={() => {
          setIsActive((prev) => !prev);
          args.onClick?.();
        }}
      >
        <CheckIcon isActive={isActive} />
      </OutlineButton>
    );
  },
};
