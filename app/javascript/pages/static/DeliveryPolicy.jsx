import React from 'react';
import { Link } from 'react-router-dom';

const DeliveryPolicy = () => {
  return (
    <>
      <section className="w-full md:w-2/3 flex flex-col justify-center m-auto pt-14 items-center px-3">
        <article className="flex flex-col shadow my-4">
          <div className="bg-white flex flex-col justify-start p-6">
            <h1 className="text-3xl font-bold hover:text-gray-700 pb-4">Delivery Policy</h1>
            <p className="text-blue-700 text-sm font-bold uppercase pb-4">Last updated: March 09, 2023</p>
            <p className='pb-3'>Our sculpture collection is located all over the world.  We strive to get the sculpture to you as soon as possible.</p>
            <p className='pb-3'>
            If your sculpture is coming from overseas, we pack, crate and ship the sculpture ourselves with our local team of experts. Our sculpture prices DO NOT include worldwide shipping or insurance. We will find three different airfreight quotes for you – to your door OR to your nearest airport, you choose the best quote and we organise the shipment.  Please see our Terms & Conditions for further information about prices and payment methods.
            </p>
            <p className='pb-3'>
            You would be responsible for local import charges and/or handling fees.  In most countries original pieces of artwork are either duty free or very low in duty.
            </p>
            <p className='pb-3'>
            Your order will be delivered to the address you indicated when your order was placed, unless stated otherwise. The products bought on stonesofzimbabwe.com will be delivered to any worldwide address, unless a remote island.  Please confirm if your shipping destination falls under ‘remote’.  We do not deliver to the Channel Islands (Alderney, Guernsey, Jersey and Sark), or to PO Box addresses.
              </p>
              <p className='pb-3'>
              Stones of Zimbabwe does everything in its power to respect the delivery times as mutually agreed upon. We cannot, however, be held responsible for the consequences of a late delivery or the loss of a package caused by a third-party contracted to make delivery, or by you, or because of some unforeseen event or an Act of God. In the event where you do not receive your package, an investigation will be conducted with the carrier and may take several weeks upon receipt of your claim. During this period of investigation, no reimbursement or re-delivery will take place.
              </p>
              <h3 className='py-5 text-blue-700 text-sm font-bold uppercase'>Right of Return</h3>
              <p className='pb-3'>
              Stones of Zimbabwe allows you 15 days to return a product that you are not satisfied with. Your right of return starts from the moment your order is delivered. You can return the product to us within this time frame, at your own expense, `with your invoice.
              </p>
              <p className='pb-3'>We request that you send us the merchandise by registered post and that you purchase insurance with your carrier for the value of the merchandise. This is necessary should they lose or damage the goods. Shipping fees remain the customer’s responsibility. The present right of return only applies to products that are returned in their original, complete condition (crate, packaging, etc.). Any product that has been damaged, is not in its original packaging, or has packaging that has been worn beyond simply opening the product, will not be refunded.</p>
              <span>Please enquire on our <Link className='text-blue-500' to='/contact'>contact</Link> page for the piece you are interested in or any further information.</span>
           </div>
        </article>
       </section>
    </>
  )
}

export default DeliveryPolicy;