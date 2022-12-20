import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, Tooltip } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import useProductFetch from '../hooks/useProductFetch';

const List = () => {
  const products = useProductFetch();
  return (
    <div className='grid xs:grid-cols-1 ss:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 m-4'>
      {products && products.map((product) => (
          <Link to={`/products/${product.id}`} key={product.id}>
            <Card className="w-86 bg-gray-50" style={{borderRadius: 0}}>
                <CardHeader floated={false} shadow={false} style={{borderRadius: 0, width: '90%', height: '80%' }} className="h-80 w-100">
                  <img src={product.photos_urls && product.photos_urls[0]} alt="profile-picture" />
                </CardHeader>
                <div className='flex justify-between p-4'>
                  <div>
                    <h5>{product.name}</h5>
                    <p>{product.price.toLocaleString('en-US', {
                        style: 'currency',
                        currency: product.currency,
                      })}</p>
                  </div>
                  <div className='flex gap-2'>
                  <Tooltip content="Add to Cart">
                    <p><FontAwesomeIcon icon={faCartShopping} /></p>
                  </Tooltip>
                  <Tooltip content="Add to Wishlist">
                    <p><FontAwesomeIcon icon={faHeart} /></p>
                  </Tooltip>
                  </div>
                </div>
            </Card>
          </Link>
          
      ))}
    </div>
  )
}

export default List