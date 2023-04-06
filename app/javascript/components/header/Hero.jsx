import React from 'react';
import {
  Button
} from "@material-tailwind/react";

const Hero = () => {
  return (
    <header className='m-1'>
        <div className="w-100 bg-center bg-cover h-full lg:h-[24rem]" style={{backgroundImage: `url(${hero})`}}>
            <div className="flex items-center justify-end w-full lg:h-full bg-gray-900/40">
                <div className="px-6 m-6 lg:mx-4 backdrop-blur-lg">
                    <p className="lg:w-[34rem] lg:h-[14rem] py-2 mt-4 text-lg font-medium text-white">
                    Headquartered in Harare with support from Berlin and London, Stones of Zimbabwe is passionate about promoting the work of some of the finest Zimbabwean sculptors. By hosting exhibitions around the world and offering sculptures for sale online, we let you experience some of the finest contemporary stone sculptures. As part of our mission, we give relief to people living in the worst distress and hardship lives so that they may have the opportunity to develop and live fulfilling and worthwhile lives.</p>
                    <div className='text-end'>
                      <Button size="lg" style={{borderRadius: 0}} color="white" className="mt-5 mb-3">
                        Learn More
                      </Button>
                    </div>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Hero;