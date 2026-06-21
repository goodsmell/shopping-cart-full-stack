import AppHeader from '../components/layout/AppHeader';
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import PrimaryButton from '../components/buttons/PrimaryButton';
import { useNavigate } from 'react-router';
import backIcon from '../assets/back_icon.svg';
import { createOrderCheck, getOrderCheck, selectRemoteArea } from '../apis/orderCheckApi';
import { getCoupons, calculateCouponDiscount, applyCoupons } from '../apis/couponApi';
import type { CouponInfo, OrderCheck } from '../types';
import ProductRawSkeleton from '../components/common/ProductRawSkeleton';
import AsyncContent from '../components/common/AsyncContent';
import OrderConfirmBody from '../components/orderCheck/OrderConfirmBody';
import CouponSection from '../components/orderCheck/CouponSection';
import RemoteAreaSelect from '../components/orderCheck/RemoteAreaSelect';

const MAX_SELECTED_COUPON_COUNT = 2;

const OrderConfirm = () => {
  const navigate = useNavigate();

  const [order, setOrder] = useState<OrderCheck>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [couponInfo, setCouponInfo] = useState<CouponInfo>();
  const [selectedCouponIds, setSelectedCouponIds] = useState<string[]>([]);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isRemoteAreaSelected, setIsRemoteAreaSelected] = useState(false);

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

  useEffect(() => {
    if (!isCouponModalOpen) return;

    const loadCoupons = async () => {
      try {
        const data = await getCoupons();
        setCouponInfo(data);
        setSelectedCouponIds(data.selectedCoupons);
        setDiscountAmount(await calculateCouponDiscount(data.selectedCoupons));
      } catch (error) {
        console.error(error);
      }
    };

    loadCoupons();
  }, [isCouponModalOpen]);

  const handleToggleCoupon = async (couponId: string) => {
    const isSelected = selectedCouponIds.includes(couponId);
    if (!isSelected && selectedCouponIds.length >= MAX_SELECTED_COUPON_COUNT) return;

    const nextSelectedCouponIds = isSelected
      ? selectedCouponIds.filter((id) => id !== couponId)
      : [...selectedCouponIds, couponId];

    setSelectedCouponIds(nextSelectedCouponIds);

    try {
      setDiscountAmount(await calculateCouponDiscount(nextSelectedCouponIds));
    } catch (error) {
      console.error(error);
    }
  };

  const handleApplyCoupons = async () => {
    try {
      await applyCoupons(selectedCouponIds);
      setIsCouponModalOpen(false);
      setOrder(await getOrderCheck());
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleRemoteArea = async () => {
    try {
      setIsRemoteAreaSelected(await selectRemoteArea(!isRemoteAreaSelected));
      setOrder(await getOrderCheck());
    } catch (error) {
      console.error(error);
    }
  };

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
                  isModalOpen={isCouponModalOpen}
                  info={couponInfo}
                  selectedIds={selectedCouponIds}
                  discountAmount={discountAmount}
                  onOpen={() => setIsCouponModalOpen(true)}
                  onClose={() => setIsCouponModalOpen(false)}
                  onToggle={handleToggleCoupon}
                  onApply={handleApplyCoupons}
                />
              }
              remoteAreaSection={
                <RemoteAreaSelect
                  isSelected={isRemoteAreaSelected}
                  onToggle={handleToggleRemoteArea}
                />
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
            state: { selectedItems: order.products, totalPurchasePrice: order.payInfo.totalOrderAmount },
          });
        }}
      />
    </>
  );
};

export default OrderConfirm;
