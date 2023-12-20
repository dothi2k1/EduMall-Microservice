import React from "react";

const FeedBackCard = ({ feedback }) => {
  return (
    <div className="mb-[50px] mx-4 text-justify border-b-gray-950">
      <div>
        <div className="flex">
          <img
            src="https://m.media-amazon.com/images/I/51n+XXngeUL._AC_UF1000,1000_QL80_.jpg"
            alt="name"
            className="w-[40px] h-[40px] rounded-full"
          />
          <div className="ml-2">
            <p className="">User</p>
            <p>*****</p>
          </div>
        </div>
      </div>
      <div className="">
        <p className="mt-2 text-500">{feedback.content}</p>
        <button className="mt-4 text-blue-500">Show More</button>
      </div>
    </div>
  );
};

export default FeedBackCard;
