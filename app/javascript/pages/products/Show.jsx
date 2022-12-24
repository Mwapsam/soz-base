import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardFooter, Typography, Tooltip, Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import useProductFetch from '../hooks/useProductFetch';
import { addToCart, decreaseCart, getTotals, removeFromCart } from '../../reducers/cart';
import { addToCartFunc, removeFromCartFunc } from '../../services/cart.service';

const Show = () => {
    const products = useProductFetch();
    const cart = useSelector((state) => state.cart);
    const { product } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getTotals());
    }, [cart, dispatch]);

    const handleCart = (product) => {
      dispatch(addToCartFunc(product))
    }

    const handleDecreaseCart = (product) => {
      dispatch(decreaseCart(product))
    }

    const handleIncreaseCart = (product) => {
      dispatch(addToCart(product))
    }

    const handleRemoveFromCart = (product) => {
      dispatch(removeFromCart(product));
      dispatch(removeFromCartFunc(product));
    };


    const prod = products && products.find((item) => item.id == product);
    const cartIt = cart && cart.cartItems.find((item) => item.id == product)

  return (
    <Card className='mx-6 my-12' shadow={false} style={{borderRadius: 0, width: '90%', height: '100vh' }}>
        <CardHeader shadow={false} style={{borderRadius: 0}} >
            <img src={prod && prod.photos_urls && prod?.photos_urls[0]} alt="profile-picture" />
        </CardHeader>
        <div className='m-4'>
          <h3 className='font-bold'>{prod && prod.name}</h3>
          <p className='py-1 font-semibold'>{prod && prod.price.toLocaleString('en-US', { style: 'currency', currency: prod && prod.currency })}</p>
          <p>{prod && prod.description}</p>
          <div className='flex flex-grow gap-6'>
            <div className='flex justify-between items-center middle font-sans center transition-all border-2 w-32 h-10 p-4 text-black bg-white mt-2'>
              <span className='text-xl cursor-pointer' onClick={() => handleDecreaseCart(prod)}>-</span>
              <span className='text-lg'>{cartIt && cartIt.cartQuantity}</span>
              <span className='text-xl cursor-pointer' onClick={() => handleIncreaseCart(prod)}>+</span>
            </div>
            {cartIt ? <Button style={{borderRadius: 0}} className='bg-red-900 mt-2' type='submit' onClick={() => handleRemoveFromCart(prod)}>Remove from Cart</Button> :
            <Button style={{borderRadius: 0}} className='bg-gray-900 mt-2' type='submit' onClick={() => handleCart(prod)}>Add to Cart</Button>
            }
          </div>
        </div>
    </Card>
  )
}

export default Show;