import { css } from '@emotion/react';
import type { CartItem } from '../../types';
import OutlineButton from '../buttons/OutlineButton';
import { CheckIcon } from '../icons/CheckIcon';
import ProductRaw from '../common/ProductRaw';
import QuantityControl from './QuantityControl';
type Props = {
  cartItems: CartItem[];
  handleSelect: (id: string) => void;
  onChangeQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  onDelete: (cartItemId: string) => Promise<void>;
};

const CartItemList = ({ cartItems, handleSelect, onChangeQuantity, onDelete }: Props) => {
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
        return (
          <li
            key={cartItem.product.id}
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
                isActive={cartItem.checkStatus}
                onClick={() => handleSelect(cartItem.product.id)}
              >
                <CheckIcon isActive={cartItem.checkStatus} />
              </OutlineButton>

              <OutlineButton variant="text" onClick={() => onDelete(cartItem.product.id)}>
                <p
                  css={css`
                    font: var(--text-label);
                  `}
                >
                  삭제
                </p>
              </OutlineButton>
            </div>

            <ProductRaw
              image={cartItem.product.imgUrl}
              name={cartItem.product.name}
              price={cartItem.product.price}
            >
              <QuantityControl
                quantity={cartItem.quantity}
                onDecrease={() => onChangeQuantity(cartItem.product.id, cartItem.quantity - 1)}
                onIncrease={() => onChangeQuantity(cartItem.product.id, cartItem.quantity + 1)}
              />
            </ProductRaw>
          </li>
        );
      })}
    </ul>
  );
};

export default CartItemList;
