import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import useCart from '../hooks/useCart';

const Cart = () => {
  const  {cart, handleRemoveFromCart, handleDecreaseCart, handleIncreaseCart} = useCart();

  const navigate = useNavigate()

  const total = cart.cartItems.find((item) => item.carts[0]);

  return (
    <>
      {cart.cartItems.length !== 0 ? (<div className="container">
        <div className='flex flex-row justify-between mx-6 my-12 min-w-full overflow-hidden rounded-lg shadow'>
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
                    <div className='flex items-center gap-3 my-6 ml-6'>
                      <img src={product?.photos_urls[0]} alt={product.name} className='rounded h-10 w-10' />
                      <h3>{product.name}</h3>
                    </div>
                    
                  </td>
                  <td>
                    {product.price.toLocaleString('en-US', { style: 'currency', currency: product.currency })}
                  </td>
                  <td>
                    <div className='flex justify-between items-center middle font-sans center transition-all w-32 h-10 p-4 text-black mt-2'>
                      <span className='text-xl cursor-pointer border border-gray-600 w-7 text-center' onClick={() => handleDecreaseCart(product.orderables[0]?.id)} >-</span>
                      <span className='text-lg'>{product.orderables[0]?.quantity}</span>
                      <span className='text-xl cursor-pointer border border-gray-600 w-7 text-center' onClick={() => handleIncreaseCart(product.orderables[0]?.id)}>+</span>
                    </div>
                  </td>
                  <td className='flex justify-between my-6 mr-6'>
                    {(product.price * product.orderables[0]?.quantity).toLocaleString('en-US', { style: 'currency', currency: product.currency })}
                    <span onClick={() => handleRemoveFromCart(product.id)} className='cursor-pointer'>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </span>
                    
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
          <div className='p-6 flex flex-col justify-center'>
            <div className='flex justify-between items-center gap-4'>
              <h4>Total (Tax included)</h4>
              <h3>{total.carts[0].total.toLocaleString('en-US', { style: 'currency', currency: total && total.currency })}</h3>
            </div>
            <Button style={{borderRadius: 0}} className='bg-gray-900 mt-2 ' type='submit' onClick={() => navigate('/checkout')}>Safe to Checkout</Button>
          </div>
        </div>
      </div>) : 
        <div className="inline-flex items-center bg-white leading-none ${props.textColor} rounded-full p-2 shadow text-teal text-sm m-16">
          <span className="inline-flex bg-gray-700 text-white rounded-full h-6 px-3 justify-center items-center">
            Empty
          </span>
          <span className="inline-flex px-2 text-gray-700">
            Your shopping cart is empty
          </span>
        </div>
      }
    </>
  )
}
 
export default Cart