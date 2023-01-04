import React from 'react';

const Hero = () => {
  return (
    <header className='m-1'>
        <div className="w-full bg-center bg-cover h-[24rem]" style={{backgroundImage: `url(${hero})`}}>
            <div className="flex items-center justify-center w-full h-full bg-gray-900/40">
                <div className="text-start px-6">
                    <h1 className="text-3xl font-semibold text-white lg:text-4xl">Catalog <span className="text-blue-400"></span></h1>
                    <p className="lg:w-[40rem] py-2 mt-4 text-lg font-medium text-white">The black rhinoceros, black rhino or hook-lipped rhinoceros (Diceros bicornis) is a species of rhinoceros, native to 
eastern and southern Africa</p>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Hero;