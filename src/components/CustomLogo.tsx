import * as React from 'react';

// Custom logo component - Elegant T monogram with modern design
export const CustomLogo = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Modern T design with rounded corners */}
      {/* Top horizontal bar */}
      <rect
        x="15"
        y="15"
        width="50"
        height="12"
        rx="6"
        fill="currentColor"
      />
      {/* Vertical stem */}
      <rect
        x="35"
        y="15"
        width="10"
        height="50"
        rx="5"
        fill="currentColor"
      />
      {/* Decorative accent - small circle at bottom */}
      <circle
        cx="40"
        cy="70"
        r="4"
        fill="currentColor"
        className="opacity-60"
      />
    </svg>
  );
};

