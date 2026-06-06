import { css } from '@emotion/react';
import type { ReactNode } from 'react';
import type { CartItem } from '../../types';
import CartItemSkeleton from './CartItemSkeleton';

type Props = {
  children: ReactNode;
  cartItems: CartItem[];
  isLoading: boolean;
  isError: boolean;
};

const CartContent = ({ children, cartItems, isLoading, isError }: Props) => {
  if (isError) {
    return (
      <p
        css={css`
          font: var(--text-label);
          text-align: center;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        장바구니를 불러오는 데 실패했습니다.
      </p>
    );
  }

  if (isLoading) {
    return (
      <ul
        css={css`
          list-style: none;
          margin: 0;
          padding: 0;
        `}
      >
        {Array.from({ length: 3 }).map((_, i) => (
          <CartItemSkeleton key={i} />
        ))}
      </ul>
    );
  }

  if (cartItems.length === 0) {
    return (
      <p
        css={css`
          font: var(--text-label);
          text-align: center;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        장바구니에 담은 상품이 없습니다.
      </p>
    );
  }

  return children;
};

export default CartContent;
