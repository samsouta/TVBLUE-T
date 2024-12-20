import React from 'react'
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'


const NoVideoFound: React.FC = () => {
    const nav = useNavigate();
    const HandleNotFound = () => {
        nav('/home')
        window.location.reload()
    }

    return (
        <div className="min-h-screen  flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-3xl transform -skew-y-6" />
                    <div className="relative bg-white/20 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                        <h1 className="text-7xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 mb-4">
                            404
                        </h1>
                        <p className="text-xl md:text-2xl text-white mb-8">
                            Oops! No Video Found.
                        </p>
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                            <div onClick={HandleNotFound} className="relative block px-8 py-4 bg-black text-white rounded-lg leading-none">
                                <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg opacity-0 group-hover:opacity-50 transition duration-200"></span>
                                <span className="relative flex items-center justify-center text-lg">
                                    <motion.span
                                        initial={{ x: 0 }}
                                        whileHover={{ x: 5 }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                                    >
                                        Return to Home
                                    </motion.span>
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    className="mt-12 text-center text-white/60"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <p className="text-sm">
                        Don't worry, our editors are working hard to recover the lost footage.
                    </p>
                </motion.div>
            </div>
        </div>
    )
}

export default NoVideoFound