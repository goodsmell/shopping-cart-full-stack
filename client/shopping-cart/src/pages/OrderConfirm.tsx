import { css } from '@emotion/react';
import { useNavigate } from 'react-router';

import AppHeader from '../components/layout/AppHeader';
import ProductRawSkeleton from '../components/common/ProductRawSkeleton';
import AsyncContent from '../components/common/AsyncContent';
import OrderConfirmBody from '../components/orderCheck/OrderConfirmBody';
import CouponSection from '../components/orderCheck/CouponSection';
import RemoteAreaSelect from '../components/orderCheck/RemoteAreaSelect';

import useOrderCheck from '../hooks/useOrderCheck';
import useCoupon from '../hooks/useCoupon';
import useRemoteArea from '../hooks/useRemoteArea';
import PrimaryButton from '../components/buttons/PrimaryButton';
import backIcon from '../assets/back_icon.svg';
import { getOrderCheck } from '../apis/orderCheckApi';

const OrderConfirm = () => {
  const navigate = useNavigate();

  const { order, setOrder, isLoading, isError } = useOrderCheck();
  const refreshOrder = async () => setOrder(await getOrderCheck());
  const coupon = useCoupon(refreshOrder);
  const remoteArea = useRemoteArea(refreshOrder);

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
        <AsyncContent
          isLoading={isLoading}
          isError={isError}
          loadingFallback={
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
          }
          errorFallback={<p>주문 확인 정보를 불러오는 데 실패했습니다.</p>}
        >
          {order && (
            <OrderConfirmBody
              order={order}
              couponSection={
                <CouponSection
                  isModalOpen={coupon.isModalOpen}
                  info={coupon.info}
                  selectedIds={coupon.selectedIds}
                  discountAmount={coupon.discountAmount}
                  onOpen={coupon.open}
                  onClose={coupon.close}
                  onToggle={coupon.toggle}
                  onApply={coupon.apply}
                />
              }
              remoteAreaSection={
                <RemoteAreaSelect isSelected={remoteArea.isSelected} onToggle={remoteArea.toggle} />
              }
            />
          )}
        </AsyncContent>
      </main>

      <PrimaryButton
        text="결제 하기"
        isDisabled={!order}
        onClick={() => {
          if (!order) return;
          navigate('/payment-confirm', {
            state: {
              selectedItems: order.products,
              totalPurchasePrice: order.payInfo.totalOrderAmount,
            },
          });
        }}
      />
    </>
  );
};

export default OrderConfirm;
