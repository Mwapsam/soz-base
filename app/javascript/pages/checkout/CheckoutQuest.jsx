import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { Link } from 'react-router-dom'
import useCart from '../hooks/useCart';
import { checkoutState } from '../../helpers/state';
import { AddressForm } from '../../components';
import useForm from '../hooks/useForm';

const CheckoutQuest = () => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const { errors, validate } = useForm()
    const [state, setState] = useState(checkoutState);
    const [billing, setBilling] = useState({name: "", email: ""})
    const [open, setOpen] = useState(false);

    const [cardError, setCardError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
      let name = e.target.name;
      let val = e.target.value;
  
        validate(e, name, val);
        setBilling({ ...billing, [name]: val });
        setError("")
      };

    const { cart } = useCart();

    const totals = cart?.cartItems?.reduce((acc, item) => acc + item.total, 0);


const handleSubmit = async (event) => {
  event.preventDefault();

  setLoading(true);

  const cardElement = elements.getElement(CardElement);
  const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
          name: billing.name,
          email: billing.email,
          address: {
            line1: state.line1,
            line2: state.line2,
            city: state.city,
            state: state.state || state.city,
            postal_code: state.postal_code,
            country: state.country,
          }
      }
  })

  if (error) {
      setCardError(error.message);
      setLoading(false);
    } else {
      const data = {
        payment_method_id: paymentMethod.id,
        name: billing.name,
        email: billing.email,
        line1: state.line1,
        line2: state.line2,
        city: state.city,
        state: state.state || state.city,
        postal_code: state.postal_code,
        country: state.country,
        amount: totals
      };
      try{
          const response = await fetch('/create-checkout-session', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
              },
              body: JSON.stringify(data)
            })
              
            const res = await response.json();

            const payload = await stripe.confirmCardPayment(res.clientSecret, {
              payment_method: {
                card: elements.getElement(CardElement)
              }
            });
        
            if (payload.error) {
              setCardError(payload.error.message)
              setLoading(false);
            } else {
              if(payload.paymentIntent){
                  navigate(`/success/${res?.session_id}`)
              }
              setLoading(false);
            }
        
      }catch(error){
          return error;
      }   
  }
}; 


const handleOpen = () => {
  setLoading(false);
  setOpen(prev => !prev)
};

  return (
    <>
        {errors.email && (<div className='fixed lg:left-48 mx-4 lg:right-48 top-20' style={{zIndex: 1000 }}>
          <div className="flex items-center justify-center bg-red-100 rounded-lg p-4 mb-4 text-sm text-red-900" role="alert">
            <svg className="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
            <div>
              <span className="font-medium">Failure!</span> {errors.email}
            </div>
          </div>
        </div>)}
      <div className='flex flex-col lg:grid lg:grid-cols-2 items-center justify-center gap-6 m-6'>
        <Card color="transparent" variant="gradient" className="w-full lg:w-11/12 p-8">
            <div
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
            </div>
            <CardBody className="p-0">
                <ul className="flex flex-col gap-4">
                    {cart && cart.cartItems.map((item) => (
                        <li key={item.id} className="flex items-center gap-1">
                            <span className="rounded-full border border-white/20 bg-white/20 p-1">
                            <CheckIcon strokeWidth={2} className="h-3 w-3" />
                            </span>
                            <div className='flex items-center justify-between w-full gap-3 ml-6'>
                                <div className="flex items-center gap-3">
                                    <img src={item?.photos_urls[0]} alt={item.name} className='rounded h-6 w-6' />
                                    <h4>{item.name}</h4>
                                </div>
                                <div>
    
                                <h4>{item.orderables[0].total.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: item.currency,
                                    })}</h4>
                                </div>

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
        <div className="w-full lg:w-3/5 my-12 mx-12">
          <button className="border mb-3 border-transparent dark:bg-white dark:hover:bg-gray-900 dark:text-gray-900 dark:border-transparent bg-gray-900 text-white flex justify-center items-center py-4 rounded w-full" onClick={handleOpen}>
            <div>
                <p className="text-base leading-4">Add Shipping Address </p>
            </div>
          </button>
          {state.line1 && 
            <div>
                <span style={{display: "inline-block"}}>Address: </span> 
                <p style={{display: "inline-block"}} className='font-thin text-xs px-3 pb-3'>{state.line1}</p>
            </div>}
            {!state.line1 && !state.city && !state.postal_code && !state.country && <p className='py-3 text-red-900 font-thin text-xs'>You need to enter the shipping address before you continue!</p>}
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="bg-gray-200 text-gray-900 py-3 px-4">Billing details</div>
                <div className="flex flex-col gap-6 p-4">
                    <input
                      type="email"
                      placeholder="Email"
                      value={billing.email}
                      name='email'
                      onChange={handleChange}
                      className='rounded-lg'
                    />
                    <input
                        type="text"
                        placeholder="Name on Card"
                        name='name'
                        value={billing.name}
                        onChange={handleChange}
                        className='rounded-lg'
                    />
                </div>
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
                disabled={!stripe || loading || !billing.name || !billing.email || !state.line1 || !state.city || !state.postal_code || !state.country }
                color="blue"
                className="mt-4"
                fullWidth
            >
                {loading ?
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>  : <p>Pay</p>}
            </Button>
          </form>
        </div>
      </div>
      <div className='m-auto'>
        <AddressForm handleOpen={handleOpen} open={open} setState={setState} />
      </div>
    </>
  )
}

export default CheckoutQuest