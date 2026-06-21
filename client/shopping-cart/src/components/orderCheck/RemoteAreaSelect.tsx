import { css } from '@emotion/react';
import OutlineButton from '../buttons/OutlineButton';
import { CheckIcon } from '../icons/CheckIcon';

type Props = {
  isSelected: boolean;
  onToggle: () => void;
};

const RemoteAreaSelect = ({ isSelected, onToggle }: Props) => {
  return (
    <section
      css={css`
        display: flex;
        flex-direction: column;
        gap: 16px;
      `}
    >
      <p
        css={css`
          font: var(--text-subheading);
          color: #0a0d13;
        `}
      >
        배송 정보
      </p>
      <div
        css={css`
          display: flex;
          align-items: center;
          gap: 8px;
        `}
      >
        <OutlineButton isActive={isSelected} onClick={onToggle}>
          <CheckIcon isActive={isSelected} />
        </OutlineButton>
        <p
          css={css`
            font: var(--text-label);
          `}
        >
          제주도 및 도서 산간 지역
        </p>
      </div>
    </section>
  );
};

export default RemoteAreaSelect;
