import React from 'react';
import { Link } from 'react-router-dom';
import ChartX from './ChartX'

const Table = ({transaction, user, products}) => {
  const currency = products[0]?.currency
  console.log(currency);

  return (
    <>
        <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
            <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex-shrink-0">
                        <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                            {user.total_sales?.toLocaleString('en-US', {
                                style: 'currency',
                                currency: currency || 'USD',
                            })}
                        </span>
                        <h3 className="text-base font-normal text-gray-500">Sales this week</h3>
                    </div>
                    <div className="flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                        12.5%
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
                <ChartX />
            </div>
            <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Latest Transactions</h3>
                        <span className="text-base font-normal text-gray-500">This is a list of latest transactions</span>
                    </div>
                    <div className="flex-shrink-0">
                        <Link to='/sales' className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg p-2">View all</Link>
                    </div>
                </div>
            <div className="flex flex-col mt-8">
                <div className="overflow-x-auto rounded-lg">
                    <div className="align-middle inline-block min-w-full">
                        <div className="shadow overflow-hidden sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Transaction
                                        </th>
                                        <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date &amp; Time
                                        </th>
                                        <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Amount
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {transaction && transaction.map((trans) => (
                                        <tr key={trans.id}>
                                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                                Payment from 
                                                <span className="font-semibold">{trans.name}</span>
                                            </td>
                                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                                Apr 23 ,2021
                                            </td>
                                            <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                                {trans.amount.toLocaleString('en-US', {
                                                    style: 'currency',
                                                    currency: trans.currency,
                                                })}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </>
  )
}

export default Table