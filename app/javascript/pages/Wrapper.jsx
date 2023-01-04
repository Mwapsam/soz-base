import React from 'react';
import NavBar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';

const Wrapper = (Component) => ({...props}) => {
    return (
        <section>
            <NavBar />
            <Component {...props}/>
            <Footer />
        </section>
    )
}

export default Wrapper