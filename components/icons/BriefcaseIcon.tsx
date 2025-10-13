
import React from 'react';

const BriefcaseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.25 14.15v4.07a2.25 2.25 0 0 1-2.25 2.25H5.998a2.25 2.25 0 0 1-2.25-2.25v-4.07a2.25 2.25 0 0 1 .521-1.458l2.25-3.375a2.25 2.25 0 0 1 1.848-1.042h6.336a2.25 2.25 0 0 1 1.848 1.042l2.25 3.375a2.25 2.25 0 0 1 .521 1.458Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 1.5v2.25m-4.5 0h9"
    />
  </svg>
);

export default BriefcaseIcon;
