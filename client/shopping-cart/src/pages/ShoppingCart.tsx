import { css } from '@emotion/react';
import { useNavigate } from 'react-router';
import AppHeader from '../components/layout/AppHeader';
import PrimaryButton from '../components/buttons/PrimaryButton';
import { getCartList, updateCartQuantity, deleteCartItem } from '../apis/cartApi';
import { countCartItemTypes, calcOrderAmount, isFreeShipping } from '../utils/cart';
import CartContent from '../components/cart/CartContent';
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

        <CartContent
          cartItems={cartItems}
          selectItems={selectItems}
          isAllSelect={isAllSelect}
          isLoading={isLoading}
          isError={isError}
          purchasePrice={purchasePrice}
          shippingFee={shippingFee}
          totalPurchasePrice={totalPurchasePrice}
          onSelectAll={handleSelectAll}
          onSelect={handleToggleSelect}
          onChangeQuantity={handleQuantityChange}
          onDelete={handleDeleteItem}
        />
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
