import { css } from '@emotion/react';
import { formatPrice } from '../../utils/cart';
import QuantityControl from './QuantityControl';

type Props = {
  image: string;
  name: string;
  price: number;
  quantity: number;
  onChangeQuantity: (quantity: number) => void;
};

const CartItemRaw = ({ image, name, price, quantity, onChangeQuantity }: Props) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        gap: 24px;
        align-items: flex-start;
      `}
    >
      <img
        src={image}
        css={css`
          width: 112px;
          height: 112px;
          border-radius: 8px;
        `}
      ></img>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin: auto 0;
          flex: 1;
          min-width: 0;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 4px;
            min-width: 0;
          `}
        >
          <label
            css={css`
              display: block;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font: var(--text-label);
            `}
          >
            {name}
          </label>
          <p
            css={css`
              font: var(--text-heading);
            `}
          >
            {formatPrice(price)}원
          </p>
        </div>

        <QuantityControl
          quantity={quantity}
          onDecrease={() => onChangeQuantity(quantity - 1)}
          onIncrease={() => onChangeQuantity(quantity + 1)}
        />
      </div>
    </div>
  );
};
export default CartItemRaw;
