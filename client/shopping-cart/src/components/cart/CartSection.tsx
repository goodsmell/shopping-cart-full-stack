import { css } from '@emotion/react';
import type { CartItem } from '../../types';
import OutlineButton from '../buttons/OutlineButton';
import { CheckIcon } from '../icons/CheckIcon';
import CartItemList from './CartItemList';

type Props = {
  cartItems: CartItem[];
  isAllSelect: boolean;
  onSelectAll: (nextIsAllSelected: boolean) => void;
  onSelect: (id: string, nextCheckStatus: boolean) => void;
  onChangeQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  onDelete: (cartItemId: string) => Promise<void>;
};

const CartSection = ({
  cartItems,
  isAllSelect,
  onSelectAll,
  onSelect,
  onChangeQuantity,
  onDelete,
}: Props) => {

  return (
    <section
      css={css`
        display: flex;
        flex-direction: column;
        gap: 20px;
        max-height: 382px;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: row;
          gap: 8px;
          align-items: center;
        `}
      >
        <OutlineButton onClick={() => onSelectAll(!isAllSelect)} isActive={isAllSelect}>
          <CheckIcon isActive={isAllSelect} />
        </OutlineButton>
        <p
          css={css`
            font: var(--text-label);
          `}
        >
          전체 선택
        </p>
      </div>

      <CartItemList
        cartItems={cartItems}
        handleSelect={onSelect}
        onChangeQuantity={onChangeQuantity}
        onDelete={onDelete}
      />
    </section>
  );
};

export default CartSection;
