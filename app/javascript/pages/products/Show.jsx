import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardBody, Button } from "@material-tailwind/react";
import useProductFetch from '../hooks/useProductFetch';
import { addToCartFunc, removeFromCartFunc } from '../../services/cart.service';
import { incrementFunc, decrementFunc } from '../../services/product.service';
import { fetchReviews } from '../../services/review.service';
import { ProductDetail, Crambs, MyTabs } from '../../components';
import useCart from '../hooks/useCart';

const Show = () => {
    const products = useProductFetch();
    const { cart } = useCart();
    const { product } = useParams();
    const dispatch = useDispatch();

    const handleDecreaseCart = (product) => {
      dispatch(decrementFunc(product))
    }

    const  handleIncreaseCart = (product) => {
      dispatch(incrementFunc(product))
    }

    const handleRemoveFromCart = (product) => {
      dispatch(removeFromCartFunc(product));
    };

    const prod = products && products?.products?.find((item) => item.id == product);
    const cartIt = cart.cartItems.find((item) => item.id == product)

    const handleCart = (product) => {
        const cartData = {
        id: product.id,
        quantity: 1
        }
        dispatch(addToCartFunc(cartData))
    }

    const {reviews, isFetching} = useSelector((state) => state.reviews);

    useEffect(() => {
      dispatch(fetchReviews());
    }, [reviews.length])


  return (
    <>
      {products?.length !== 0 ? 
        (<>
          <Crambs />
          <ProductDetail 
            Button={Button} prod={prod} 
            cartIt={cartIt} 
            handleDecreaseCart={handleDecreaseCart}
            handleIncreaseCart={handleIncreaseCart}
            handleRemoveFromCart={handleRemoveFromCart}
            handleCart={handleCart}
            prodartId={product}
            reviews={reviews}
            isFetching={isFetching}
          />
          {/* <MyTabs  
            description={prod?.description} 
            id={prod?.id}
            reviews={reviews} 
          /> */}
        </>) :
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
      }
    </>
    
  )
}

export default Show;