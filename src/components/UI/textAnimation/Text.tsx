import React from 'react';
import ScrollBaseAnimation from '../../../utils/ScrollBaseAnimation';

function Text() {
    return (
        <>
            <div className='h-[100px] grid place-content-center'>
                <ScrollBaseAnimation
                    // delay={500}
                    baseVelocity={4}
                    scrollDependent={true}
                    clasname='font-bold open-sans text-white text-2xl md:text-4xl tracking-[-0.07em] leading-[90%]'
                >
                    Donation & Supporting Admin
                    
                    
                </ScrollBaseAnimation>
            </div>
        </>
    );
}

export default Text;
