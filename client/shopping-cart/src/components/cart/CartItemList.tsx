import { css } from '@emotion/react';
import CartItemRaw from './CartItemRaw';
import type { CartItem } from '../../types';
import OutlineButton from '../buttons/OutlineButton';
import { CheckIcon } from '../icons/CheckIcon';

type Props = { cartItems: CartItem[]; handleSelect: (id: string) => void; selectItems: string[] };

const CartItemList = ({ cartItems, handleSelect, selectItems }: Props) => {
  return (
    <ul
      css={css`
        display: flex;
        flex-direction: column;
        flex: 1;
        min-height: 0;
        list-style: none;
        margin: 0;
        padding: 0;
        overflow-y: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;

        &::-webkit-scrollbar {
          display: none;
        }
      `}
    >
      {cartItems.map((cartItem) => {
        const isSelected = selectItems.includes(cartItem.cartItemId);

        return (
          <li
            key={cartItem.cartItemId}
            css={css`
              display: flex;
              flex-direction: column;
              gap: 12px;
              padding: 12px 0px 20px;
              border-top: 1px solid var(--color-line);
            `}
          >
            <div
              css={css`
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                width: 100%;
              `}
            >
              <OutlineButton
                isActive={isSelected}
                onClick={() => handleSelect(cartItem.cartItemId)}
              >
                <CheckIcon isActive={isSelected} />
              </OutlineButton>

              <OutlineButton variant="text" onClick={() => {}}>
                <p
                  css={css`
                    font: var(--text-label);
                  `}
                >
                  삭제
                </p>
              </OutlineButton>
            </div>

            <CartItemRaw
              image={cartItem.product.image}
              name={cartItem.product.name}
              price={cartItem.product.price}
              quantity={cartItem.quantity}
            ></CartItemRaw>
          </li>
        );
      })}
    </ul>
  );
};
export default CartItemList;
