import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router';
import { describe, it, expect, beforeEach } from 'vitest';
import ShoppingCart from './ShoppingCart';
import AppLayout from '../components/layout/AppLayout';

const renderShoppingCart = () => {
  render(
    <BrowserRouter>
      <AppLayout>
        <ShoppingCart />
      </AppLayout>
    </BrowserRouter>,
  );
};

beforeEach(() => {
  localStorage.clear();
});

describe('ShoppingCart', () => {
  it('장바구니 목록을 불러온다', async () => {
    renderShoppingCart();
    await waitFor(() => {
      expect(screen.getByText('데일리 라운드 티셔츠')).toBeInTheDocument();
      expect(screen.getByText('와이드 데님 팬츠')).toBeInTheDocument();
    });
  });

  it('장바구니에 담긴 상품 종류의 수를 표시한다', async () => {
    renderShoppingCart();
    await waitFor(() => {
      expect(screen.getByText('현재 3 종류의 상품이 담겨있습니다.')).toBeInTheDocument();
    });
  });

  it('진입 시 전체 선택이 기본값이다', async () => {
    renderShoppingCart();
    await waitFor(() => {
      expect(screen.getByText('현재 3 종류의 상품이 담겨있습니다.')).toBeInTheDocument();
    });
    const orderButton = screen.getByText('주문 확인');
    expect(orderButton).not.toBeDisabled();
  });

  it('선택한 상품의 주문 금액을 계산한다', async () => {
    renderShoppingCart();
    await waitFor(() => {
      // 10000*2 + 20000*1 + 32000*4 = 168000
      const prices = screen.getAllByText('168,000');
      expect(prices.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('주문 금액이 10만원 이상이면 배송비가 0원이다', async () => {
    renderShoppingCart();
    await waitFor(() => {
      expect(screen.getByText('현재 3 종류의 상품이 담겨있습니다.')).toBeInTheDocument();
    });
    expect(screen.getByTestId('shipping-fee').textContent).toBe('0');
  });

  it('총 결제 금액을 계산한다', async () => {
    renderShoppingCart();
    await waitFor(() => {
      // 168000 + 0 = 168000
      const prices = screen.getAllByText('168,000');
      expect(prices.length).toBeGreaterThanOrEqual(2);
    });
  });

  it('상품을 선택 해제하면 결제 금액이 변경된다', async () => {
    renderShoppingCart();
    const checkboxes = await screen.findAllByRole('button', { pressed: true });
    await userEvent.click(checkboxes[1]);
    await waitFor(() => {
      // 20000*1 + 32000*4 = 148000
      const prices = screen.getAllByText('148,000');
      expect(prices.length).toBeGreaterThanOrEqual(1);
    });
  });
});
