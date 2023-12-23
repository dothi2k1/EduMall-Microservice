import React from "react";
export default function StarRating(rating) {
  const stars = [];

  for (let i = 0; i < rating; i++) {
    stars.push(<i key={i} className="fa-solid fa-star"></i>);
  }

  return <p>{stars}</p>;
}
