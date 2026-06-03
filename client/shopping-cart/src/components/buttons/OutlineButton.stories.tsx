import type { Meta, StoryObj } from '@storybook/react-vite';
import plusIcon from '../../assets/plus_icon.svg';
import minusIcon from '../../assets/minus_icon.svg';
import OutlineButton from './OutlineButton';
import { css } from '@emotion/react';

const meta: Meta<typeof OutlineButton> = {
  component: OutlineButton,
  argTypes: {
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof OutlineButton>;

export const WithTextSm: Story = {
  args: {
    radius: 'sm',
    children: (
      <p
        css={css`
          font: var(--text-label);
        `}
      >
        삭제
      </p>
    ),
  },
};

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
