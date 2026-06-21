import AppHeader from '../components/layout/AppHeader';
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import PrimaryButton from '../components/buttons/PrimaryButton';
import OrderSummary from '../components/common/OrderSummary';
import { useNavigate } from 'react-router';
import backIcon from '../assets/back_icon.svg';
import SectionHeader from '../components/common/SectionHeader';
import { createOrderCheck, getOrderCheck } from '../apis/orderCheckApi';
import type { OrderCheck } from '../types';
import OrderCheckItemList from '../components/orderCheck/OrderCheckItemList';
import ProductRawSkeleton from '../components/common/ProductRawSkeleton';
import OutlineButton from '../components/buttons/OutlineButton';
import { CheckIcon } from '../components/icons/CheckIcon';
import ModalLayout from '../components/common/Modal';
import InfoNotice from '../components/common/InfoNotice';

const OrderConfirm = () => {
  const navigate = useNavigate();

  const [order, setOrder] = useState<OrderCheck>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);

  useEffect(() => {
    const loadOrderCheck = async () => {
      try {
        await createOrderCheck();
        const data = await getOrderCheck();
        setOrder(data);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadOrderCheck();
  }, []);

  if (isLoading) {
    return (
      <ul
        css={css`
          list-style: none;
          margin: 0;
          padding: 0;
        `}
      >
        {Array.from({ length: 3 }).map((_, i) => (
          <ProductRawSkeleton key={i} />
        ))}
      </ul>
    );
  }
  if (isError) return <p>주문 확인 정보를 불러오는 데 실패했습니다.</p>;
  if (!order) return null;

  const totalQuantity = order.products.reduce((acc, product) => acc + product.quantity, 0);

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
          <p
            css={css`
              font: var(--text-label);
            `}
          >
            총 {order.products.length}종류의 상품 {totalQuantity}개를 주문합니다. <br /> 최종 결제
            금액을 확인해주세요.
          </p>
        </SectionHeader>

        <OrderCheckItemList products={order.products} />

        <button
          css={css`
            width: 100%;
            height: 48px;
            flex-shrink: 0;
            justify-content: center;
            align-items: center;
            border-radius: 5px;
            border: 1px solid #33333340;
            background: none;

            cursor: pointer;
          `}
          onClick={() => setIsCouponModalOpen(true)}
        >
          <p
            css={css`
              font: var(--text-button);
              color: #333333bf;
            `}
          >
            쿠폰 적용
          </p>
        </button>

        <ModalLayout
          isOpen={isCouponModalOpen}
          onClose={() => setIsCouponModalOpen(false)}
          title="쿠폰을 선택해 주세요"
        >
          <InfoNotice text="쿠폰은 최대 2개까지 사용할 수 있습니다." />

          <ul>
            <li></li>
          </ul>
        </ModalLayout>
        {/* 배송정보 */}
        <section>
          <p
            css={css`
              font: var(--text-subheading);
              color: #0a0d13;
            `}
          >
            배송 정보
          </p>
          <div
            css={css`
              display: flex;
              gap: 8px;
            `}
          >
            <OutlineButton isActive={() => {}} onClick={() => {}}>
              <CheckIcon isActive={true} />
            </OutlineButton>
            <p
              css={css`
                font: var(--text-label);
              `}
            >
              제주도 및 도서 산간 지역
            </p>
          </div>
        </section>

        <OrderSummary data={order.payInfo} />
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
