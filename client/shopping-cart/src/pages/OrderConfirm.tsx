import { css } from '@emotion/react';
import { useNavigate, useLocation, Navigate } from 'react-router';
import AppHeader from '../components/layout/AppHeader';
import PrimaryButton from '../components/buttons/PrimaryButton';
import backIcon from '../assets/back_icon.svg';
import type { CartItem } from '../types';
type OrderConfirmState = {
  selectedItems: CartItem[];
  totalPurchasePrice: number;
};

const OrderConfirm = () => {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: OrderConfirmState | null };

  if (!state?.selectedItems || state?.selectedItems.length < 1) {
    return <Navigate to="/" />;
  }
  const totalQuantity = state.selectedItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <AppHeader>
        <button
          css={css`
            background: none;
            border: none;
            cursor: pointer;
          `}
          onClick={() => navigate('/')}
        >
          <img src={backIcon} />
        </button>
      </AppHeader>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        `}
      >
        <h2
          css={css`
            font: var(--text-heading);
          `}
        >
          주문 확인
        </h2>
        <p
          css={css`
            font: var(--text-label);
            text-align: center;
          `}
        >
          총 {state.selectedItems.length}종류의 상품 {totalQuantity}개를 주문합니다.
          <br />
          최종 결제 금액을 확인해주세요.
        </p>
        <section
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
          `}
        >
          <h3
            css={css`
              font: var(--text-subheading);
            `}
          >
            총 결제 금액
          </h3>
          <h2
            css={css`
              font: var(--text-heading);
            `}
          >
            {state.totalPurchasePrice}원
          </h2>
        </section>
      </div>
      <PrimaryButton text="결제하기" onClick={() => {}} />
    </>
  );
};

export default OrderConfirm;
