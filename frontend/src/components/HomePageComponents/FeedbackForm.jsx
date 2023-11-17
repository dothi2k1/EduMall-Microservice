"use client";
import React, { useState } from "react";
import swal from "sweetalert";

function Star({ selected, onClick }) {
  return (
    <span className="text-3xl text-amber-500" onClick={onClick}>
      {selected ? "★" : "☆"}
    </span>
  );
}

function StarRating({ totalStars, selectedStars, onRate }) {
  return (
    <div>
      {[...Array(totalStars)].map((_, index) => (
        <Star key={index} selected={selectedStars > index} onClick={() => onRate(index + 1)} />
      ))}
    </div>
  );
}

function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: "",
    rating: 0,
    feedback_text: "",
    description: "",
  });

  const [errorMessages, setErrorMessages] = useState({
    name: "",
    rating: "",
    feedback_text: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRatingChange = (newRating) => {
    setFormData({
      ...formData,
      rating: newRating,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send the form data to the server using a POST request
      const response = await fetch(process.env.DOMAIN + "/contact/saveFeedBack", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        swal("Successfully", `Feedback submitted successfully`, "success");

        // Reset the form after submission
        setFormData({
          name: "",
          rating: 0,
          feedback_text: "",
          description: "",
        });
        setErrorMessages({
          name: "",
          rating: "",
          feedback_text: "",
        });
      } else {
        // Handle validation errors if status is not OK (e.g., validation error in the server)
        const responseData = await response.json();
        console.log(responseData.message);
        if (responseData.message) {
          setErrorMessages(responseData.message);
        } else {
          console.error("Error submitting feedback:", response.statusText);
        }
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="  bg-white py-16 px-5 rounded-md shadow-md  mx-auto ">
      <h3 className="font-semibold mb-6 text-xl">Feedback Website</h3>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Your Name"
        className="w-full p-2 mb-2 border rounded"
      />
      {errorMessages.name && <div className="text-red-500">{errorMessages.name}</div>}

      <div className="mb-2 cursor-pointer ">
        <label>Rating:</label>
        <StarRating totalStars={5} selectedStars={formData.rating} onRate={handleRatingChange} />
      </div>

      <textarea
        name="feedback_text"
        value={formData.feedback_text}
        onChange={handleInputChange}
        placeholder="Your Feedback"
        className="w-full p-2 mb-2 border rounded"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="Additional Description"
        className="w-full p-2 mb-2 border rounded"
      />

      <button type="submit" className="bg-emerald-500 text-center text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
}

export default FeedbackForm;
