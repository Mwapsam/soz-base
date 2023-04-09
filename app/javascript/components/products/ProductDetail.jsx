import React from 'react';
import StarRatings from 'react-star-ratings';
import Review from '../modal/Review';

const ProductDetail = (
  {Button, prod, cartIt, handleCart, handleRemoveFromCart, prodartId, reviews }
  ) => {

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="container px-5 py-16 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img alt={prod && prod.name} className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src={prod?.photos_urls[0]} />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{prod && prod.name}</h1>
            <div className="flex mb-4 justify-between">
              <span className="flex items-center">
                <StarRatings
                  rating={prod?.total_rating || 0}
                  starDimension="15px"
                  starSpacing="2px"
                  starRatedColor={'orange'}
                />
                <span className="text-gray-600 ml-3">{prod?.total_rating || 0} Reviews</span>
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                <Review productId={prod?.id} />
              </span>
            </div>
            <p className="leading-relaxed">{prod && prod.description}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
            
              <div className="flex ml-6 items-center">
                <div className="relative">

                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="title-font font-medium text-2xl text-gray-900">{prod && prod.price.toLocaleString('en-US', { style: 'currency', currency: prod && prod.currency })}</span>
                {cartIt?.carts[0] ? <Button style={{ borderRadius: 0 }} className='bg-red-900 mt-2' type='submit' onClick={() => handleRemoveFromCart(prodartId)}>Remove from Cart</Button> :
              <Button style={{ borderRadius: 0 }} className='bg-gray-900 mt-2' type='submit' onClick={() => handleCart(prod)}>Add to Cart</Button>}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetail;