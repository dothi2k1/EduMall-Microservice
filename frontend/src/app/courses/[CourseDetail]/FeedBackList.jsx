import React, { useState } from "react";
import FeedBackCard from "./FeedBackCard";

const FeedBackList = ({ feedbackData, onClickChangeUrlFeedBackList, openLightbox, onFeedBackListClick }) => {
  const [showAll, setShowAll] = useState("Hiển thị tất cả đánh giá");
  const handleFeedBackClick = (feedBackId) => {
    // Gọi callback function để truyền feedBackId lên component cha (Page)
    onFeedBackListClick(feedBackId);
  };
  const onClickShowAll = () => {
    if (showAll === "Thu gọn") {
      setShowAll("Hiển thị tất cả đánh giá");
    } else {
      setShowAll("Thu gọn");
    }
  };
  return (
    <div className="mt-4">
      <div>
        <p className="text-[24px] font-bold text-gray-800 my-2">Các đánh giá của người dùng:</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {feedbackData.map((feedback) => (
          <FeedBackCard
            key={feedback.id}
            feedback={feedback}
            openLightbox={openLightbox}
            onFeedBackClick={handleFeedBackClick}
          />
        ))}
      </div>
      <div onClick={onClickChangeUrlFeedBackList} className="px-5 justify-between border border-solid ">
        <div onClick={onClickShowAll} className="text-base text-center font-semibold my-5">
          <span className="ml-2">{showAll}</span>
        </div>
      </div>
    </div>
  );
};

export default FeedBackList;
