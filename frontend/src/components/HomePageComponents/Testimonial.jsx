import React, { useRef, useState, useEffect } from "react";
import Star from "./Star";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/scrollbar";
import "swiper/css/pagination";
import FeedbackForm from "./FeedbackForm";
import "animate.css";

function CardTestimonial({ user }) {
  return (
    <div className="bg-white  backdrop-blur-sm  bg-opacity-60 text-slate-600 text-center mx-auto w-4xl rounded-2xl py-4 px-5 mb-14 max-w-5xl ">
      <img
        className="object-cover rounded-full mx-auto mb-4 w-12 h-12"
        src={user.src || "https://i.pinimg.com/564x/7e/05/70/7e0570da0f3fcef0832ea3bc82eb41b1.jpg"}
      />
      <p className=" font-bold mb-2 text-2xl">{user.name}</p>
      <div className="flex justify-center mb-2 ">
        {Array.from({ length: user.rating }).map((_, index) => (
          <Star key={index} />
        ))}
      </div>
      <p className="mb-4 font-bold ">{user.say}</p>
      <p className="text-center max-w-4xl mb-4 mt-4 mx-auto font-sans text-slate-900  ">{user.description}</p>
    </div>
  );
}

function Testimonial() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [feedbackList, setFeedbackList] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch(process.env.DOMAIN + "/contact/feedBack");
        if (response.ok) {
          const data = await response.json();
          setFeedbackList(data);
        } else {
          console.error("Error fetching feedback:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchFeedback();
  }, [showFeedback]);

  return (
    <div className=" bg-[url('/rating.jpg')] bg-cover px-5 py-10 ">
      <p className="text-center text-white text-2xl mb-5 font-bold">Testimonial</p>
      <p className="text-center mb-7 text-3xl font-bold text-emerald-300">What People Say</p>

      <Swiper
        spaceBetween={100}
        slidesPerView={1}
        loop={true}
        // navigation={true}
        // scrollbar={{ draggable: true }}
        pagination={{ clickable: true }}
        // a11y={true}
        // freeMode
        modules={[FreeMode, Navigation, Thumbs, Pagination, Scrollbar, A11y]}
        thumbs={{ swiper: thumbsSwiper }}
      >
        {feedbackList.map((user) => {
          return (
            <SwiperSlide key={user.id}>
              <CardTestimonial user={user} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <button
        onMouseOver={() => setShowFeedback(true)}
        className=" mx-auto flex border border-emerald-500 hover:bg-emerald-500 px-2 py-3 rounded text-white text-base  font-bold"
      >
        Rating Now
      </button>

      {showFeedback && (
        <div className="animate__animated animate__fadeIn fixed top-0 z-10 left-0 right-0 bottom-0 bg-black bg-opacity-50 ">
          <div className="lg:mt-36 mt-20 relative max-w-lg mx-auto px-5">
            <button
              onClick={() => setShowFeedback(false)}
              class="text-3xl absolute top-3 right-8 fill-slate-800 hover:fill-emerald-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5   12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path>
              </svg>
            </button>
            <FeedbackForm />
          </div>
        </div>
      )}
    </div>
  );
}

export default Testimonial;
