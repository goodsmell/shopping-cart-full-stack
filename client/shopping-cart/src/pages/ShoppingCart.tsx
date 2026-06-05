import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import AppHeader from '../components/layout/AppHeader';
import PrimaryButton from '../components/buttons/PrimaryButton';
import type { CartItem } from '../types';
import getCartList from '../apis/getCartList';
import updateCartQuantity from '../apis/updateCartQuantity';
import CartItemList from '../components/cart/CartItemList';
import OutlineButton from '../components/buttons/OutlineButton';
import infoIcon from '../assets/info_icon.svg';
import { CheckIcon } from '../components/icons/CheckIcon';
import { countCartItemTypes, calcOrderAmount, isFreeShipping } from '../utils/cart';
import deleteCartItem from '../apis/deleteCartItem';

const ShoppingCart = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectItems, setSelectItems] = useState<string[]>([]);
  const [isAllSelect, setIsAllSelect] = useState<boolean>(false);

  const purchasePrice = calcOrderAmount(cartItems, selectItems);
  const shippingFee = isFreeShipping(purchasePrice) ? 3000 : 0;
  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const data = await getCartList();
        console.log(data);
        setCartItems(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadCartItems();
  }, []);

  const handleToggleSelect = (id: string) => {
    setSelectItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    if (selectItems.length === cartItems.length) {
      setSelectItems([]);
      setIsAllSelect(false);
    } else {
      setSelectItems(cartItems.map((item) => item.cartItemId));
      setIsAllSelect(true);
    }
  };
  const handleQuantityChange = async (cartItemId: string, quantity: number) => {
    try {
      await updateCartQuantity(cartItemId, quantity);
      setCartItems((prev) =>
        prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity } : item)),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteItem = async (cartItemId: string) => {
    try {
      await deleteCartItem(cartItemId);
      setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <AppHeader>
        <h1
          css={css`
            font: var(--text-logo);
            color: var(--color-white);
          `}
        >
          SHOP
        </h1>
      </AppHeader>
      <main
        css={css`
          display: flex;
          flex-direction: column;
          gap: 36px;
          padding: 0 24px;
        `}
      >
        <section
          css={css`
            display: flex;
            flex-direction: column;
            gap: 12px;
          `}
        >
          <h2
            css={css`
              font: var(--text-heading);
            `}
          >
            장바구니
          </h2>
          <p>현재 {countCartItemTypes(cartItems)} 종류의 상품이 담겨있습니다.</p>
        </section>

        <section
          css={css`
            display: flex;
            flex-direction: column;
            gap: 20px;
            max-height: 340px;
          `}
        >
          <div
            css={css`
              display: flex;
              flex-direction: row;
              gap: 8px;
              align-items: center;
            `}
          >
            <OutlineButton onClick={handleSelectAll} isActive={isAllSelect}>
              <CheckIcon isActive={isAllSelect} />
            </OutlineButton>
            <p
              css={css`
                font: var(--text-label);
              `}
            >
              전체 선택
            </p>
          </div>

          <CartItemList
            cartItems={cartItems}
            handleSelect={handleToggleSelect}
            selectItems={selectItems}
            onChangeQuantity={(cartItemId, quantity) => handleQuantityChange(cartItemId, quantity)}
            onDelete={(cartItemId) => handleDeleteItem(cartItemId)}
          ></CartItemList>
        </section>
        <span
          css={css`
            display: flex;
            flex-direction: row;
            gap: 4px;
            align-items: center;
          `}
        >
          <img src={infoIcon} />
          <p
            css={css`
              font: var(--text-label);
            `}
          >
            총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
          </p>
        </span>

        <div>
          {/* 주문금액 + 배송비 */}
          <section
            css={css`
              display: flex;
              flex-direction: column;
              gap: 8px;
              border-top: 1px solid var(--color-line);
            `}
          >
            <div
              css={css`
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                padding: 8px 0;
              `}
            >
              <h3
                css={css`
                  font: var(--text-subheading);
                `}
              >
                주문 금액
              </h3>
              <p
                css={css`
                  font: var(--text-heading);
                `}
              >
                {purchasePrice}
              </p>
            </div>

            <div
              css={css`
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;

                padding: 8px 0;
              `}
            >
              <h3
                css={css`
                  font: var(--text-subheading);
                `}
              >
                배송비
              </h3>
              <p
                css={css`
                  font: var(--text-heading);
                `}
              >
                {shippingFee}
              </p>
            </div>
          </section>
          {/* 총 결제금액 */}
          <section
            css={css`
              border-top: 1px solid var(--color-line);
            `}
          >
            <div
              css={css`
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;

                padding: 8px 0;
              `}
            >
              <h3
                css={css`
                  font: var(--text-subheading);
                `}
              >
                총 결제 금액
              </h3>
              <p
                css={css`
                  font: var(--text-heading);
                `}
              >
                {purchasePrice + shippingFee}
              </p>
            </div>
          </section>
        </div>
      </main>

      <PrimaryButton
        text="주문 확인"
        onClick={() => {
          navigate('/order', {
            state: {
              selectedItems: cartItems.filter((item) => selectItems.includes(item.cartItemId)),
              purchasePrice,
            },
          });
        }}
      />
    </>
  );
};
export default ShoppingCart;
