import { css } from '@emotion/react';
import type { ReactNode } from 'react';

type Variant = 'icon' | 'text';

type Props = {
  onClick: () => void;
  children: ReactNode;
  isActive?: boolean;
  variant?: Variant;
};

const baseStyle = (isPressed: boolean) => css`
  display: inline-flex;
  border: 1px solid var(--color-line);
  align-items: center;
  justify-content: center;
  background-color: ${isPressed ? `var(--color-main)` : `var(--color-white)`};
  color: ${isPressed ? `var(--color-white)` : `var(--color-text)`};
  cursor: pointer;
  white-space: nowrap;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    background-color: ${isPressed ? `var(--color-main)` : `#f0f0f0`};
  }
`;

const variantStyles = {
  icon: css`
    width: 24px;
    height: 24px;
    border-radius: 8px;
    padding: 0;
  `,
  text: css`
    min-width: 43px;
    height: 24px;
    border-radius: 4px;
    padding: 0 8px;
  `,
} satisfies Record<Variant, ReturnType<typeof css>>;

const OutlineButton = ({ onClick, children, isActive, variant = 'icon' }: Props) => {
  const isPressed = isActive ?? false;

  return (
    <button
      type="button"
      aria-pressed={isActive}
      css={[baseStyle(isPressed), variantStyles[variant]]}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default OutlineButton;
