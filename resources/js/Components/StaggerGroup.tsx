import React, { ReactNode } from 'react';
import { motion, type Variants } from 'motion/react';

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
}

export const StaggerGroup: React.FC<StaggerGroupProps> = ({
  children,
  className,
}) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={container}
    >
      {children}
    </motion.div>
  );
};

export interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  className,
  onClick,
}) => {
  return (
    <motion.div className={className} variants={item} onClick={onClick}>
      {children}
    </motion.div>
  );
};
