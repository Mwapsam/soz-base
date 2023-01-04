import React from 'react';
import SideBar from '../components/admin/SideBar';
import Footer from '../components/admin/Footer';
import Nav from '../components/admin/Nav';

const Admin = (Component) => ({...props}) => {
  return (
    <>
        <Nav />
        <div className="flex overflow-hidden bg-white pt-16">
            <SideBar />
            <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop" />
                <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
                    <main>
                        <div className="pt-6 px-4">
                            <Component {...props}/>
                        </div>
                    </main>
                <Footer />
            </div>
        </div>
    </>
  )
}

export default Admin