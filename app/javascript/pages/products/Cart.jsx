import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import useCart from '../hooks/useCart';
import useUser from '../hooks/useUser';

const Cart = () => {
  const  {cart, handleRemoveFromCart, handleDecreaseCart, handleIncreaseCart, total, totals} = useCart();
  const { user } = useUser(); 
  const navigate = useNavigate()

  return (
    <>
      {cart.cartItems.length !== 0 ? (<div className="pt-10 w-full">
        <div  className='mx-3 lg:mx-10'>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Shopping Cart</h2>
          <Link to='/products-list' className='flex gap-2 py-3'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
              <p>Continue Shopping</p>
          </Link>
        </div>
        <div className='flex flex-col lg:flex-row justify-between rounded-lg shadow lg:mx-10'>
          <div className="overflow-x-auto rounded-lg border border-gray-200 w-full">
            <div className="align-middle inline-block min-w-full">
              <div className="shadow overflow-hidden sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className='bg-gray-50'>
                  <tr>
                    <th></th>
                    <th scope="col" className='px-4 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Unit Price</th>
                    <th scope="col" className='px-4 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Quantity</th>
                    <th scope="col" className='px-4 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Total SAR</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                {cart && cart.cartItems.map((product) => (
                    <tr key={product.id} className="divide-y divide-gray-100 border-t border-gray-100">
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                        <div className='flex flex-col lg:flex-row items-center gap-3 my-6 ml-6'>
                          <img src={product?.photos_urls[0]} alt={product.name} className='rounded h-10 w-10' />
                          <h3>{product.name}</h3>
                        </div>
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                        {product.price.toLocaleString('en-US', { style: 'currency', currency: product.currency })}
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                        <div className='flex justify-between items-center middle font-sans center transition-all w-32 h-10 p-4 text-black mt-2'>
                        <span className='text-xl cursor-pointer border border-gray-600 w-7 text-center' onClick={() => {
                            if (product.orderables[0]?.quantity > 1) {
                              handleDecreaseCart(product.orderables[0]?.id);
                            }
                          }}>-</span>

                          <span className='text-lg'>{product.orderables[0]?.quantity}</span>
                          <span className='text-xl cursor-pointer border border-gray-600 w-7 text-center' onClick={() => handleIncreaseCart(product.orderables[0]?.id)}>+</span>
                        </div>
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                        <div className='flex justify-between my-6 mr-6 gap-x-3'>
                          {(product.price * product.orderables[0]?.quantity).toLocaleString('en-US', { style: 'currency', currency: product.currency })}
                          <span onClick={() => handleRemoveFromCart(product.id)} className='cursor-pointer'>
                            <FontAwesomeIcon className='text-red-700' icon={faTrashCan} />
                          </span>
                        </div>
                      </td>
                    </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className='p-6 flex flex-col justify-center lg:w-[24rem]'>
            <div className='flex justify-between items-center gap-4'>
              <h4>Total (Tax included)</h4>
              <h3>{totals?.toLocaleString('en-US', { style: 'currency', currency: total && total.currency })}</h3>
            </div>
            {user ? 
            <Button style={{borderRadius: 0}} className='bg-gray-900 mt-2 ' type='submit' onClick={() => navigate('/checkout')}>Safe to Checkout</Button> :
            <Button style={{borderRadius: 0}} className='bg-gray-900 mt-2 ' type='submit' onClick={() => navigate('/checkout-quest')}>Safe to Checkout</Button>
            }
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
 
export default Cart;
