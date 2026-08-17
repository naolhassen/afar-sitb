import React from 'react';

interface WaveDividerProps {
  color?: string;
  flip?: boolean;
}

export const WaveDivider: React.FC<WaveDividerProps> = ({
  color = '#ffffff',
  flip = false
}) => {
  return (
    <div
      className={`w-full overflow-hidden leading-none ${
        flip ? 'rotate-180 -mt-1' : '-mb-1'
      }`}
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block w-full h-10 sm:h-14 lg:h-16"
        fill={color}
      >
        <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,50 L1200,120 L0,120 Z" />
      </svg>
    </div>
  );
};
