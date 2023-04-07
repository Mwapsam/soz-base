import React from 'react';
import ImageViewer from '../modal/ImageViewer';

const ProductDetail = (
  {Card, CardBody, CardHeader, Button, prod, cartIt, handleCart, handleRemoveFromCart }
  ) => {
  return (
    <Card className='mx-6 mt-12' shadow={false} style={{ borderRadius: 0, width: '90%' }}>
    <div className="lg:flex justify-center items-start w-full">
      <div className='flex flex-col gap-2'>
        <ImageViewer 
          photo={prod?.photos_urls[0]}
          name={prod?.name}
        />
       <div className='flex justify-between'>
        {prod?.photos_urls.slice(1).map((pic) => ( // Use slice(1) to exclude the first element
          <img key={pic} src={pic} alt={prod?.name} className='h-[8rem] w-[8rem]' />
        ))}
      </div>

      </div>

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