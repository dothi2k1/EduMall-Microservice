import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

function StarRating() {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  return (
    <div className="flex">
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i}>
            <input
              className="hidden"
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => {
                setRating(ratingValue);
              }}
            />
            <FaStar
              className="cursor-pointer"
              style={{ color: ratingValue <= (hover || rating) ? "#ffc107" : "#c9cbcf" }}
              size={24}
              onMouseEnter={() => {
                setHover(ratingValue);
              }}
              onMouseLeave={() => {
                setHover(null);
              }}
            />
          </label>
        );
      })}
    </div>
  );
}

export default StarRating;
