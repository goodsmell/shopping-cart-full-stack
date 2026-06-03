import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import plusIcon from '../../assets/plus_icon.svg';
import minusIcon from '../../assets/minus_icon.svg';
import { CheckIcon } from '../icons/CheckIcon';
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
    children: <img src={plusIcon} />,
  },
};

export const WithMinusIcon: Story = {
  args: {
    children: <img src={minusIcon} />,
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
