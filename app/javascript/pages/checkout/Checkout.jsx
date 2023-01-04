import React from 'react';
import { Card, Radio } from "@material-tailwind/react";
import Address from '../../components/modal/Address';
import useCart from '../hooks/useCart';
import useUser from '../hooks/useUser';
import useAddress from '../hooks/useAddress';
import usePayments from '../hooks/usePayments';

const Checkout = () => {
    const {cart, open, handleOpen} = useCart();
    const handleAddressUpdate = useAddress();
    const handleCheckout = usePayments();
    const {user} = useUser()

    const addresses = user?.addresses;

    let totals;
    cart?.cartItems.forEach(item => {
        totals = item.carts[0].total;
    })

  return (
    <Card className='m-auto' style={{borderRadius: 0, width: '90%' }}>
        <div className="mb-16 px-4 md:px-6 2xl:px-0 flex justify-center items-center 2xl:mx-auto">
            <div className="flex flex-col justify-start items-start w-full space-y-9">
            <div className="flex justify-start flex-col items-start space-y-2">
                
            </div>
            <div className="flex flex-col xl:flex-row justify-center xl:justify-between space-y-6 xl:space-y-0 xl:space-x-6 w-full">
                <div className="p-8 bg-gray-100 dark:bg-gray-800 flex flex-col lg:w-full xl:w-3/5">
                    <h1 className='font-bold py-4 uppercase text-center'>Please select the shipping address</h1>
                    {addresses && addresses.map((address) => (
                        <div key={address.id}>
                            <hr className="border w-full" />
                            <div className='flex gap-4 items-center py-6'>
                                <Radio id={address.id} name="color" color="blue" onClick={() => handleAddressUpdate(address)} defaultChecked/>
                                <div className="flex flex-col">
                                    <h1>{user.username}</h1>
                                    <h3>{user.email}</h3>
                                    <div className="flex">
                                        <p>{address.line1}, {address.city}, {address.country}</p>
                                    </div>
                                </div>
                                
                            </div>
                            <hr className="border w-full" />
                        </div>
                    ))}
                    <div className="flex py-8 items-center gap-4">
                        <hr className="border w-full" />
                            <p>or</p>
                        <hr className="border w-full" />
                    </div>
                    <button className="mt-8 border border-transparent dark:bg-white dark:hover:bg-gray-900 dark:text-gray-900 dark:border-transparent bg-gray-900 text-white flex justify-center items-center py-4 rounded w-full" onClick={handleOpen}>
                        <div>
                            <p className="text-base leading-4">Add New Address </p>
                        </div>
                    </button>
                </div>
                <div className="p-8 bg-gray-100 dark:bg-gray-800 flex flex-col lg:w-full xl:w-3/5 relative">
                    <div className="flex flex-row justify-center items-center m-8">
                        <h2>Shopping List</h2>
                    </div>
                    {cart && cart.cartItems.map((item) => (
                            <div key={item.id} >
                                <hr className="border w-full" />
                                <div className='flex items-center justify-between gap-3 my-6 ml-6'>
                                    <div className="flex items-center gap-3">
                                        <img src={item?.photos_urls[0]} alt={item.name} className='rounded h-10 w-10' />
                                        <h4>{item.name}</h4>
                                    </div>
                                    <h4>{item.orderables[0].total.toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: item.currency,
                                        })}</h4>
                                </div>
                                <hr className="border w-full" />
                            </div>
                        ))
                    }
                    <div className='text-end my-10'> 
                        <h3>Total price </h3>
                        <h2>{totals?.toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: cart?.cartItems[0].currency,
                            })}
                        </h2>
                    </div>
                        
                    <div>
                        <button className="bottom-0 left-0 border border-transparent dark:bg-white dark:hover:bg-gray-900 dark:text-gray-900 dark:border-transparent bg-gray-900 text-white flex justify-center items-center py-4 rounded w-full" onClick={() => handleCheckout(cart.cartItems)}>
                            <div>
                                <p className="text-base leading-4">Continue </p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            </div>
        </div>
        <Address handleOpen={handleOpen} open={open} />
    </Card>
  )
}

export default Checkout;