import type { SVGProps } from 'react';

type CheckIconProps = SVGProps<SVGSVGElement> & {
  isActive?: boolean;
};

export const CheckIcon = ({ isActive = false, ...props }: CheckIconProps) => {
  return (
    <svg
      width="18"
      height="14"
      viewBox="0 0 18 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.59 10.58L1.42 6.41L0 7.82L5.59 13.41L17.59 1.41L16.18 0L5.59 10.58Z"
        fill="currentColor"
        fillOpacity={isActive ? 1 : 0.1}
      />
    </svg>
  );
};
