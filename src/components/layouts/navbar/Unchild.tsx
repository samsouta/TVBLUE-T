import React from 'react'
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
interface CategoryCardProps {
    title: string;
    description: string;
    imageUrl: string;
  }

const MobileCategoryBtnChild: React.FC<CategoryCardProps> = ({title, description, imageUrl}) => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                className="overflow-hidden rounded-xl bg-white shadow-lg transition-shadow hover:shadow-xl"
            >
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative h-48 overflow-hidden"
                >
                    <img
                        src={imageUrl}
                        alt={title}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#062654]/50 to-transparent" />
                </motion.div>

                <div className="p-6">
                    <h3 className="mb-2 text-xl font-semibold text-[#062654]">{title}</h3>
                    <p className="mb-4 text-sm text-[#2265A2]">{description}</p>

                    <motion.button
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 text-sm font-medium text-[#2265A2] transition-colors hover:text-[#062654]"
                    >
                        Learn More
                        <ArrowRight className="h-4 w-4" />
                    </motion.button>
                </div>
            </motion.div>
        </>
    )
}

export default React.memo(MobileCategoryBtnChild);