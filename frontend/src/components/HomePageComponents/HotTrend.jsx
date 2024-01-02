import { getCourse, getHomeCourse } from "@/service/courseService";
import Link from "next/link";
import { useEffect, useState } from "react";

const HotTrend = () => {
  const [course, setCour] = useState([1,33,3,7]);
  useEffect(() => {
    getHomeCourse().then(res => {
      if (res.status==200)
      setCour(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }, [])
  return (
    <div className='p-5 w-full'>
      <div className=''>
        <div className='pb-4'>
          <h1 className='text-2xl font-bold'>Trending courses</h1>
        </div>
        <section
          id="Projects"
          className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
        >
          {course?.map((v, i) => (
            <Link href={`/courses/${v.id}`} className='p-5 pl-0' key={i} title={v.title}>
              <div className="w-60 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                <a href="#">
                  <img
                    src={v.image}
                    alt="Product"
                    className="h-30 w-62 object-cover rounded-t-xl"
                  />
                  <div className="px-4 py-3 w-62">
                    <span className="text-gray-400 mr-3 uppercase text-xs">Lecture: {v.username }</span>
                    <p className="text-lg font-bold text-black truncate block capitalize">
                      {v.title}
                    </p>
                    <div className="flex items-center">
                      <p className="text-lg font-semibold text-black cursor-auto my-3">
                        ${v.price}
                      </p>
                      
                      <div className="ml-[65%]">
                        <a href="" title="ADD TO CART">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          fill="currentColor"
                          className="bi bi-bag-plus"
                          viewBox="0 0 16 16"
                          
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                          />
                          <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                        </svg></a>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
};
export default HotTrend;
