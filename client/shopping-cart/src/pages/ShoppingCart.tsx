import { css } from '@emotion/react';
import AppHeader from '../components/AppHeader';
import PrimaryButton from '../components/buttons/PrimaryButton';

const ShoppingCart = () => {
  return (
    <>
      <AppHeader>
        <p
          css={css`
            font: var(--text-logo);
            color: var(--color-white);
          `}
        >
          SHOP
        </p>
      </AppHeader>
      <PrimaryButton text="주문 확인" onClick={() => {}} />
    </>
  );
};
export default ShoppingCart;
