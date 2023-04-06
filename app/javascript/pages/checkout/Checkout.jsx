import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Input, Card, CardHeader, CardBody, CardFooter, Typography, Radio } from "@material-tailwind/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { Link } from 'react-router-dom'
import usePayments from '../hooks/usePayments';
import useCart from '../hooks/useCart';
import useUser from '../hooks/useUser';
import { checkoutState } from '../../helpers/state';
import Address from '../../components/modal/Address';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const handleCheckout = usePayments();
  const [state, setState] = useState(checkoutState)

  const handleChange = (e) => {
    setState({...state, [e.target.name]: e.target.value });
  };
  
  const [cardError, setCardError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { cart, open, handleOpen } = useCart();
  const {user} = useUser();

  console.log(user);

  const totals = cart?.cartItems?.reduce((acc, item) => acc + item.carts[0].total, 0);
//   const address = user?.address

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!stripe || !elements) {
      return;
    }
  
    const cardElement = elements.getElement(CardElement);
  
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: user?.name,
        email: user?.email,
        address: {
          line1: user?.address?.line1,
          line2: user?.address?.line2,
          city: user?.address?.city,
          state: user?.address?.state,
          postal_code: user?.address?.postalCode,
          country: user?.address?.country
        }
      }
    });
  
    if (error) {
      setCardError(error.message);
    } else {
      const data = {
        payment_method_id: paymentMethod.id,
        amount: totals
      };
  
      fetch('/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Redirect to success page or show success message
      })
      .catch(error => {
        console.error(error);
        // Show error message
      });
    }
  };
   

  return (
    <>
        <div className='flex flex-col lg:grid lg:grid-cols-2 items-center justify-center gap-6 m-6'>
            <Card color="transparent" variant="gradient" className="w-full lg:w-11/12 p-8">
                <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"
                    className="flex items-start gap-2 m-0 mb-8 rounded-none border-b border-white/10 pb-8"
                >
                    <Link to='/cart' >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>
                    </Link>
                    <Typography
                        variant="small"
                        color="gray"
                        className="font-normal"
                    >
                        Pay Stones of Zimbabwe
                        <h2 className='font-bold'>{totals?.toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'eur'
                            })}
                        </h2>
                    </Typography>
                </CardHeader>
                <CardBody className="p-0">
                    <ul className="flex flex-col gap-4">
                        {cart && cart.cartItems.map((item) => (
                            <li className="flex items-center gap-1">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                <CheckIcon strokeWidth={2} className="h-3 w-3" />
                                </span>
                                <div className='flex items-center justify-between w-full gap-3 ml-6'>
                                    <div className="flex items-center gap-3">
                                        <img src={item?.photos_urls[0]} alt={item.name} className='rounded h-6 w-6' />
                                        <h4>{item.name}</h4>
                                    </div>
                                    <h4>{item.orderables[0].total.toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: item.currency,
                                        })}</h4>
                                </div>
                            </li>
                        ))}

                    </ul>
                </CardBody>
                <CardFooter className="mt-12 p-0">
                <div className='flex justify-between my-10'> 
                        <h3 className='font-bold'>Total due </h3>
                        <h2>{totals?.toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'eur'
                            })}
                        </h2>
                    </div>
                </CardFooter>
            </Card>
            <form onSubmit={handleSubmit} className="w-full lg:w-3/5 my-12 mx-12">
                <button className="border mb-3 border-transparent dark:bg-white dark:hover:bg-gray-900 dark:text-gray-900 dark:border-transparent bg-gray-900 text-white flex justify-center items-center py-4 rounded w-full" onClick={handleOpen}>
                    <div>
                        <p className="text-base leading-4">Add Shipping Address </p>
                    </div>
                </button>
                <div className="bg-white rounded-lg overflow-hidden shadow-md">
                    <div className="bg-gray-200 text-gray-900 py-3 px-4">Billing details</div>
                    <div className="flex flex-col gap-6 p-4">
                        <input
                            type="email"
                            placeholder="Email"
                            value={state.email || user?.email }
                            name='email'
                            onChange={handleChange}
                            className='rounded-lg bg-gray-100 text-gray-600'
                            disabled
                        />
                        <input
                            type="text"
                            placeholder="Name on Card"
                            name='name'
                            value={state.name}
                            onChange={handleChange}
                            className='rounded-lg'
                        />
                    </div>
                </div>
                <div className='my-4'>
                    <Address handleOpen={handleOpen} open={open} />
                </div>
                <div className="bg-white rounded-lg overflow-hidden shadow-md mt-4">
                    <div className="bg-gray-200 text-gray-700 py-3 px-4">Card details</div>
                    <div className="p-4">
                        <CardElement options={{
                            classes: {
                                base: "block w-full px-3 py-2 transition duration-300 mt-1 border border-gray-300 rounded-md shadow-sm text-sm",
                                focus: "ring-indigo-500 ring-1 outline-none border-indigo-600",
                                invalid: "text-red-500 border-red-600 ring-red-500",
                            },
                        }} />
                    </div>
                </div>
                {cardError && <div className="text-red-600">{cardError}</div>}
                <Button
                    type="submit"
                    disabled={!stripe || loading}
                    color="blue"
                    className="mt-4"
                    fullWidth
                >
                    Pay
                </Button>
            </form>
        </div>
    </>
  );
};

export default CheckoutForm;
