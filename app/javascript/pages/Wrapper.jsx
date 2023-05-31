import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import NavBar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';

const Wrapper = (Component) => ({...props}) => {

    const stripePromise = loadStripe('pk_live_51MFzr2GXUvuvVcE7z3ozydmN7CS1yuMsscMH4E1z2Snh2kG5D0lIBenFSBgdUDyWM28YfPMJAVdsXNVaQ7g6IgMj00GC6dpFhe');
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