import React from 'react';

const LightbulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
        d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.311a7.5 7.5 0 0 1-7.5 0c-1.42-1.42-2.311-3.75-2.311-6.342 0-1.42.343-2.774 1.002-4.006l.002-.001a7.5 7.5 0 0 1 11.312 0l.002.001a11.956 11.956 0 0 1 1.002 4.006c0 2.592-.891 4.922-2.311 6.342Z" 
    />
  </svg>
);

export default LightbulbIcon;
