import React from "react";

const StarRating = ({ rating }) => {
  const stars = [];

  for (let i = 0; i < rating; i++) {
    stars.push(<i key={i} className="fa-solid fa-star"></i>);
  }

  return <div>{stars}</div>;
};

const FeedBackCard = ({ feedback }) => {
  return (
    <div className="mb-4 px-2 py-2 border border-solid text-justify rounded-md shadow-md">
      <div className="flex justify-between">
        <div className="flex">
          <img
            src="https://m.media-amazon.com/images/I/51n+XXngeUL._AC_UF1000,1000_QL80_.jpg"
            alt="name"
            className="w-[40px] h-[40px] rounded-full"
          />
          <div className="ml-2">
            <p className="font-semibold">User</p>
            <p className="text-[8px]">
              <StarRating rating={feedback.star} />
            </p>
          </div>
        </div>
        <div className="text-[12px]">{feedback.createat}</div>
      </div>
      <div className="">
        <p className="mt-2 text-500">{feedback.content}</p>
        <button className="mt-4 text-blue-500">Show More</button>
      </div>
    </div>
  );
};

export default FeedBackCard;
