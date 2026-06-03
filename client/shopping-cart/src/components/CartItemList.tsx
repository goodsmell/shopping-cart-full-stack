import { css } from '@emotion/react';
import CartItem from './CartItem';
import type { CartItemWithProduct } from '../types';
import OutlineButton from './buttons/OutlineButton';
import { CheckIcon } from './icons';

type Props = { cartItems: CartItemWithProduct[] };

const CartItemList = ({ cartItems }: Props) => {
  return (
    <ul
      css={css`
        display: flex;
        flex-direction: column;
        list-style: none;
        margin: 0;
        padding: 0;
      `}
    >
      {cartItems.map((cartItem) => {
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
              <OutlineButton onClick={() => {}}>
                <CheckIcon />
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

            <CartItem
              image={cartItem.image}
              name={cartItem.name}
              price={cartItem.price}
              quantity={cartItem.quantity}
            ></CartItem>
          </li>
        );
      })}
    </ul>
  );
};
export default CartItemList;
