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

const OrderConfirm = () => {
  const navigate = useNavigate();

  const [order, setOrder] = useState<OrderCheck>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

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
          <p>
            현재 {order.products.length}종류의 상품 {totalQuantity}개를 주문합니다. <br /> 최종 결제
            금액을 확인해주세요.
          </p>
        </SectionHeader>

        <OrderCheckItemList products={order.products} />

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
