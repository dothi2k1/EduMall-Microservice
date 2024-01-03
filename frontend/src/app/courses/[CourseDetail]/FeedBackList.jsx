import React, { useState } from "react";
import FeedBackCard from "./FeedBackCard";

const FeedBackList = ({ feedbackData, onClickChangeUrlFeedBackList }) => {
  
  const onClickShowMore = () => {

   }
   
  return (
    <div className="mt-4">
      <div>
        <p className="text-[24px] font-bold text-gray-800 my-2">Feedback:</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {feedbackData?.map((feedback, index) => (
          <FeedBackCard key={index} feedback={feedback} />
        ))}
      </div>
      <div onClick={onClickChangeUrlFeedBackList} className="px-5 justify-between border border-solid ">
        <div onClick={onClickShowMore} className="text-base text-center font-semibold my-5">
          <span className="ml-2">MORE</span>
        </div>
      </div>
    </div>
  );
};

export default FeedBackList;
