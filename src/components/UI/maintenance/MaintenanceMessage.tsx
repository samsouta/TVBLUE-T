import { motion } from 'framer-motion';

export const MaintenanceMessage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        Under Maintenance
      </h1>
      <p className="text-lg md:text-xl text-gray-600 max-w-md mx-auto">
        We're currently updating our site to bring you an even better experience.
        Please check back soon!
      </p>
    </motion.div>
  );
};