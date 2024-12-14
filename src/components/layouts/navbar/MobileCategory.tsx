import { motion } from 'framer-motion';
import { Film } from 'lucide-react';
import { useGetAllgenreQuery } from '../../../redux/api/getAllGern';
import MobileCategoryChild from './MobileCategoryChild';
import { useContext } from 'react';
import { StateContext } from '../../../context/StateContext';

type GenType = {
    genres: string[]
}
type GenProp = {
    data: GenType;
}

const Categories = () => {
    const { data } = useGetAllgenreQuery<GenProp>()
    const genList = data?.genres
    const context = useContext(StateContext);
    
      if (!context) {
        throw new Error('StateContext not found');
      }
    
      const { typePage } = context;

    return (
        <div className=' block xl:hidden' >
            <div className=" mt-12 flex flex-col gap-y-3 ">
                <h1 className="text-2xl flex gap-x-2 items-center">
                    <span className="text-[var(--light-blue)] playfair-display">Categories</span>
                    {/* Applying Framer Motion animation to the Film icon */}
                    <motion.div
                        animate={{
                            rotate: [0, 15, -15, 0], // Rotate the icon for a bouncing effect
                            scale: [1, 1.2, 1], // Scale animation
                            opacity: [1, 0.8, 1], // Fade in and out for a smooth effect
                        }}
                        transition={{
                            duration: 2, // Duration for one cycle
                            repeat: Infinity, // Repeat the animation infinitely
                            repeatType: 'loop', // Loop the animation
                            ease: 'easeInOut', // Smooth easing for the animation
                        }}
                    >
                        <Film className="text-[var(--dark-blue)]" />
                    </motion.div>
                </h1>
                <div className="flex flex-wrap gap-4 lg:gap-4 w-full lg:w-auto">
                    {
                        typePage === 'Video' &&
                        <MobileCategoryChild
                            data={genList}
                        />
                    }
                </div>
            </div>
        </div>
    );
};

export default Categories;
