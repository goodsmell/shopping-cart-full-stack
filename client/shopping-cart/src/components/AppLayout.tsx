import { css } from '@emotion/react';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const AppLayout = ({ children }: Props) => {
  return (
    <div
      css={css`
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 100vw;
          height: 100vh;
          max-height: 936px;
          max-width: 430px;
          background-color: var(--color-white);
        `}
      >
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
