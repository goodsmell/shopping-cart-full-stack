import { css } from '@emotion/react';
import minus from '../assets/minus_icon.svg';
import plus from '../assets/plus_icon.svg';

type Props = {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

const QuantityControl = ({ quantity, onIncrease, onDecrease }: Props) => {
  return (
    <div
      css={css`
        display: inline-flex;
        flex-direction: row;
        gap: 4px;
      `}
    >
      <button
        css={css`
          display: flex;
          width: 24px;
          height: 24px;
          border: 1px solid var(--color-line);
          border-radius: 8px;
          align-items: center;
          justify-content: center;
          background: none;
          cursor: pointer;
          &:hover {
            background: #f0f0f0;
          }
        `}
        onClick={onDecrease}
      >
        <img src={minus} />
      </button>
      <p
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
        `}
      >
        {quantity}
      </p>
      <button
        css={css`
          display: flex;
          width: 24px;
          height: 24px;
          border: 1px solid var(--color-line);
          border-radius: 8px;
          align-items: center;
          justify-content: center;
          background: none;
          cursor: pointer;
          &:hover {
            background: #f0f0f0;
          }
        `}
        onClick={onIncrease}
      >
        <img src={plus} />
      </button>
    </div>
  );
};

export default QuantityControl;
