'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './Category.css'
import { getAllCate } from '@/service/categoryService';
const Category = ({ image,category }) => {
  return (
    <Link href={'#'} className='p-5 pl-0'>
      <div className='category-item-div flex flex-col items-center	p-3'>
        <div className='category-item-img px-[40px]'>
          <img src={image} alt={category } />
        </div>
        <div className='category-item-name'>
          <h5>{category}</h5>
        </div>
      </div>
    </Link>
  );
};


const CategoriesList = () => {
  const [categories, setCate] = useState(['python']);
  const categories_images = ['./cat_aws.png'];
  const [param, setPa] = useState({ page: 0, name: '' });
  useEffect(() => {
    getAllCate(param.page, param.name).then(res => { console.log(res); setCate(res.data)});
  },[])
  return (
    <div className='p-5 w-full'>
      <div className=''>
        <div className='pb-4'>
          <h1 className='text-2xl font-bold	'>Top Categories</h1>
        </div>
        <div className='flex flex-wrap	'>
          {categories?.map((category, idx) => {
            return <Category image={category.image} category={category.name}  key={idx} />;
          })}
        </div>
      </div>
    </div>
  );
}
export default CategoriesList;
