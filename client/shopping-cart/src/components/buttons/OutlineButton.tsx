import { css } from '@emotion/react';
import type { ReactNode } from 'react';
type Props = {
  onClick: () => void;
  children: ReactNode;
  radius?: 'sm' | 'md';
};
const OutlineButton = ({ onClick, children, radius = 'md' }: Props) => {
  return (
    <button
      css={css`
        display: flex;
        height: 24px;
        border: 1px solid var(--color-line);
        border-radius: ${radius === 'sm' ? '4px' : '8px'};
        align-items: center;
        justify-content: center;
        background: none;
        cursor: pointer;

        &:hover {
          background: #f0f0f0;
        }
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default OutlineButton;
