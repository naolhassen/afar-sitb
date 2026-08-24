import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import type { ReactNode } from 'react';

export default function HeroVisual({
  src,
  alt,
  badges,
  imgClassName = '',
}: {
  src: string;
  alt: string;
  badges?: ReactNode[];
  imgClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), {
    stiffness: 150,
    damping: 20,
  });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex justify-center [perspective:1200px]"
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative h-56 w-56 sm:h-72 sm:w-72"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-[-14px] rounded-full border-2 border-dashed border-blue-300/60 pointer-events-none"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-[-28px] rounded-full border border-purple-300/40 pointer-events-none"
        />
        <div className="animate-pulse-glow absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400/30 via-transparent to-purple-400/30 blur-md pointer-events-none" />
        <div className="relative h-full w-full overflow-hidden rounded-full ring-8 ring-white shadow-2xl bg-white">
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            className={`h-full w-full object-cover transition-transform duration-500 ${imgClassName}`}
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              if (!target.src.endsWith('/logo.jpg')) {
                target.src = '/logo.jpg';
              }
            }}
          />
        </div>
      </motion.div>

      {badges?.map((badge, i) => (
        <motion.div
          key={i}
          className={`cg-card absolute rounded-xl px-4 py-3 text-center shadow-lg border border-zinc-200/80 bg-white/95 backdrop-blur-sm z-10 ${
            i === 0 ? '-left-4 top-6 sm:-left-8' : i === 1 ? '-right-4 bottom-8 sm:-right-8' : 'left-1/2 -bottom-6 -translate-x-1/2'
          }`}
          animate={{ y: [0, i === 0 ? -8 : 8, 0] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
        >
          {badge}
        </motion.div>
      ))}
    </div>
  );
}
