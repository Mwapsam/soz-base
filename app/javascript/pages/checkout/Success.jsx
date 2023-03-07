import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSuccessInfo } from '../../services/payment.service';

const Success = () => {
    const info = useSelector(state => state.payment.info);
    const dispatch = useDispatch();
    const {session_id} = useParams();

    useEffect(() => {
        dispatch(getSuccessInfo(session_id));
    }, [session_id])

  return (
    <>
        <div className="mx-auto p-6 lg:p-20 bg-gray-50" style={{maxWidth: 800}}>
            <div className="flex items-center justify-between mb-8 px-3">
                <div>
                    <span className="text-2xl">Order #</span>: {info?.metadata?.order_id}<br />
                    <span>Date</span>:  {info?.created}<br />
                </div>
                <div className="text-right">
                    <img src={logo} className='h-10 w-10' />
                </div>
            </div>
            <div className="flex justify-between flex-col-reverse lg:flex-row mb-8 gap-6 px-3">
                <div>
                    {info?.metadata?.user_name} <br />
                    {info?.metadata?.line1} <br />
                    {info?.metadata?.city}, OR {info?.metadata?.postal_code} {info?.metadata?.country}<br />
                    {info?.metadata?.user_email} <br />
                </div>
                <div className="text-right">
                    Stones of Zimbabwe<br />
                    Street 12<br />
                    10000 City<br />
                    sales@stonesofzimbabwe.com
                </div>
            </div>
            <div className="border border-t-2 border-gray-200 mb-8 px-3" />

            {info?.line_items?.data?.map((item) => (
                <div className="flex justify-between mb-4 bg-gray-200 px-3 py-2">
                    <div>{item.description}</div>
                    <div className="text-right font-medium">
                        {(item.amount_subtotal / 100).toLocaleString('en-US', {
                            style: 'currency',
                            currency: item.currency,
                          })}
                    </div>
                </div>
            ))}
            <div className="flex justify-between items-center mb-2 px-3">
                <div className="text-2xl leading-none"><span className>Total</span>:</div>
                <div className="text-2xl text-right font-medium">
                    {(info?.amount_total / 100)?.toLocaleString('en-US', {
                        style: 'currency',
                        currency: "eur",
                    })}
                </div>
            </div>
            {/* <div className="mb-8 px-3">
                <span>To be shipped before</span>  Februari 1st 2019 on <b className="underline font-bold">BE71 0961 2345 6769</b> specifying the invoice #
            </div> */}
            <div className="my-8 text-4xl text-center px-3">
                <span>Thank you!</span>
            </div>
            <div className="text-center text-sm px-3">
                sales@stonesofzimbabwe.com ∖ www.stonesofzimbabwe.com
            </div>
        </div>
    </>
  )
}

export default Success;