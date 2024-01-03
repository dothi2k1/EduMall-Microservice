import { useState } from "react";

export default function Description({ title, more, content }) {
  const [open,setOpen]=useState(false)
  return (
    <div className="my-5">
      <div>
        <p className="text-[24px] font-bold text-gray-800 my-2">Description:</p>
      </div>
      <div className="">
        <div className={`my-1 text-justify ${(open)?'h-[200px]':'h-fit'}`}>
          <p className="ml-1">{title}</p>
          {content?.map((v,i)=><p className="ml-1" key={i}>
            {v}
          </p>)}          
        </div>
        <div className="px-5 justify-between border border-solid">
          <div className="text-base text-center font-semibold my-5 cursor-pointer" onClick={()=>setOpen(!open)}>
            <span className="">{open?'COLLAPSE':'EXTEND'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
