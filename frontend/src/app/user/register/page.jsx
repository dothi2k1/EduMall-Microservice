'use client';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '@/context/User/AuthProvider';
import './reg.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { uploads } from '@/service/MediaService';
import { sigup } from '@/service/AuthService';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
const Register = () => {
  const { handleRegister, errorMessage, isLoggedIn } = useContext(AuthContext);
  const [pic, setPic] = useState();
  const [bonus, setBo] = useState(false);
  const [step, setStep] = useState(1);
  const [update, setUp] = useState(0);
  const [check, setCheck] = useState(false);
  const [valid, setValid] = useState(0);
  const route = useRouter();
  useEffect(() => {
    if (isLoggedIn) route.back('/')
  }, [])
  // preview avatar
  useEffect(() => {
    pic && setBo(true);
    return () => {
      pic && URL.revokeObjectURL(pic.preview);
    };
  }, [pic]);
  const preview = inputFile => {
    const file = inputFile.target.files[0];
    file.preview = URL.createObjectURL(file);
    setPic(file);
  };
  //preview avatar

  //validate
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      birthday: '',
      phone: '',
      school: '',
      gender: 0,
      major: '',
      degree: 0,
      avatar: '',
      address: '',
      achievement: '',
      role: [2]
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      school: Yup.string(),
      email: Yup.string()
        .required('Required')
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email'),
      birthday: Yup.date().required('Required'),
      gender: Yup.number().min(1, 'Choose your gender'),
      degree: Yup.string(),
      phone: Yup.string()
        .required('Required')
        .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Invalid phone number'),
      password: Yup.string().required('Required').matches(/^.{8,}$/, 'At least 8 charactors'),
      avatar: Yup.string(),
      address: Yup.string().required('Required'),
      achievement: Yup.string(),
      major: Yup.string()
    })

  });

  const submit = (e) => {
    e.preventDefault();
    let value = { ...formik.values }
    if (pic) {
      const data = new FormData();
      data.append('apikey', 'EDUMALL');
      data.append('images', pic);
      uploads(data).then(res => {
        console.log(res);
        if (res.code != 200) toast("Lost connection", { autoClose: 2000, type: 'error', closeButton: false });
        if (res.status == 200) { value = { ...value, avatar: res.data.files[0].imageUrl }; console.log(value); }
      }).catch(res => { toast(res, { autoClose: 2000, type: 'error', closeButton: false }); });
    }

    sigup(value).then(res => {
      if (res.status == 200) {
        toast(res.data, { autoClose: 2000, type: 'success', closeButton: false });
        // route.push('user/login');
        setStep(3);
      }
    });
  }
  const setRole = (e) => {
    if (e.target.value == 2) formik.values.role = [2, 3]
    if (e.target.value == 3) formik.values.role = [3]
  }
  return (
    <div className=" pt-[55px] lg:pt-[75px] bg-[url('/bgtim.webp')] pb-3">
      <form className='relative border border-gray-100 max-w-screen-md mx-auto rounded-md space-y-2 bg-white p-6 shadow-xl lg:p-6' action="" method="post" onSubmit={submit}>
        <h1 className='mb-3 text-xl font-semibold lg:text-2xl'>Register</h1>
        <div className='w-full'>
          <section className='bg-white '>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
              <ul className='mx-auto  mt-2 grid max-w-md gap-10 lg:mt-3 lg:max-w-5xl grid-cols-5'>
                <li className='' onClick={() => setStep(1)}>
                  <div className='flex flex-col items-center text-center'>
                    <div style={{ color: (step == 1) && 'white', backgroundColor: (step == 1) && 'black' }}
                      className={`inline-flex h-10 hover:text-white  
                       cursor-pointer w-10 shrink-0 items-center justify-center rounded-xl border border-gray-300 bg-gray-50 transition-all duration-200 group-hover:border-gray-900 hover:bg-gray-900`}
                    >
                      1
                    </div>
                    <div className='lg:ml-0 lg:mt-1'>
                      <h3 className='text-sm  text-gray-900 '>Base info</h3>
                    </div>
                  </div>
                </li>
                <li className='flex-start group relative '>
                  <span className='absolute bg-gray-300  top-[18px] h-px w-[calc(100%_-_30px)]' aria-hidden='true' />
                </li>
                <li onClick={() => { setStep(2) }}>
                  <div className='flex flex-col items-center text-center'>
                    <div style={{ color: (step == 2) && 'white', backgroundColor: (step == 2) && 'black' }}
                      className={`inline-flex h-10 hover:text-white cursor-pointer w-10 shrink-0 items-center justify-center rounded-xl border  border-gray-300 transition-all duration-200 group-hover:border-gray-900 hover:bg-gray-900`}
                    >
                      2
                    </div>
                    <div className='lg:ml-0 lg:mt-1 '>
                      <h3 className='text-sm text-gray-900'>Advance info</h3>
                    </div>
                  </div>
                </li>
                <li className='flex-start group relative flex flex-col'>
                  <span className='absolute bg-gray-300  top-[18px] h-px w-[calc(100%_-_30px)]' aria-hidden='true' />
                </li>
                <li className='flex-start group relative flex flex-col' onClick={() => setStep(3)}>
                  <div style={{ color: (step == 3) && 'white', backgroundColor: (step == 3) && 'black' }}
                    className={`inline-flex h-10 hover:text-white cursor-pointer  w-10 shrink-0 items-center justify-center rounded-xl border border-gray-300 transition-all duration-200 group-hover:border-gray-900 hover:bg-gray-900`}
                  >
                    3
                  </div>
                  <div className='lg:ml-0 lg:mt-1'>
                    <h3 className='text-sm text-gray-900'>Done</h3>
                  </div>
                </li>
              </ul>
            </div>
          </section>
        </div>

        {/* step 1 */}
        <div className={`w-full space-y-1 lg:min-h-[400px] lg:max-h-[700px] input_field relative pt-2`} style={{ height: (bonus && step == 2) ? '800px' : (step == 3) && '500px' }}>
          <div className={`page_reg ${step === 1 ? '' : 'hide'}`}>
            <div className='md:grid md:gap-3 md:grid-cols-2 input_area'>
              <div className='relative'>
                <label className=''> User Name </label>
                <input

                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  onFocus={formik.handleBlur}
                  name='username'
                  value={formik.values.username}
                  type='text'
                  placeholder='Your Name'
                  className='mt-1 h-[36px] w-full outline-0 focus:border-blue-600 text-sm font-light border-gray-400 rounded-[15px] bg-white px-3'
                />
                <i className="fa-solid fa-check absolute top-[38px] right-4" style={{ color: "#00db25", display: (!formik.touched.username) ? 'none' : (formik.errors.username) ? 'none' : '' }} />
                <p className='text-red-700 text-thin text-sm'>{(!formik.touched.username) ? '' : (formik.errors.username) ? formik.errors.username : ''}</p>

              </div>
              <div className='relative'>
                <label className=''> Email </label>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  onFocus={formik.handleBlur}
                  required
                  name='email'
                  value={formik.values.email}
                  type='email'
                  placeholder='Your email'
                  className='mt-1 h-[36px] w-full outline-0 focus:border-blue-600 text-sm font-light border-gray-400 rounded-[15px] bg-white px-3'
                />
                <i className="fa-solid fa-check absolute top-[38px] right-4" style={{ color: "#00db25", display: (!formik.touched.email) ? 'none' : (formik.errors.email) ? 'none' : '' }} />
                <p className='text-red-700 text-thin text-sm'>{(!formik.touched.email) ? '' : (formik.errors.email) ? formik.errors.email : ''}</p>
              </div>
            </div>
            <div className='grid gap-3 md:grid-cols-2'>
              <div className='relative'>
                <label className=''> Password </label>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  onFocus={formik.handleBlur}
                  value={formik.values.password}
                  name='password'
                  type='password'
                  placeholder='Your Name'
                  className='mt-1 h-[36px] w-full outline-0 focus:border-blue-600 text-sm font-light border-gray-400 rounded-[15px] bg-white px-3'
                />
                <i className="fa-solid fa-check absolute top-[38px] right-4" style={{ color: "#00db25", display: (!formik.touched.password) ? 'none' : (formik.errors.password) ? 'none' : '' }} />
                <p className='text-red-700 text-thin text-sm'>{(!formik.touched.password) ? '' : (formik.errors.password) ? formik.errors.password : ''}</p>

              </div>
              <div className='relative'>
                <label className=''> Confirm password </label>
                <input
                  required
                  name='password'
                  onChange={(e) => { if (e.target.value == formik.values.password) setValid(2); else setValid(1) }}

                  type='password'
                  placeholder='******'
                  className='mt-1 h-[36px] w-full outline-0 focus:border-blue-600 text-sm font-light border-gray-400 rounded-[15px] bg-white px-3'
                />
                <i className="fa-solid fa-check absolute top-[38px] right-4" style={{ color: "#00db25", display: (valid == 0) ? 'none' : (valid == 2) ? '' : 'none' }} />
                <p className='text-red-700 text-thin text-sm' style={{ display: (valid == 0) ? 'none' : (valid == 2) ? 'none' : (valid == 1) ? '' : 'none' }}>
                  Password not match
                </p>

              </div>
            </div>
            <div className='grid gap-3 md:grid-cols-2'>
              <div className='relative'>
                <label className=''> Birthday </label>
                <input
                  onChange={formik.handleChange}
                  name='birthday'
                  onBlur={formik.handleBlur}
                  onFocus={formik.handleBlur}
                  value={formik.values.birthday}
                  type='date'
                  placeholder='dd-MM-yyyy'
                  className='mt-1 h-[36px] w-full outline-0 focus:border-blue-600 text-sm font-light border-gray-400 rounded-[15px] bg-white px-3'
                />
                <div className='absolute top-[33px] right-4 w-[15px] bg-gray-100'>
                  <i className="fa-solid fa-check " style={{ color: "#00db25", display: (!formik.touched.birthday) ? 'none' : (formik.errors.birthday) ? 'none' : '' }} /></div>
                <p className='text-red-700 text-thin text-sm'>{(!formik.touched.birthday) ? '' : (formik.errors.birthday) ? formik.errors.birthday : ''}</p>

              </div>
              <div className='relative'>
                <label className=''> Address </label>
                <input
                  onChange={formik.handleChange}
                  name='address'
                  onBlur={formik.handleBlur}
                  onFocus={formik.handleBlur}
                  value={formik.values.address}
                  type='text'
                  placeholder='Your address'
                  className='mt-1 h-[36px] w-full outline-0 focus:border-blue-600 text-sm font-light border-gray-400 rounded-[15px] bg-white px-3'
                />
                <i className="fa-solid fa-check absolute top-[38px] right-4" style={{ color: "#00db25", display: (!formik.touched.address) ? 'none' : (formik.errors.address) ? 'none' : '' }} />
                <p className='text-red-700 text-thin text-sm'>{(!formik.touched.address) ? '' : (formik.errors.address) ? formik.errors.address : ''}</p>

              </div>
            </div>
            <div className='grid gap-3 md:grid-cols-2'>
              <div className='relative'>
                <label className=''> Gender </label>
                <div className='relative w-full  mt-1 bg-white rounded-[15px]'>
                  <input className='peer hidden' type='checkbox' name='select-1' id='select-1' checked={check} />
                  <label
                    onClick={() => { setCheck(!check); formik.touched.gender = true; }}
                    htmlFor='select-1'
                    className='flex w-full h-[36px] cursor-pointer rounded-[15px] select-none border border-gray-400 p-2 px-3 text-sm text-gray-700 ring-blue-400 peer-checked:ring'
                  >
                    {formik.values.gender == 0
                      ? 'Select gender'
                      : formik.values.gender == 1
                        ? 'Male'
                        : formik.values.gender == 2
                          ? 'Female'
                          : 'Orther'}
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
                    <li
                      onClick={() => {
                        formik.values.gender = 1;
                        setUp(update + 1);
                        setCheck(!check);
                      }}
                      className='cursor-pointer px-3 py-2 text-sm text-gray-500 hover:bg-blue-500 hover:text-white'
                    >
                      Male
                    </li>
                    <li
                      onClick={() => {
                        formik.values.gender = 2;
                        setUp(update + 1);
                        setCheck(!check);
                      }}
                      className='cursor-pointer px-3 py-2 text-sm text-gray-500 hover:bg-blue-500 hover:text-white'
                    >
                      Female
                    </li>
                    <li
                      onClick={() => {
                        formik.values.gender = 3;
                        setUp(update + 1);
                        setCheck(!check);
                      }}
                      className='cursor-pointer px-3 py-2 text-sm text-gray-500 hover:bg-blue-500 hover:text-white'
                    >
                      Other
                    </li>
                  </ul>
                </div>
                <div className='absolute top-[34px] right-4 w-[17px] bg-white'>
                  <i className="fa-solid fa-check" style={{ color: "#00db25", display: (!formik.touched.gender) ? 'none' : (update == 0) ? 'none' : '' }} />
                </div>
                <p className='text-red-700 text-thin text-sm'>{(!formik.touched.gender) ? '' : (update == 0) ? formik.errors.gender : ''}</p>
              </div>
              <div className='relative'>
                <label className=''>
                  {' '}
                  Phone: <span className='text-sm text-gray-400'>(optional)</span>{' '}
                </label>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  onFocus={formik.handleBlur}
                  value={formik.values.phone}
                  name='phone'
                  type='text'
                  placeholder='0123545543'
                  className='mt-1 h-[36px] w-full outline-0 focus:border-blue-600 text-sm font-light border-gray-400 rounded-[15px] bg-white px-3'
                />

                <i className="fa-solid fa-check absolute top-[38px] right-4" style={{ color: "#00db25", display: (!formik.touched.phone) ? 'none' : (formik.errors.phone) ? 'none' : '' }} />
                <p className='text-red-700 text-thin text-sm'>{(!formik.touched.phone) ? '' : (formik.errors.phone) ? formik.errors.phone : ''}</p>
              </div>
            </div>

          </div>

          {/* step 2 */}
          <div className={` page_reg ${step === 2 ? '' : 'hide'}`}>
            <div className='p-3 w-full flex flex-col items-center'>
              {pic && <img src={pic.preview} alt='' id='avatar' style={{ borderRadius: '50%' }} width={'200px'} height={'200px'} />}
              <label htmlFor='file' className='border border-gray-600 p-1 mt-1'>
                {!pic ? 'picture' : 'change'}
                <input

                  type='file'
                  name='avatar'
                  id='file'
                  onChange={preview}
                  hidden
                />
              </label>
            </div>
            <div className='grid gap-3 md:grid-cols-2'>
              <div className='relative'>
                <label className=''> School </label>
                <input
                  name='school'

                  type='text'
                  placeholder='Your school'
                  className='mt-1 h-[36px] w-full outline-0 focus:border-blue-600 text-sm font-light border-gray-400 rounded-[15px] bg-white px-3'
                />

              </div>
              <div className='relative'>
                <label className=''> Major </label>
                <input
                  name='major'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  onFocus={formik.handleBlur}
                  type='text'
                  placeholder='Your major'
                  className='mt-1 h-[36px] w-full outline-0 focus:border-blue-600 text-sm font-light border-gray-400 rounded-[15px] bg-white px-3'
                />
              </div>
            </div>
            <div className='grid gap-3 md:grid-cols-2'>
              <div className='relative'>
                <label className=''> Degree </label>
                <select name='degree' className='mt-1 h-[36px] w-full border focus:border-blue-600 text-sm font-light border-gray-400 rounded-[15px] bg-white px-3'>
                  <option value={1}>high school</option>
                  <option value={2}>bachelor</option>
                  <option value={3}>master</option>
                </select>

              </div>
              <div className='relative'>
                <label className=''> You are </label>
                <select className='mt-1 h-[36px] w-full border focus:border-blue-600 text-sm font-light border-gray-400 rounded-[15px] bg-white px-3' onChange={setRole}>
                  <option value={3}>Student</option>
                  <option value={2}>Lecture</option>
                </select>
              </div>
            </div>
            <div className='grid gap-3 md:grid-cols-1'>
              <div className='relative'>
                <label className=''> Achivements </label>
                <textarea
                  placeholder='...'
                  className='mt-1 max-h-[200px] w-full outline-0 focus:border-blue-600 text-sm font-light border-gray-400 rounded-[15px] bg-white px-3'
                />
              </div>
            </div>
            <div className='grid gap-3 md:grid-cols-2'></div>
            <div className='checkbox'>
              <input

                type='checkbox'
                id='chekcbox1'
                defaultChecked=''
              />
              <label htmlFor='chekcbox1'>
                {' '}
                I agree to the{' '}
                <a href='#' target='_blank' className='text-blue-600'>
                  {' '}
                  Terms and Conditions{' '}
                </a>{' '}
              </label>
            </div>
          </div>

          {/* step 3 */}
          <div className={` page_reg ${step === 3 ? '' : 'hide'}`}>
            {/* <h3>You have signed up successfully!</h3> */}

            {/* modal */}
            <div className="relative container m-auto px-6">
              <div className="m-auto md:w-7/12">
                <div className="rounded-xl bg-white">
                  <div className="p-8">
                    <div className="space-y-4">
                      <img
                        src="https://www.svgrepo.com/show/475643/dribbble-color.svg"
                        loading="lazy"
                        className="w-10"
                      />
                      <h2 className="mb-8 text-2xl text-cyan-900  font-bold">
                        You have signed up successfully!
                      </h2>
                    </div>
                    <div className="mt-10 grid space-y-4">
                      <a href='/user/login' className="group h-13 px-6  border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                        <div className=" flex h-12 items-center space-x-4 justify-center">

                          <span className=" w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                            Login
                          </span>
                        </div>
                      </a>
                      <a href='/' className="group h-13 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                        <div className=" flex h-12 items-center space-x-4 justify-center align-middle">
                          <span className=" w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                            Back to homepage
                          </span>
                        </div>
                      </a>
                    </div>
                    <div className="mt-14 space-y-4 py-3 text-gray-600 dark:text-gray-400 text-center">
                      <p className="text-xs">
                        By proceeding, you agree to our
                        <a href="/privacy-policy/" className="underline">
                          Terms of Use
                        </a>
                        and confirm you have read our
                        <a href="/privacy-policy/" className="underline">
                          Privacy and Cookie Statement
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
        <div className='relative'>
          {(step == 2) && <button type='submit' style={{ display: (step == 3) ? 'none' : '' }} className='mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white'>
            Get Started
          </button>}
          {(step == 1) &&
            <button type='button' onClick={() => setStep(2)} style={{ display: (step == 3) ? 'none' : '' }} className='mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white'>
              Next
            </button>
          }
        </div>
      </form>
    </div>
  );
};

export default Register;
