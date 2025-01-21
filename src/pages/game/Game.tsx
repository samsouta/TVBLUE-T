import React from 'react'
import ExoMobileBanner from '../../components/ads/EXoClick/ExoMobileBanner';
import ExoPcBanner from '../../components/ads/EXoClick/ExoPcBanner';
import TrafficMobileBanner from '../../components/ads/trafficstar/TrafficMobileBanner';
import TrafficPCBanner from '../../components/ads/trafficstar/TrafficPCBanner';
import ExoRecommendationWidget from '../../components/ads/EXoClick/ExoRecommendationWidget';
import ExoOutstreamVideo from '../../components/ads/EXoClick/ExoOutstreamVideo';
import ExoMixbanner from '../../components/ads/EXoClick/ExoMixbanner';
import TrafficNative from '../../components/ads/trafficstar/trafficNative';


const Game: React.FC = () => {


    return (
        <div>
            {/* ADS ZONE */}
            {/* Mobile */}
            <div className=' w-full flex flex-wrap justify-center' >
                <ExoPcBanner />
                <ExoMobileBanner />
                <TrafficMobileBanner />
            </div>
            {/* PC */}
            <div className="hidden xl:block">
                <div className=' w-full flex justify-center' ><TrafficPCBanner /></div>
            </div>
            {/* ADS END  */}

            {/* ads */}
            <ExoRecommendationWidget />
            <ExoOutstreamVideo />
            {/* ads end  */}

            {/* ads */}
            <ExoMixbanner />
            <TrafficNative />
            {/* ads end */}
        </div>
    );
};

export default Game;
