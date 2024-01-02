import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaCheck } from "react-icons/fa";

export default function ContentText({outcome}) {
  return (
    <div className=" my-5">
      <div>
        <p className="text-[24px] font-bold text-gray-800 my-2">Outcome:</p>
      </div>
      <div className="grid grid-cols-2">
        {outcome?.map((v,i)=>(
        <div className="flex justify-center my-1" key={i}>
          <i class="fa-solid fa-check mt-1 mx-1"></i>
          <p className="ml-1">{v}</p>
        </div>
        )) }
      </div>
      
    </div>
  );
}
