import React from 'react';
import NavBar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';

const Wrapper = (Component) => ({...props}) => {
    return (
        <section>
            <NavBar />
            <div className='pt-20 pb-20'>
               <Component {...props}/> 
            </div>
            <Footer />
        </section>
    )
}

export default Wrapper