import { css } from '@emotion/react';
import minusIcon from '../../assets/minus_icon.svg';
import plusIcon from '../../assets/plus_icon.svg';
import OutlineButton from '../buttons/OutlineButton';

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
      <OutlineButton onClick={onDecrease} disabled={quantity <= 1}>
        <img src={minusIcon} />
      </OutlineButton>
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
      <OutlineButton onClick={onIncrease} disabled={quantity >= 99}>
        <img src={plusIcon} />
      </OutlineButton>
    </div>
  );
};

export default QuantityControl;
