import React from 'react'


const TrafficMobileBanner: React.FC = () => {
    return (
        <div className=' w-full px-1 overflow-hidden' >
            {/* mobile */}
            <iframe width="300" height="250" frameborder="0" scrolling="no" src="//tsyndicate.com/iframes2/c10bd9639ad748ac9dbdc81a62ed7fde.html?extid={extid}"></iframe>
            {/* pc */}
            <iframe width="728" height="90" frameborder="0" scrolling="no" src="//tsyndicate.com/iframes2/9844236f63e54cc1ab311e164daf8b38.html?extid={extid}"></iframe>
        </div>
    )
}

export default TrafficMobileBanner