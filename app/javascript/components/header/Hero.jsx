import React from 'react';
import About from '../modal/About';

const Hero = () => {
  return (
    <header className='m-1'>
        <div className="lg:w-100 bg-center bg-cover h-[24rem]" style={{backgroundImage: `url(${hero})`}}>
            <div className="flex items-center justify-end w-full lg:h-full bg-gray-900/40">
                <div className="px-6 m-6 lg:mx-4 backdrop-blur-lg">
                    <p className="lg:w-[34rem] overflow-hidden h-[14.5rem] py-2 mt-4 text-lg font-medium text-white">
                    Headquartered in Harare with support from Berlin and London, Stones of Zimbabwe is passionate about promoting the work of some of the finest Zimbabwean sculptors. By hosting exhibitions around the world and offering sculptures for sale online, we let you experience some of the finest contemporary stone sculptures. As part of our mission, we give relief to people living in the worst distress and hardship lives so that they may have the opportunity to develop and live fulfilling and worthwhile lives.</p>
                    <div className='text-end w-full'>
                      <About />
                    </div>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Hero;