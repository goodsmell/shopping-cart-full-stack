import { css } from '@emotion/react';
import type { CartItem } from '../../types';
import CartItemSkeleton from './CartItemSkeleton';
import CartSection from './CartSection';
import OrderSummary from './OrderSummary';

type Props = {
  cartItems: CartItem[];
  selectItems: string[];
  isAllSelect: boolean;
  isLoading: boolean;
  isError: boolean;
  purchasePrice: number;
  shippingFee: number;
  totalPurchasePrice: number;
  onSelectAll: () => void;
  onSelect: (id: string) => void;
  onChangeQuantity: (cartItemId: string, quantity: number) => void;
  onDelete: (cartItemId: string) => void;
};

const CartContent = ({
  cartItems,
  selectItems,
  isAllSelect,
  isLoading,
  isError,
  purchasePrice,
  shippingFee,
  totalPurchasePrice,
  onSelectAll,
  onSelect,
  onChangeQuantity,
  onDelete,
}: Props) => {
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

  return (
    <>
      <CartSection
        cartItems={cartItems}
        selectItems={selectItems}
        isAllSelect={isAllSelect}
        onSelectAll={onSelectAll}
        onSelect={onSelect}
        onChangeQuantity={onChangeQuantity}
        onDelete={onDelete}
      />
      <OrderSummary
        purchasePrice={purchasePrice}
        shippingFee={shippingFee}
        totalPurchasePrice={totalPurchasePrice}
      />
    </>
  );
};

export default CartContent;
