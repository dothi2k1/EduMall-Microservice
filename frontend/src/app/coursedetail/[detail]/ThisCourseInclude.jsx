export default function ThisCourseInclude(params) {

  return (
    <div>
      <div className=" my-5">
        <div>
          <p className="text-[24px] font-bold text-gray-800 my-2">This course includes:</p>
        </div>
      </div>
      <div>
        <p>{`${params.routes} lessons • ${params.videos} videos • ${params.doc} documents`}</p>
      </div>
      <div>
        <div className="px-5 flex justify-between mx-2 border border-solid">
          <div className="text-base font-semibold my-5">
            <i class="fa-solid fa-chevron-down"></i>
            <span className="ml-2">Course Overview</span>
          </div>
          <div className="my-5">
            <p className="text-base">5 bài giảng - 19 phút</p>
          </div>
        </div>
        
        <div className="px-5 justify-between mx-2 border border-solid">
          <div className="text-base text-center font-semibold my-5">
            <span className="ml-2">13 phần nữa</span>
          </div>
        </div>
      </div>
    </div>
  );
}
