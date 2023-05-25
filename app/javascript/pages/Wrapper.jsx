import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import NavBar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';

const Wrapper = (Component) => ({...props}) => {

    const stripePromise = loadStripe('pk_test_51MFzr2GXUvuvVcE7oZ7pU9STddAnLO83SILi80Ta6ixypocB10JIcpZNUHFWG3Aa81rUlzAVPtT69jcyAkv8P9V4008GYT21ui');
    return (
        <section>
            <NavBar />
            <div className='pt-24 pb-32'>
                <Elements stripe={stripePromise} >
                    <Component {...props} /> 
               </Elements>
            </div>
            <Footer />
        </section>
    )
}

export default Wrapper