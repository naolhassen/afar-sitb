import React, { useEffect, useState } from 'react';

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  suffix = '',
  duration = 1800
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};
