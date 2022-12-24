import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardHeader, CardBody, CardFooter, Typography, Tooltip, Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { addToCart, decreaseCart, getTotals } from '../../reducers/cart';
import { removeFromCart } from '../../reducers/cart';
import Payments from '../../services/payment.service';
import { removeFromCartFunc } from '../../services/cart.service';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleCheckout = (products) => {
    dispatch(Payments(products));
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

  console.log(cart);

  return (
    <div className='flex flex-row justify-between mx-6 my-12'>
      <table className="table-auto w-3/4 bg-gray-100">
        <thead className='mt-8'>
          <tr>
            <th></th>
            <th className='text-start py-6'>Unit Price</th>
            <th className='text-start px-4 py-6'>QTY</th>
            <th className='text-start py-6'>Total SAR</th>
          </tr>
        </thead>
        {cart && cart.cartItems.map((product) => (
          <tbody key={product.id}>
            <tr>
              <td>
                <div className='flex gap-3 my-6 ml-6'>
                  <img src={product?.photos_urls[0]} alt={product.name} className='h-auto w-10' />
                  <h3>{product.name}</h3>
                </div>
                
              </td>
              <td>{product.price.toLocaleString('en-US', { style: 'currency', currency: product.currency })}</td>
              <td>
                <div className='flex justify-between items-center middle font-sans center transition-all w-32 h-10 p-4 text-black mt-2'>
                  <span className='text-xl cursor-pointer border border-gray-600 w-7 text-center' onClick={() => handleDecreaseCart(product)} >-</span>
                  <span className='text-lg'>{product.cartQuantity}</span>
                  <span className='text-xl cursor-pointer border border-gray-600 w-7 text-center' onClick={() => handleIncreaseCart(product)}>+</span>
                </div>
              </td>
              <td className='flex justify-between my-6 mr-6'>
                {(product.price * product.cartQuantity).toLocaleString('en-US', { style: 'currency', currency: product.currency })}
                <span onClick={() => handleRemoveFromCart(product)} className='cursor-pointer'>
                  <FontAwesomeIcon icon={faTrashCan} />
                </span>
                
              </td>
            </tr>
          </tbody>
        ))}
      </table>
      <div>
        <div className='flex justify-between items-center gap-4'>
          <h4>Total (Tax included)</h4>
          <h3>{cart.cartTotalAmount.toLocaleString('en-US', { style: 'currency', currency: cart && cart.cartItems[0].currency })}</h3>
        </div>
        <Button style={{borderRadius: 0}} className='bg-gray-900 mt-2 ' type='submit' onClick={() => handleCheckout(cart)}>Safe to Checkout</Button>
      </div>
    </div>
  )
}
 
export default Cart