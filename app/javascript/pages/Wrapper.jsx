import React from 'react';
import NavBar from '../components/navigation/Navbar';

const Wrapper = (Component) => ({...props}) => {
    return (
        <section>
            <NavBar />
            <Component {...props}/>
        </section>
    )
}

export default Wrapper