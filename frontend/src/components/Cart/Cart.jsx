'use client';
import { useContext } from 'react';
import { CartContext } from '@/context/Products/cartContext';


const Cart = () => {
  
  const {
    cartItems,
    addToCart,
    calculateTotalPrice,
    calculateTotalProduct,
    showItem,
    setShowItem,
    showCart,
    setShowCart,
    handleRemoveItem
  } = useContext(CartContext);
  return (
    <div
      className={`fixed transition duration-500 ease-in-out top-0 
    px-6 py-4 z-10 h-full right-0 flex flex-col max-w-md min-w-[250px]
    bg-white shadow-[rgba(0,0,0,0.3)_0px_0px_4px_4px] 
    ${showCart}
    `}
    >
      <button className='w-fit hover:bg-gray-200 px-1.5 rounded' onClick={() => setShowCart('translate-x-[200%]')}>
        <i className='fa-solid fa-xmark'></i>
      </button>
      <h2 className='text-xl font-semibold'>Order items</h2>
      <hr />
      <div className='h-full overflow-auto p-3'>
        <ul className='flex flex-col pt-4 space-y-2'>
          {cartItems?.map((v, i) => (
            <li className='text-ellipsis overflow-hidden whitespace-nowrap max-w-[120xp]' key={i}>
              <div>
                <div>
                  <img src={''} alt={v.title?.bigtitle} />
                </div>
                <h3>{v.title?.bigtitle}</h3>
              </div>
              <div className='flex w-full justify-between'>
                <div>
                  <a
                    className='hover:[text-shadow:0px_0px_3px_var(--tw-shadow-color)] shadow-red-500 text-sm text-red-600 cursor-pointer'
                    onClick={() => handleRemoveItem(i)}
                  >
                    Remove
                  </a>
                </div>
                <div className='text-right'>
                  <span className='font-bold text-green-300'>{v.price}</span>
                </div>
              </div>
            </li>
          ))}
          {/* <li className='text-ellipsis overflow-hidden whitespace-nowrap max-w-[120xp]'>
            <div>
              <div>
                <img src="" alt="" />
              </div>
              <h3>
              Hard taco, chicken
              </h3>
            </div>
            <div className="flex w-full justify-between">
              <div> <a className=" text-sm text-red-600">Remove</a></div>
            <div className='text-right'>
              <span className='font-bold text-green-300'>$7.50</span>
            </div>
            </div>
          </li> */}
        </ul>
      </div>
      <div className='space-y-6'>
        <div className='flex justify-between'>
          <span>Total</span>
          <span className='font-semibold'>{calculateTotalPrice()}</span>
        </div>
        <button
          type='button'
          className='w-full py-2 font-semibold border rounded dark:bg-violet-400 dark:text-gray-900 dark:border-violet-400'
          
        >
          <a href="/checkout">Go to checkout</a>
        </button>
      </div>
    </div>
  );
};
export default Cart;
