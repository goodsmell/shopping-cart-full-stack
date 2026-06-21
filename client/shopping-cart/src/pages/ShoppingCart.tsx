import { css } from '@emotion/react';
import { useNavigate } from 'react-router';
import { updateCartSelect } from '../apis/cartApi';
import { deleteCartItem, getCart, updateCartQuantity, updateCartSelectAll } from '../apis/cartApi';
import PrimaryButton from '../components/buttons/PrimaryButton';
import CartContent from '../components/cart/CartContent';
import CartSection from '../components/cart/CartSection';
import OrderSummary from '../components/common/OrderSummary';
import AppHeader from '../components/layout/AppHeader';
import useCart from '../hooks/useCart';
import { countCartItemTypes } from '../utils/cart';
import SectionHeader from '../components/common/SectionHeader';

const ShoppingCart = () => {
  const navigate = useNavigate();
  const { cart, setCart, isLoading, isError } = useCart(getCart);

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>장바구니를 불러오는 데 실패했습니다.</p>;
  if (!cart) return null;

  const handleSelect = async (productId: string) => {
    const targetItem = cart.cartItems.find((item) => item.product.id === productId);
    if (!targetItem) return;

    try {
      await updateCartSelect(productId, !targetItem.checkStatus);
      setCart(await getCart());
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectAll = async () => {
    try {
      await updateCartSelectAll(!cart.isAllSelected);
      setCart(await getCart());
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (productId: string) => {
    try {
      await deleteCartItem(productId);
      setCart(await getCart());
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuantity = async (productId: string, quantity: number) => {
    try {
      await updateCartQuantity(productId, quantity);
      setCart(await getCart());
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
          flex: 1;
          gap: 36px;
          padding: 36px 24px;
          overflow-y: auto;
        `}
      >
        <SectionHeader title="장바구니">
          {cart.cartItems.length !== 0 && (
            <p>현재 {countCartItemTypes(cart.cartItems)} 종류의 상품이 담겨있습니다.</p>
          )}
        </SectionHeader>

        <CartContent cartItems={cart.cartItems} isLoading={isLoading} isError={isError}>
          <CartSection
            cartItems={cart.cartItems}
            isAllSelect={cart.isAllSelected}
            onSelectAll={handleSelectAll}
            onSelect={handleSelect}
            onChangeQuantity={handleQuantity}
            onDelete={handleDelete}
          />
          <OrderSummary data = {cart.payInfo} />
        </CartContent>
      </main>

      <PrimaryButton
        text="주문 확인"
        isDisabled={!cart.cartItems.some((item) => item.checkStatus)}
        onClick={() => {
          navigate('/order-confirm');
        }}
      />
    </>
  );
};

export default ShoppingCart;
