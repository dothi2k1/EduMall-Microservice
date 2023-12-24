import { getCourse, getHomeCourse } from "@/service/courseService";
import Link from "next/link";
import { useEffect, useState } from "react";

const HotTrend = () => {
          const [course, setCour] = useState([]);
          useEffect(() => {
             getHomeCourse().then(res => {
                       console.log(res); 
                       setCour(res.data);
             }).catch((err) => {
                   console.log(err) 
             });     
          },[])
  return (
    <div className='p-5 w-full'>
      <div className=''>
        <div className='pb-4'>
          <h1 className='text-2xl font-bold'>Trending courses</h1>
        </div>
        <div className='flex flex-wrap'>
          {course?.map((v,i)=>(
               <Link href={'#'} className='p-5 pl-0' key={i}>
               <div className='category-item-div flex flex-col items-center	p-3'>
                 <div className='category-item-img px-[40px]'>
                   <img src={v.image} alt={v.title } />
                 </div>
                 <div className='category-item-name'>
                   <h5>{v.title}</h5>
                 </div>
               </div>
             </Link>     
          ))}
        </div>
      </div>
    </div>
  );
};
export default HotTrend;
