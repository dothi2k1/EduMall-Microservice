import { useEffect, useState } from "react";
import './Detail.css'
export default function ThisCourseInclude({ routes, summary }) {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState([]);
  useEffect(() => {
    console.log(route.includes(0));
  },[route])
  return (
    <div>
      <div className=" my-5">
        <div>
          <p className="text-[24px] font-bold text-gray-800 my-2">This course includes:</p>
        </div>
      </div>
      <div>
        <p>{`${routes?.length} lessons • ${summary?.videos} videos • ${summary?.doc} documents`}</p>
      </div>
      <div>
        <div className={`document ${(!open) ? '' : 'h-auto'}`}>
          {routes?.map((v, i) => (
            <div key={i}>
              <div className="mt-2 px-5 flex justify-between border border-solid cursor-pointer"
                onClick={() => {
                  if (!route.includes(i))
                    setRoute([...route, i]);
                  else setRoute(route.filter(v=>v!=i))
                }}>
                <div className="text-base font-semibold my-5">
                  <i className={`fa-solid fa-chevron-${(route.includes(i))?'up':'down'}`}></i>
                  <span className="ml-2">{v.title}</span>
                </div>
                <div className="my-5">
                  <p className="text-base">{`${v?.videos.length} videos - ${v?.documents.length} documents`}</p>
                </div>
              </div>
              <div className="border-x document" style={{height:(route.includes(i))?'120px':'0px'}}>
                {
                  v?.videos?.map((video, index) => (
                    <>
                    <div className={'inline-block align-middle w-full p-2'} key={index}>
                      <i className="fa-solid fa-video " style={{color: "#000000"}}></i> {" "}
                      <a className="text-blue-700 hover:underline-offset-1 hover:underline cursor-pointer">
                        {`${video.title}`}
                      </a>

                      </div>
                      <hr  />
                    </>
                  ))
                }
                {
                  v?.documents?.map((doc, index) => (
                    <>
                    <div className={'inline-block align-middle w-full p-2'} key={index}>
                      <i className="fa-solid fa-book" style={{color: "#000000"}}></i> {" "}
                      <a className="text-blue-700 hover:underline-offset-1 hover:underline cursor-pointer">
                        {`${doc.title}`}
                      </a>

                      </div>
                      <hr className={(index==v?.doc?.length-1)?'hidden':'' } />
                    </>
                  ))
                }
              </div>
            </div>))}
          
        </div>
        <div className="px-5 justify-between border border-solid">
          <div className="text-base text-center font-semibold my-5 cursor-pointer" onClick={() => setOpen(!open)}>
            <span className="ml-2">{open ? 'COLLAPSE' : 'EXTEND'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
