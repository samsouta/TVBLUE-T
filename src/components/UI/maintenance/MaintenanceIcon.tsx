import { motion } from 'framer-motion';
import { FiTool } from 'react-icons/fi';

export const MaintenanceIcon = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.2, rotate: 180 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="text-6xl text-blue-500 mb-8"
    >
      <FiTool />
    </motion.div>
  );
};