'use client';
import React, { useContext, useState } from 'react';
import { AuthContext } from '@/context/User/AuthProvider';
import './reg.css';

const Register = () => {
  const { handleRegister, errorMessage, isLoggedIn } = useContext(AuthContext);

  const [step, setStep] = useState(1);

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   if (password === confirmPassword) {
  //     handleRegister(username, email, password);
  //   } else {
  //     alert('Mật khẩu xác nhận không khớp!');
  //   }
  // };

  return isLoggedIn ? (
    <p>Bạn đã login rồi</p>
  ) : (
    <div className=" pt-[55px] lg:pt-[75px] bg-[url('/bgtim.webp')]">
      <form className='relative border border-gray-100 max-w-screen-md mx-auto rounded-md space-y-2 bg-white p-6 shadow-xl lg:p-6'>
        <h1 className='mb-3 text-xl font-semibold lg:text-2xl'>Register</h1>
        <div className='w-full'>
          <section className="bg-white ">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

              <ul className="mx-auto  mt-2 grid max-w-md grid-cols-1 gap-10 sm:mt-16 lg:mt-3 lg:max-w-5xl lg:grid-cols-3">
                <li className="flex-start group relative flex lg:flex-col" onClick={() => setStep(1)}>
                  <span
                    className="absolute left-[18px] top-0 h-[calc(100%_-_32px)] w-px bg-gray-300 lg:right-0 lg:left-auto lg:top-[18px] lg:h-px lg:w-[calc(100%_-_72px)]"
                    aria-hidden="true"
                  />
                  <div className="inline-flex h-10 hover:text-white cursor-pointer w-10 shrink-0 items-center justify-center rounded-xl border border-gray-300 bg-gray-50 transition-all duration-200 group-hover:border-gray-900 hover:bg-gray-900">
                    1

                  </div>
                  <div className="ml-6 lg:ml-0 lg:mt-1">
                    <h3 className="text-base font-bold text-gray-900 before:mb-2 before:block before:font-mono before:text-sm before:text-gray-500">
                      Base info
                    </h3>
                  </div>
                </li>
                <li className="flex-start group relative flex lg:flex-col" onClick={() => setStep(2)}>
                  <span
                    className="absolute left-[18px] top-14 h-[calc(100%_-_32px)] w-px bg-gray-300 lg:right-0 lg:left-auto lg:top-[18px] lg:h-px lg:w-[calc(100%_-_72px)]"
                    aria-hidden="true"
                  />
                  <div className="inline-flex h-10 hover:text-white cursor-pointer	 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-300 bg-gray-50 transition-all duration-200 group-hover:border-gray-900 hover:bg-gray-900">
                    2
                  </div>
                  <div className="ml-6 lg:ml-0 lg:mt-1">
                    <h3 className="text-base font-bold text-gray-900 before:mb-2 before:block before:font-mono before:text-sm before:text-gray-500">
                      Advance info
                    </h3>

                  </div>
                </li>

                <li className="flex-start group relative flex lg:flex-col" onClick={() => setStep(3)}>
                  <div className="inline-flex h-10 hover:text-white cursor-pointer	 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-300 bg-gray-50 transition-all duration-200 group-hover:border-gray-900 hover:bg-gray-900">
                    3
                  </div>
                  <div className="ml-6 lg:ml-0 lg:mt-1">
                    <h3 className="text-base font-bold text-gray-900 before:mb-2 before:block before:font-mono before:text-sm before:text-gray-500">
                      Done
                    </h3>

                  </div>
                </li>
              </ul>
            </div>
          </section>
        </div>

        {/* step 1 */}
          <div className='w-full min-h-[400px] relative'>
          
          <div className={`page_reg ${(step === 1) ? '' : 'hide'}`}>
            <div className='grid gap-3 md:grid-cols-2'>
              <div>
                <label className=''> User Name </label>
                <input
                  type='text'
                  placeholder='Your Name'
                  className='mt-2 h-[36px] w-full outline-0 focus:border-blue-600 text-base border-gray-400 rounded-md bg-gray-100 px-3'
                />
              </div>
              <div>
                <label className=''> Email </label>
                <input
                  type='text'
                  placeholder='Last  Name'
                  className='mt-2 h-[36px] w-full outline-0 focus:border-blue-600 text-base border-gray-400 rounded-md bg-gray-100 px-3'
                />
              </div>
            </div>
            <div className='grid gap-3 md:grid-cols-2'>
              <div>
                <label className=''> Password </label>
                <input
                  type='password'
                  placeholder='Your Name'
                  className='mt-2 h-[36px] w-full outline-0 focus:border-blue-600 text-base border-gray-400 rounded-md bg-gray-100 px-3'
                />
              </div>
              <div>
                <label className=''> Confirm password </label>
                <input
                  type='password'
                  placeholder='******'
                  className='mt-2 h-[36px] w-full outline-0 focus:border-blue-600 text-base border-gray-400 rounded-md bg-gray-100 px-3'
                />
              </div>
            </div>
            <div className='grid gap-3 md:grid-cols-2'>
              <div>
                <label className=''> Birthday </label>
                <input
                  type='text'
                  placeholder='Your Name'
                  className='mt-2 h-[36px] w-full outline-0 focus:border-blue-600 text-base border-gray-400 rounded-md bg-gray-100 px-3'
                />
              </div>
              <div>
                <label className=''> Address </label>
                <input
                  type='text'
                  placeholder='Last  Name'
                  className='mt-2 h-[36px] w-full outline-0 focus:border-blue-600 text-base border-gray-400 rounded-md bg-gray-100 px-3'
                />
              </div>
            </div>
            <div className='grid gap-3 md:grid-cols-2'>
              <div>
                <label className=''> Gender </label>
                <div className='relative w-56 mt-2 bg-gray-100 rounded-lg'>
                  <input className='peer hidden' type='checkbox' name='select-1' id='select-1' />
                  <label
                    htmlFor='select-1'
                    className='flex w-full cursor-pointer rounded-lg select-none border p-2 px-3 text-sm text-gray-700 ring-blue-400 peer-checked:ring'
                  >
                    Select Option{' '}
                  </label>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='pointer-events-none absolute right-5 top-3 h-4 text-gray-600 transition peer-checked:rotate-180'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7' />
                  </svg>
                  <ul className='absolute bg-white w-full max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-md transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3'>
                    <li className='cursor-pointer px-3 py-2 text-sm text-gray-500 hover:bg-blue-500 hover:text-white'>
                      Male
                    </li>
                    <li className='cursor-pointer px-3 py-2 text-sm text-gray-500 hover:bg-blue-500 hover:text-white'>
                      Female
                    </li>
                    <li className='cursor-pointer px-3 py-2 text-sm text-gray-500 hover:bg-blue-500 hover:text-white'>
                      Other
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <label className=''>
                  {' '}
                  Phone: <span className='text-sm text-gray-400'>(optional)</span>{' '}
                </label>
                <input
                  type='text'
                  placeholder='+543 5445 0543'
                  className='mt-2 h-[36px] w-full outline-0 focus:border-blue-600 text-base border-gray-400 rounded-md bg-gray-100 px-3'
                />
              </div>
            </div>
            <div className='checkbox'>
              <input type='checkbox' id='chekcbox1' defaultChecked='' />
              <label htmlFor='checkbox1'>
                I agree to the{' '}
                <a href='#' target='_blank' className='text-blue-600'>
                  {' '}
                  Terms and Conditions{' '}
                </a>{' '}
              </label>
            </div>
          </div>

          {/* step 2 */}
          <div className={`page_reg ${(step === 2) ? '' : 'hide'}`}>
            <div className='grid gap-3 md:grid-cols-2'>
              <div>
                <label className=''> User Name </label>
                <input
                  type='text'
                  placeholder='Your Name'
                  className='mt-2 h-[36px] w-full outline-0 focus:border-blue-600 text-base border-gray-400 rounded-md bg-gray-100 px-3'
                />
              </div>
              <div>
                <label className=''> Email </label>
                <input
                  type='text'
                  placeholder='Last  Name'
                  className='mt-2 h-[36px] w-full outline-0 focus:border-blue-600 text-base border-gray-400 rounded-md bg-gray-100 px-3'
                />
              </div>
            </div>
            <div className='grid gap-3 md:grid-cols-2'>
              <div>
                <label className=''> Password </label>
                <input
                  type='password'
                  placeholder='Your Name'
                  className='mt-2 h-[36px] w-full outline-0 focus:border-blue-600 text-base border-gray-400 rounded-md bg-gray-100 px-3'
                />
              </div>
              <div>
                <label className=''> Confirm password </label>
                <input
                  type='password'
                  placeholder='******'
                  className='mt-2 h-[36px] w-full outline-0 focus:border-blue-600 text-base border-gray-400 rounded-md bg-gray-100 px-3'
                />
              </div>
            </div>
            <div className='grid gap-3 md:grid-cols-2'>
              <div>
                <label className=''> Birthday </label>
                <input
                  type='text'
                  placeholder='Your Name'
                  className='mt-2 h-[36px] w-full outline-0 focus:border-blue-600 text-base border-gray-400 rounded-md bg-gray-100 px-3'
                />
              </div>
              <div>
                <label className=''> Address </label>
                <input
                  type='text'
                  placeholder='Last  Name'
                  className='mt-2 h-[36px] w-full outline-0 focus:border-blue-600 text-base border-gray-400 rounded-md bg-gray-100 px-3'
                />
              </div>
            </div>
            <div className='grid gap-3 md:grid-cols-2'>
              <div>
                <label className=''> Gender </label>
                <div className='relative w-56 mt-2 bg-gray-100 rounded-lg'>
                  <input className='peer hidden' type='checkbox' name='select-1' id='select-1' />
                  <label
                    htmlFor='select-1'
                    className='flex w-full cursor-pointer rounded-lg select-none border p-2 px-3 text-sm text-gray-700 ring-blue-400 peer-checked:ring'
                  >
                    Select Option{' '}
                  </label>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='pointer-events-none absolute right-5 top-3 h-4 text-gray-600 transition peer-checked:rotate-180'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7' />
                  </svg>
                  <ul className='absolute bg-white w-full max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-md transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3'>
                    <li className='cursor-pointer px-3 py-2 text-sm text-gray-500 hover:bg-blue-500 hover:text-white'>
                      Male
                    </li>
                    <li className='cursor-pointer px-3 py-2 text-sm text-gray-500 hover:bg-blue-500 hover:text-white'>
                      Female
                    </li>
                    <li className='cursor-pointer px-3 py-2 text-sm text-gray-500 hover:bg-blue-500 hover:text-white'>
                      Other
                    </li>
                  </ul>
                </div>
              </div>
              
            </div>
            <div className='checkbox'>
              <input type='checkbox' id='chekcbox1' defaultChecked='' />
              <label htmlFor='checkbox1'>
                I agree to the{' '}
                <a href='#' target='_blank' className='text-blue-600'>
                  {' '}
                  Terms and Conditions{' '}
                </a>{' '}
              </label>
            </div>
          </div>
        </div>
        <div>
          <button type='button' className='mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white'>
            Get Started
          </button>
        </div>
      </form>

    </div>
  );
};

export default Register;
