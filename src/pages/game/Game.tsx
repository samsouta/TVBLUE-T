import React from 'react'
import ExoMobileInstantMessage from '../../components/ads/EXoClick/ExoMobileInstantMessage';
import ExoMobileBanner from '../../components/ads/EXoClick/ExoMobileBanner';
import ExoMobileFullpage from '../../components/ads/EXoClick/ExoMobileFullpage';
import ExoPcBanner from '../../components/ads/EXoClick/ExoPcBanner';
import ExoPCStickyBanner from '../../components/ads/EXoClick/ExoPCStickyBanner';
import ExoDesktopFullpage from '../../components/ads/EXoClick/ExoDesktopFullpage';
import ExoOutstreamVideo from '../../components/ads/EXoClick/ExoOutstreamVideo';
import ExoRecommendationWidget from '../../components/ads/EXoClick/ExoRecommendationWidget';
import ExoInPagePushNotifications from '../../components/ads/EXoClick/ExoInPagePushNotifications';
import TrafficMobileBanner from '../../components/ads/trafficstar/TrafficMobileBanner';
import TrafficPCBanner from '../../components/ads/trafficstar/TrafficPCBanner';
import TrafficNative from '../../components/ads/trafficstar/trafficNative';


const Game: React.FC = () => {


    return (
        <div>
            {/* ads */}
            {/* Mobile */}
            <div className=' block md:hidden' >
                <ExoMobileInstantMessage />
                <TrafficMobileBanner/>
                <ExoMobileBanner />
                <ExoMobileFullpage />
            </div>
            {/* PC */}
            <div className="hidden md:block">
                <ExoPcBanner />
                <TrafficPCBanner/>
                <ExoPCStickyBanner />
                <ExoDesktopFullpage />
            </div>
            {/* ads end  */}
            {/* ads */}
            <ExoRecommendationWidget />
            <TrafficNative/>
            <ExoInPagePushNotifications />
            {/* ads end */}
            {/* ads */}
            <ExoOutstreamVideo />
            {/* ads end  */}


        </div>
    );
};

export default Game;
