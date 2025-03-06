import { motion } from 'framer-motion';

export const LoadingSpinner = () => {
  return (
    <motion.div
      className="w-16 h-16 border-4 border-blue-500 rounded-full border-t-transparent"
      animate={{
        rotate: 360
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
};