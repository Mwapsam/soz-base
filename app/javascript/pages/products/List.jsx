import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Button, CardHeader, Typography } from "@material-tailwind/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useProductFetch from '../hooks/useProductFetch';
import Hero from '../../components/header/Hero';
import useCart from '../hooks/useCart';
import { Vision } from '../../components';

const List = () => {
  const {latest, isFetchingLatest} = useProductFetch();
  const { status, showStatus } = useCart();

  return (
    <>
      {status && showStatus &&
        <div className='fixed left-0 right-0 top-0' style={{zIndex: 1000 }}>
          <div className="flex items-center justify-center bg-green-100 rounded-lg p-4 mb-4 text-sm text-green-700" role="alert">
            <svg className="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
            <div>
              <span className="font-medium">Success!</span> {status}
            </div>
          </div>
        </div>}
      {isFetchingLatest ? 
        (<section className="bg-white dark:bg-gray-900">
          <div className="container px-6 py-10 mx-auto animate-pulse">
            <h1 className="w-48 h-2 mx-auto bg-gray-200 rounded-lg dark:bg-gray-700" />
            <p className="w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg dark:bg-gray-700" />
            <p className="w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg sm:w-80 dark:bg-gray-700" />
            <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3">
              <div className="w-full ">
                <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600" />
                <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700" />
                <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700" />
              </div>
              <div className="w-full ">
                <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600" />
                <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700" />
                <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700" />
              </div>
              <div className="w-full ">
                <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600" />
                <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700" />
                <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700" />
              </div>
              <div className="w-full ">
                <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600" />
                <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700" />
                <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700" />
              </div>
              <div className="w-full ">
                <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600" />
                <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700" />
                <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700" />
              </div>
              <div className="w-full ">
                <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600" />
                <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700" />
                <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700" />
              </div>
              <div className="w-full ">
                <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600" />
                <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700" />
                <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700" />
              </div>
              <div className="w-full ">
                <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600" />
                <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700" />
                <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700" />
              </div>
            </div>
          </div>
        </section>
        ) : 
        (<div className='flex flex-col w-full'>
          <Hero />
          
          <div className='text-center mx-5 my-3'>
            <h1 className='font-bold m-4 text-lg'>Products</h1>
            <Typography>Art holds great influence over society. Sculpture is more than mere decorative art— it finds diverse use in the expression of culture
 and commemorative tributes to be used for both  Interior and Exterior decorations. Our stones are entirely made of Serpentine and spring stone which makes them very durable.</Typography>
          </div>

        <div>
          <div className='grid justify-center xs:grid-cols-1 ss:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mx-4 my-8'>
            {latest && latest.map((product, index) => (
              <div key={product.id}>
              <div className='flex flex-col items-center justify-center'>
                <Link to={`/products/${product.id}`}>
                  <CardHeader
                    floated={false}
                    shadow={false}
                    style={{ borderRadius: 0 }}
                    className="relative overflow-hidden bg-no-repeat bg-cover"
                  >
                    <LazyLoadImage
                      src={product.photos_urls && product.photos_urls[0]}
                      alt="profile-picture"
                      placeholderSrc={placeholder}
                      style={{ objectFit: 'cover' }}
                      className='h-[20rem] w-[15rem]'
                    />
                    <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-[20rem] overflow-hidden bg-fixed opacity-0 hover:opacity-30 transition duration-300 ease-in-out bg-red-700"></div>
                  </CardHeader>
                </Link> 
                <Link to={`/products/${product.id}`} className='lg:absolute top-[58rem] text-center border border-white'>
                  <Button style={{borderRadius: 0, backgroundColor: 'black' }} className='w-[10rem] py-4'>
                    <h5>{product.name}</h5>
                    <p>{product.price.toLocaleString('en-US', {
                        style: 'currency',
                        currency: product.currency,
                      })}</p>
                  </Button>
                </Link>
              </div>
            </div>
            
            ))}
          </div>
          </div>
          <div className='py-10'/>
          <div className='flex flex-col lg:flex-row items-center m-4'>
            <Card style={{ borderRadius: 0 }} color="transparent" shadow={false} className="lg:left-24 bg-gray-200 w-full lg:w-[40rem] lg:h-[21rem] lg:max-w-[38rem]">
              <CardBody className="lg:mb-6 p-4">
                <h1 className='text-center font-bold text-xl'>Vision</h1>
                <Typography className='overflow-hidden h-[15rem]'>
                  &quot; We exist to improve the quality of life for the Tengenenge villagers by promoting the sale of their stone sculptures within the global market. We envision to transform lives through economic empowerment and international development by working collaboratively as a missionary project to enhance lives within the village. We implement infrastructure initiatives through installing solar power systems, set up running water to bring clean and safe drinking supplies, create irrigation.... &quot;
                </Typography>
                <div className='text-end'>
                  <Vision />
                </div>
              </CardBody>
            </Card>
            <img src={architecture} alt="architecture" className='w-full lg:w-[50rem] mt-4' />
          </div>
        </div>)}
    </>
  )
}

export default List;