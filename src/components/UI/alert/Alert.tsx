import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { cn } from '../../../lib/utils';

export type AlertVariant = 'success' | 'error' | 'info';

interface AlertProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  variant?: AlertVariant;
}

const variants = {
  success: {
    icon: CheckCircle2,
    bgColor: 'bg-[#009176]',
    textColor: 'text-[#f7f3e8]',
  },
  error: {
    icon: AlertCircle,
    bgColor: 'bg-red-600',
    textColor: 'text-[#f7f3e8]',
  },
  info: {
    icon: Info,
    bgColor: 'bg-[#b8860b]',
    textColor: 'text-[#f7f3e8]',
  },
};

export const Alert: React.FC<AlertProps> = ({
  isOpen,
  onClose,
  title,
  message,
  variant = 'info',
}) => {
  const { icon: Icon, bgColor, textColor } = variants[variant];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-20 right-4 left-4 md:left-auto md:w-96 z-[250]"
        >
          <div
            className={cn(
              'rounded-lg shadow-lg overflow-hidden',
              'border border-[#d2b48c]/20',
              'backdrop-blur-sm bg-[#f7f3e8]/95'
            )}
          >
            <div
              className={cn(
                'px-4 py-2 flex items-center justify-between',
                bgColor,
                textColor
              )}
            >
              <div className="flex items-center space-x-2">
                <Icon className="w-5 h-5" />
                <h3 className="font-semibold">{title}</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:bg-black/10 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 bg-gradient-to-b from-[#fff9e8] to-[#f7f3e8]">
              <p className="text-[#593d23]">{message}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};