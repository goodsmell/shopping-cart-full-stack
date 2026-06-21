import { useEffect, useState } from 'react';
import { applyCoupons, calculateCouponDiscount, getCoupons } from '../apis/couponApi';
import type { CouponInfo } from '../types';

const MAX_SELECTED_COUPON_COUNT = 2;

const useCoupon = (onApplied: () => void) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [info, setInfo] = useState<CouponInfo>();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [discountAmount, setDiscountAmount] = useState(0);

  useEffect(() => {
    if (!isModalOpen) return;

    const loadCoupons = async () => {
      try {
        const data = await getCoupons();
        setInfo(data);
        setSelectedIds(data.selectedCoupons);
        setDiscountAmount(await calculateCouponDiscount(data.selectedCoupons));
      } catch (error) {
        console.error(error);
      }
    };

    loadCoupons();
  }, [isModalOpen]);

  const toggle = async (couponId: string) => {
    const isSelected = selectedIds.includes(couponId);
    if (!isSelected && selectedIds.length >= MAX_SELECTED_COUPON_COUNT) return;

    const nextSelectedIds = isSelected
      ? selectedIds.filter((id) => id !== couponId)
      : [...selectedIds, couponId];

    setSelectedIds(nextSelectedIds);

    try {
      setDiscountAmount(await calculateCouponDiscount(nextSelectedIds));
    } catch (error) {
      console.error(error);
    }
  };

  const apply = async () => {
    try {
      await applyCoupons(selectedIds);
      setIsModalOpen(false);
      onApplied();
    } catch (error) {
      console.error(error);
    }
  };

  return {
    isModalOpen,
    info,
    selectedIds,
    discountAmount,
    open: () => setIsModalOpen(true),
    close: () => setIsModalOpen(false),
    toggle,
    apply,
  };
};

export default useCoupon;
