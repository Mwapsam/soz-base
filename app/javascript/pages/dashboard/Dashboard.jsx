import React from 'react';
import Sales from '../../components/admin/Sales';
import Table from '../../components/admin/Table';
import useUser from '../hooks/useUser';
import useTransaction from '../hooks/useTransaction';
import useProductFetch from '../hooks/useProductFetch';

const Dashboard = () => {
  const {onLogOut, user, isFetching} = useUser();
  const { transaction } = useTransaction();
  const products = useProductFetch();


  return (
      <>
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
      </>
  );
};

export default Dashboard;