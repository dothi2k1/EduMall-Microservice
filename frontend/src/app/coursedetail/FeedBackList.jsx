import React from "react";
import FeedBackCard from "./FeedBackCard";

const FeedBackList = ({ feedbackData }) => {
  return (
    <div className="grid grid-cols-2">
      {feedbackData.map((feedback, index) => (
        <FeedBackCard key={index} feedback={feedback} />
      ))}
    </div>
  );
};

export default FeedBackList;
