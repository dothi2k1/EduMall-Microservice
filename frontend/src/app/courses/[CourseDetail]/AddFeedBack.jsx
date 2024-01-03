// components/FeedBack.js

import { useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import axiosInstance from "@/utils/axios";

const AddFeedBack = () => {
  // State để lưu trữ dữ liệu của feedback
  const [content, setContent] = useState("");
  //   const [rating, setRating] = useState(0);
  const [odId] = useState(1);
  const [createAt] = useState(new Date());
  const [updateAt, setUpdateAt] = useState(null);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  // Hàm xử lý khi người dùng thay đổi nội dung
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  // Hàm xử lý khi người dùng thay đổi đánh giá
  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value, 10));
  };

  // Hàm xử lý khi người dùng gửi feedback
  const handleSubmit = async () => {
    try {
      // Tạo đối tượng dữ liệu để gửi lên server
      const feedbackData = {
        content,
        star: rating,
        createat: createAt.toISOString(),
        updateat: updateAt ? updateAt.toISOString() : null,
        od_id: odId,
      };

      // Gửi yêu cầu POST đến API
      const response = await axiosInstance.put("/api/sv1/feedback/add", feedbackData);

      // Kiểm tra kết quả từ server
      if (response.status === 200) {
        console.log("Feedback submitted successfully:", response.data);
        alert("Success !!");
        // Thực hiện các tác vụ cần thiết sau khi gửi feedback thành công
      } else {
        console.error("Failed to submit feedback. Server response:", response);
        alert("Fail from Server :((");
        // Xử lý trường hợp gửi feedback thất bại
      }
    } catch (error) {
      console.error("An error occurred while submitting feedback:", error);
      alert("Error from while submit :((");
      // Xử lý trường hợp lỗi
    }
  };
  return (
    <div>
      <div>
        <p className="text-[24px] font-bold text-gray-800 my-2">Nhập đánh giá của bạn:</p>
      </div>
      <div className="max-w-full mx-auto p-4 border rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Form Feedback:</h2>

        {/* Khung nhập nội dung */}
        <textarea
          className="w-full h-32 p-2 border rounded-md mb-2"
          placeholder="Enter your feedback here..."
          value={content}
          onChange={handleContentChange}
        ></textarea>

        {/* Chỗ để đánh giá sao */}
        {/* <div className="flex items-center mb-4">
          <span className="mr-2">Rating star:</span>
          <select className="p-2 border rounded-md" value={rating} onChange={handleRatingChange}>
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div> */}

        {/* Chỗ để đánh giá sao */}
        <div className="flex">
          <h2 className="text-xl my-auto font-semibold mb-2">Rating Star:</h2>
          <div className="flex ml-2 my-auto">
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
                    className="cursor-pointer mb-2"
                    style={{ color: ratingValue <= (hover || rating) ? "#ccad00" : "#c9cbcf" }}
                    size={18}
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
        </div>

        {/* Button gửi feedback */}
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" onClick={handleSubmit}>
          Submit Feedback
        </button>
      </div>
    </div>
  );
};

export default AddFeedBack;
