'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './Category.css'
const Category = ({ image,category }) => {
  return (
    <Link href={'#'}>
      <div className='category-item-div flex flex-col items-center	p-3'>
        <div className='category-item-img px-[40px]'>
          <img src={image}  />
        </div>
        <div className='category-item-name'>
          <h5>{category }</h5>
        </div>
      </div>
    </Link>
  );
};


const CategoriesList = () => {
  const [categories, setCate] = useState(['python']);
  const categories_images = [

  './cat_aws.png'


  ]
  return (
    <div className='p-5 w-full'>
      <div className=''>
        <div className='pb-4'>
          <h1 className='text-2xl font-bold	'>Top Categories</h1>
        </div>
        <div className='flex flex-wrap	'>
          {categories?.map((category, idx) => {
            return <Category image={categories_images[idx]} category={category}  key={idx} />;
          })}
        </div>
      </div>
    </div>
  );
}
export default CategoriesList;
