import React from 'react';

const ProductDetail = (
  {Card, CardBody, CardHeader, Button, prod, cartIt, handleCart, handleRemoveFromCart }
  ) => {
  return (
    <Card className='mx-6 mt-12' shadow={false} style={{ borderRadius: 0, width: '90%' }}>
    <div className="lg:flex justify-center items-start w-full">
      <CardHeader shadow={false} style={{ borderRadius: 0 }}>
        <img src={prod && prod.photos_urls && prod?.photos_urls[0]} alt={prod && prod.name} />
      </CardHeader>
      <CardBody className='md:w-2/3 lg:w-3/4'>
        <div className='m-4 w-full'>
          <h3 className='font-bold'>{prod && prod.name}</h3>
          <p className='py-1 font-semibold'>{prod && prod.price.toLocaleString('en-US', { style: 'currency', currency: prod && prod.currency })}</p>
          <p style={{ width: '100%' }}>{prod && prod.description}</p>
          <div className='flex flex-grow gap-6'>
            {cartIt?.carts[0] ? <Button style={{ borderRadius: 0 }} className='bg-red-900 mt-2' type='submit' onClick={() => handleRemoveFromCart(cartIt?.orderables[0].id)}>Remove from Cart</Button> :
              <Button style={{ borderRadius: 0 }} className='bg-gray-900 mt-2' type='submit' onClick={() => handleCart(prod)}>Add to Cart</Button>}
          </div>
        </div>
      </CardBody>
    </div>
  </Card>
  )
}

export default ProductDetail;