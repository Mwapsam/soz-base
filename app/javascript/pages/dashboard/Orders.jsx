import React from 'react';
import { Switch } from "@material-tailwind/react";
import { useDispatch } from 'react-redux';
import useOrder from '../hooks/useOrder';
import { fulfilOder } from '../../services/orders.service';

const Orders = () => {
    const {order, isFetching} = useOrder();
    const dispatch = useDispatch();


  return (
    <>
        {isFetching ?
            <div className='h-[30rem]'>
                <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
                    <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-32 w-32" />
                </div>
            </div> :
         (<>
            <h1 className='text-center uppercase font-bold'>Orders</h1>
            {order.length !== 0 ? (<div className="flex flex-col mt-8">
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
                    <div className="align-middle inline-block min-w-full">
                        <div className="shadow overflow-hidden sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Product
                                        </th>
                                        <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Customer
                                        </th>
                                        <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Quantity
                                        </th>
                                        <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Amount Total
                                        </th>
                                        <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Details
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {order && order.map((trans, index) => (
                                        <tr key={trans.id} className="divide-y divide-gray-100 border-t border-gray-100" >
                                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                                <span className="font-semibold">{trans.product}</span>
                                            </td>
                                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                                {trans.username}
                                            </td>
                                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                                {trans.fulfilled ? "Fulfilled" : "Pending"}
                                            </td>
                                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                                {trans.quantity}
                                            </td>
                                            <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                                {trans.amount_total.toLocaleString('en-US', {
                                                    style: 'currency',
                                                    currency: 'eur',
                                                })}
                                            </td>
                                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                                {new Date(trans?.date?.toString()).toLocaleDateString()}
                                            </td>
                                            <td className="p-4 whitespace-nowrap text-sm font-normal text-blue-900">
                                            <Switch defaultChecked={trans.fulfilled} disabled={trans.fulfilled} id={trans.id} onChange={() => dispatch(fulfilOder(trans.id))} label='Fulfil' />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>) : 
            <div className='m-auto'>
                <h4 className='text-center'>There are no orders at a moment</h4>
            </div>
            }
          </>)}
    </>
  )
}

export default Orders