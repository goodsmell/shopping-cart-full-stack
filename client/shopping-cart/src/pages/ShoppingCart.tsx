import { css } from '@emotion/react';
import { useNavigate } from 'react-router';
import AppHeader from '../components/layout/AppHeader';
import PrimaryButton from '../components/buttons/PrimaryButton';
import { getCartList, updateCartQuantity, deleteCartItem } from '../apis/cartApi';
import CartItemList from '../components/cart/CartItemList';
import OutlineButton from '../components/buttons/OutlineButton';
import infoIcon from '../assets/info_icon.svg';
import { CheckIcon } from '../components/icons/CheckIcon';
import { countCartItemTypes, calcOrderAmount, isFreeShipping } from '../utils/cart';
import CartItemSkeleton from '../components/cart/CartItemSkeleton';
import useCartItems from '../hooks/useCartItems';
import useSelectItems from '../hooks/useSelectItems';
import useCartActions from '../hooks/useCartActions';

const ShoppingCart = () => {
  const navigate = useNavigate();
  const { cartItems, setCartItems, isLoading, isError } = useCartItems(getCartList);
  const { selectItems, isAllSelect, handleToggleSelect, handleSelectAll, removeSelectItem } =
    useSelectItems(cartItems);
  const { handleQuantityChange, handleDeleteItem } = useCartActions({
    cartItems,
    setCartItems,
    removeSelectItem,
    updateQuantity: updateCartQuantity,
    deleteItem: deleteCartItem,
  });

  const purchasePrice = calcOrderAmount(cartItems, selectItems);
  const shippingFee = isFreeShipping(purchasePrice) && selectItems.length >= 1 ? 3000 : 0;
  const totalPurchasePrice = purchasePrice + shippingFee;

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
          flex: 1;
          gap: 36px;
          padding: 36px 24px;
          overflow-y: auto;
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
          {cartItems.length !== 0 && (
            <p>현재 {countCartItemTypes(cartItems)} 종류의 상품이 담겨있습니다.</p>
          )}
        </section>

        {isError ? (
          <p
            css={css`
              font: var(--text-label);
              text-align: center;
              flex: 1;
              display: flex;
              align-items: center;
              justify-content: center;
            `}
          >
            장바구니를 불러오는 데 실패했습니다.
          </p>
        ) : isLoading ? (
          <ul
            css={css`
              list-style: none;
              margin: 0;
              padding: 0;
            `}
          >
            {Array.from({ length: 3 }).map((_, i) => (
              <CartItemSkeleton key={i} />
            ))}
          </ul>
        ) : cartItems.length === 0 ? (
          <p
            css={css`
              font: var(--text-label);
              text-align: center;
              flex: 1;
              display: flex;
              align-items: center;
              justify-content: center;
            `}
          >
            장바구니에 담은 상품이 없습니다.
          </p>
        ) : null}
        {!isLoading && cartItems.length > 0 && (
          <>
            <section
              css={css`
                display: flex;
                flex-direction: column;
                gap: 20px;
                max-height: 382px;
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
                onChangeQuantity={(cartItemId, quantity) =>
                  handleQuantityChange(cartItemId, quantity)
                }
                onDelete={(cartItemId) => handleDeleteItem(cartItemId)}
              ></CartItemList>
            </section>
            <section>
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
                      {totalPurchasePrice}
                    </p>
                  </div>
                </section>
              </div>
            </section>
          </>
        )}
      </main>

      <PrimaryButton
        text="주문 확인"
        isDisabled={selectItems.length === 0}
        onClick={() => {
          navigate('/order', {
            state: {
              selectedItems: cartItems.filter((item) => selectItems.includes(item.cartItemId)),
              totalPurchasePrice,
            },
          });
        }}
      />
    </>
  );
};
export default ShoppingCart;
