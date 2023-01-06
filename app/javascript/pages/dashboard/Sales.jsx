import React from 'react';
import useTransaction from '../hooks/useTransaction';

const Sales = () => {
  const { transactions } = useTransaction();
  return (
    <>
        {transactions.length === 0 ?
            <div className='h-[30rem]'>
                <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
                    <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-32 w-32" />
                </div>
            </div> :
         (<><h1 className='text-center uppercase font-bold'>All Transactions</h1><div className="flex flex-col mt-8">
              <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
                  <div className="align-middle inline-block min-w-full">
                      <div className="shadow overflow-hidden sm:rounded-lg">
                          <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                  <tr>
                                      <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                          Transaction
                                      </th>
                                      <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                          Email
                                      </th>
                                      <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                          Status
                                      </th>
                                      <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                          Amount
                                      </th>
                                      <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                          Details
                                      </th>
                                  </tr>
                              </thead>
                              <tbody className="bg-white">
                                  {transactions && transactions.map((trans) => (
                                      <tr key={trans.id} className="divide-y divide-gray-100 border-t border-gray-100" >
                                          <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                              <span className="font-semibold">{trans.name}</span>
                                          </td>
                                          <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                              {trans.email}
                                          </td>
                                          <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                              {trans.status}
                                          </td>
                                          <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                              {trans.amount.toLocaleString('en-US', {
                                                  style: 'currency',
                                                  currency: trans.currency,
                                              })}
                                          </td>
                                          <td className="p-4 whitespace-nowrap text-sm font-normal text-blue-900">
                                              <a target="_blank" href={trans.receipt_url}>View Receipt</a>
                                          </td>
                                      </tr>
                                  ))}
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
          </div></>)}
    </>
  )
}

export default Sales