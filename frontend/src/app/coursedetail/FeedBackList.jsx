import React, { useState } from "react";
import FeedBackCard from "./FeedBackCard";

const FeedBackList = ({ feedbackData }) => {
  return (
    <div className="mt-4">
      <div>
        <p className="text-[24px] font-bold text-gray-800 my-2">Đánh giá:</p>
      </div>
      <div className="grid grid-cols-2">
        {feedbackData.map((feedback, index) => (
          <FeedBackCard key={index} feedback={feedback} />
        ))}
      </div>
      <div className="px-5 justify-between mx-2 border border-solid">
        <div className="text-base text-center font-semibold my-5">
          <span className="ml-2">Hiển thị tất cả đánh giá</span>
        </div>
      </div>
    </div>
  );
};

export default FeedBackList;
