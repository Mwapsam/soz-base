import React from 'react';
import Navbar from '../components/navigation/Navbar';

const Wrapper = (Component) => ({...props}) => {
    return (
        <section>
            <Navbar />
            <Component {...props}/>
        </section>
    )
}

export default Wrapper