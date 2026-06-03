import { css } from '@emotion/react';

import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const AppHeader = ({ children }: Props) => {
  return (
    <header
      css={css`
        display: flex;
        align-items: center;
        height: 64px;
        background-color: var(--color-main);
        padding: 0 24px;
      `}
    >
      {children}
    </header>
  );
};

export default AppHeader;
