import AppHeader from '../components/layout/AppHeader';
import { css } from '@emotion/react';
import PrimaryButton from '../components/buttons/PrimaryButton';
import { useNavigate } from 'react-router';
import backIcon from '../assets/back_icon.svg';
import SectionHeader from '../components/SectionHeader';
const OrderConfirm = () => {
  const navigate = useNavigate();

  // 구매한 item을 요청

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
      <main
        css={css`
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 36px;
          padding: 36px 24px;
          overflow-y: auto;
        `}
      >
        <SectionHeader title="주문 확인">
          <p>
            현재 1종류의 상품 2개를 주문합니다. <br /> 최종 결제 금액을 확인해주세요.
          </p>
        </SectionHeader>
      </main>

      <PrimaryButton
        text="결제 하기"
        onClick={() => {
          navigate('/payments-confirm');
        }}
      />
    </>
  );
};

export default OrderConfirm;
