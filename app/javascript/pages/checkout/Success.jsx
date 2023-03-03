import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSuccessInfo } from '../../services/payment.service';
import useUser from '../hooks/useUser';

const Success = () => {
    const info = useSelector(state => state.payment.info);
    const dispatch = useDispatch();
    const {session_id} = useParams();
    const {user} = useUser();

    useEffect(() => {
        dispatch(getSuccessInfo(session_id));
    }, [session_id])

    console.log(info);
  return (
    <>
    <div>
    <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-10">
        <div className="w-full lg:w-3/5 bg-white shadow-lg">
        <div className="flex justify-between p-4">
            <div>
            <h1 className="text-3xl italic font-extrabold tracking-widest text-indigo-500">Stones of Zimbabwe</h1>
            <p className="text-base">If account is not paid within 7 days the credits details supplied as
                confirmation.</p>
            </div>
            <div className="p-2">
            <ul className="flex">
                <li className="flex flex-col items-center p-2 border-l-2 border-indigo-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <span className="text-sm">
                    www.stoneofzimbabwe.com
                </span>
                <span className="text-sm">
                    sales@stoneofzimbabwe.com
                </span>
                </li>
                <li className="flex flex-col p-2 border-l-2 border-indigo-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm">
                    2821 Kensington Road,Avondale Estates, GA 30002 USA
                </span>
                </li>
            </ul>
            </div>
        </div>
        <div className="w-full h-0.5 bg-indigo-500" />
        <div className="flex justify-between p-4">
            <div>
            <h6 className="font-bold">Order Date : <span className="text-sm font-medium"> 12/12/2022</span></h6>
            <h6 className="font-bold">Order ID : <span className="text-sm font-medium"> {info?.metadata?.oreder_id}</span></h6>
            </div>
            <div className="w-40">
            <address className="text-sm">
                <span className="font-bold"> Billed To : </span>
                <p>{user?.username}</p>
                <p>{user?.user_address?.line1}</p>
                <p>{user?.user_address?.city}, {user?.user_address?.country}</p>
            </address>
            </div>
            <div className="w-40">
            <address className="text-sm">
                <span className="font-bold">Ship To :</span>
                <p>{user?.username}</p>
                <p>{user?.user_address?.line1}</p>
                <p>{user?.user_address?.city}, {user?.user_address?.country}</p>
            </address>
            </div>
            <div />
        </div>
        <div className="flex justify-center p-4">
            <div className="border-b border-gray-200 shadow">
            <table className="w-full">
                <thead className="bg-gray-50">
                <tr>
                    <th className="px-4 py-2 text-xs text-gray-500 ">
                    #
                    </th>
                    <th className="px-4 py-2 text-xs text-gray-500 ">
                    Product Name
                    </th>
                    <th className="px-4 py-2 text-xs text-gray-500 ">
                    Quantity
                    </th>
                    <th className="px-4 py-2 text-xs text-gray-500 ">
                    Rate
                    </th>
                    <th className="px-4 py-2 text-xs text-gray-500 ">
                    Subtotal
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white">
                {info?.line_items?.data?.map((item, index) => (
                <tr key={item.id} className="whitespace-nowrap">
                    <td className="px-6 py-4 text-sm text-gray-500">
                    {index + 1}
                    </td>
                    <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                        {item.description}
                    </div>
                    </td>
                    <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{item.quantity}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                    {(item.price.unit_amount / 100).toLocaleString('en-US', { style: 'currency', currency: info?.currency })}
                    </td>
                    <td className="px-6 py-4">
                    {(item.amount_subtotal / 100).toLocaleString('en-US', { style: 'currency', currency: info?.currency })}
                    </td>
                </tr>
                ))}

                {/* <tr>
                    <td colSpan={3} />
                    <td className="text-sm font-bold">Sub Total</td>
                    <td className="text-sm font-bold tracking-wider"><b>{(info?.amount_subtotal / 100).toLocaleString('en-US', { style: 'currency', currency: info?.currency })}</b></td>
                </tr>
                <tr>
                    <th colSpan={3} />
                    <td className="text-sm font-bold"><b>Discount</b></td>
                    <td className="text-sm font-bold"><b>{info?.total_details?.amount_discount.toLocaleString('en-US', { style: 'currency', currency: info?.currency }) }</b></td>
                </tr>
                <tr className="text-white bg-gray-800">
                    <th colSpan={3} />
                    <td className="text-sm font-bold"><b>Total</b></td>
                    <td className="text-sm font-bold"><b>{(info?.amount_total / 100).toLocaleString('en-US', { style: 'currency', currency: info?.currency })}</b></td>
                </tr> */}
                </tbody>
            </table>
            </div>
        </div>
        <div className="flex justify-between p-4">
            <div>
            <h3 className="text-xl">Terms And Condition :</h3>
            <ul className="text-xs list-disc list-inside">
                <li>All accounts are to be paid within 7 days from receipt of invoice.</li>
                <li>To be paid by cheque or credit card or direct payment online.</li>
                <li>If account is not paid within 7 days the credits details supplied.</li>
            </ul>
            </div>
            <div className="p-4">
            <h3>Signature</h3>
            <div className="text-4xl italic text-indigo-500">SOZ</div>
            </div>
        </div>
        <div className="w-full h-0.5 bg-indigo-500" />
        <div className="p-4">
            <div className="flex items-center justify-center">
            Thank you very much for doing business with us.
            </div>
            <div className="flex items-end justify-end space-x-3">
            <button className="px-4 py-2 text-sm text-green-600 bg-green-100">Print</button>
            <button className="px-4 py-2 text-sm text-blue-600 bg-blue-100">Save</button>
            <button className="px-4 py-2 text-sm text-red-600 bg-red-100">Cancel</button>
            </div>
        </div>
        </div>
    </div>
    </div>


    </>
  )
}

export default Success;