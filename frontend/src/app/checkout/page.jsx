'use client';
import { CartContext } from '@/context/Products/cartContext';
import axiosInstance from '@/utils/axios';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { useContext } from 'react';

const Checkout = () => {
  const routes = usePathname();
  console.log(routes);
  const { cartItems, addToCart, handleRemoveItem, calculateTotalPrice, itemInfo } = useContext(CartContext);

  const [paymentResponse, setPaymentResponse] = useState(null);

  const handlePaymentClick = () => {
    const requestData = {
      orderCode: JSON.parse(window.localStorage.getItem('cart')).id,
      amount: calculateTotalPrice(),
      cancelUrl: process.env.NEXT_DOMAIN + '/payment/cancel',
      returnUrl: process.env.NEXT_DOMAIN + '/payment/success',
      description: 'jsdh'
    };

    axiosInstance
      .post('/api/payment/create', requestData)
      .then(response => {
        const result = response.data;
        setPaymentResponse(result);

        // Check if the payment was successful and has a checkoutUrl
        if (result.code === '00' && result.data && result.data.checkoutUrl) {
          // Redirect to the checkout URL
          window.location.href = result.data.checkoutUrl;
        }
      })
      .catch(error => console.log('error', error));
  };
  return (
    <div>
      <>
        <div className='flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32'>
          <a className='text-2xl font-bold text-gray-800'>sneekpeeks</a>
          <div className='mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base'>
            <div className='relative'>
              <ul className='relative flex w-full items-center justify-between space-x-2 sm:space-x-4'>
                <li className='flex items-center space-x-3 text-left sm:space-x-4'>
                  <a className='flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-4 w-4'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth={2}
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
                    </svg>
                  </a>
                  <span className='font-semibold text-gray-900'>Check your cart</span>
                </li>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-4 w-4 text-gray-400'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
                </svg>

                <li className='flex items-center space-x-3 text-left sm:space-x-4'>
                  <a
                    className='flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white'
                    href='#'
                  ></a>
                  <span className='font-semibold text-gray-500'>Payment</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32'>
          <div className='px-4 pt-8'>
            <p className='text-xl font-medium'>Order Summary</p>
            <p className='text-gray-400'>Check your items.</p>
            <div className='mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6'>
              {itemInfo?.map((v, i) => (
                <div className='flex flex-col rounded-lg bg-white sm:flex-row relative' key={i}>
                  <img className='m-2 h-24 w-28 rounded-md border object-cover object-center' src={v.image} alt='' />
                  <div className='flex w-full flex-col px-4 py-4'>
                    <span className='font-semibold'>{v?.title && JSON.parse(v?.title).bigTitle}</span>
                    <p className='text-lg font-bold'>VND {cartItems[i]?.price}</p>
                  </div>
                  <span
                    className='absolute top-[80%] right-[5%] hover:[text-shadow:0px_0px_3px_var(--tw-shadow-color)] shadow-red-500 text-sm text-red-600 cursor-pointer'
                    onClick={() => handleRemoveItem(i)}
                  >
                    Remove
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className='mt-10 bg-gray-50 px-4 pt-8 lg:mt-0'>
            <p className='text-xl font-medium'>Payment Details</p>
            <div className=''>
              {/* Total */}

              <div className='mt-6 flex items-center justify-between'>
                <p className='text-sm font-medium text-gray-900'>Total</p>
                <p className='text-2xl font-semibold text-gray-900'>VND {calculateTotalPrice()}</p>
              </div>
            </div>
            <button
              className='mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white'
              onClick={handlePaymentClick}
            >
              Place Order
            </button>
          </div>
        </div>
      </>
    </div>
  );
};

export default Checkout;
