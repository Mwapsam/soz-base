import React from 'react';
import Nav from '../../components/admin/Nav';
import Sales from '../../components/admin/Sales';
import SideBar from '../../components/admin/SideBar';
import Table from '../../components/admin/Table';
import Footer from '../../components/admin/Footer';
import useUser from '../hooks/useUser';
import useTransaction from '../hooks/useTransaction';
import useProductFetch from '../hooks/useProductFetch';

const Dashboard = () => {
  const {onLogOut, user, isFetching} = useUser();
  const { transaction } = useTransaction();
  const products = useProductFetch();

  // console.log(user);

  return (
      <>
        <div>
          <Nav />
          <div className="flex overflow-hidden bg-white pt-16">
            <SideBar onLogOut={onLogOut} />
            <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop" />
            <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
              <main>
                {transaction.length === 0 && products.length === 0 && isFetching ?
                  <div className='h-[30rem]'>
                    <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
                      <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-64 w-64" />
                    </div>
                  </div>
                  : (
                    <div className="pt-6 px-4">
                      <Sales />
                      <Table transaction={transaction} user={user} products={products} />
                    </div>
                  )
                }
                
              </main>
              <Footer />
            </div>
          </div>
        </div>
      </>
  );
};

export default Dashboard;