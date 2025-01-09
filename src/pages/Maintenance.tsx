import React from 'react'
import { motion } from 'framer-motion';
import { MaintenanceIcon } from '../components/UI/maintenance/MaintenanceIcon';
import { MaintenanceMessage } from '../components/UI/maintenance/MaintenanceMessage';
import { LoadingSpinner } from '../components/UI/maintenance/LoadingSpinner';


const Maintenance: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-2xl shadow-xl p-8 md:p-12 w-full max-w-2xl"
      >
        <div className="flex flex-col items-center">
          <MaintenanceIcon />
          <MaintenanceMessage />
          <div className="mt-12">
            <LoadingSpinner />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Maintenance