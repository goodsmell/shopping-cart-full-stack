import { css } from '@emotion/react';
import infoIcon from '../../assets/info_icon.svg';
import { formatPrice } from '../../utils/cart';
import type { PayInfo } from '../../types';

type Props = {
  data: Omit<PayInfo, 'couponDiscountAmount'> & Partial<Pick<PayInfo, 'couponDiscountAmount'>>;
};

const OrderSummary = ({ data }: Props) => {
  return (
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
              {formatPrice(data.orderPrice)}원
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
              data-testid="shipping-fee"
              css={css`
                font: var(--text-heading);
              `}
            >
              {formatPrice(data.deliveryFee)}원
            </p>
          </div>

          {data.couponDiscountAmount !== undefined && (
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
                할인 금액
              </h3>
              <p
                css={css`
                  font: var(--text-heading);
                `}
              >
                -{formatPrice(data.couponDiscountAmount ?? 0)}원
              </p>
            </div>
          )}
        </section>

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
              {formatPrice(data.totalOrderAmount)}원
            </p>
          </div>
        </section>
      </div>
    </section>
  );
};

export default OrderSummary;
