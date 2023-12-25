"use client";
import React, { useEffect, useState } from "react";
import FeedbackList from "./FeedBackList";
import axios from "axios";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Banner from "./Banner";
import ContentText from "./ContentText";
import ThisCourseInclude from "./ThisCourseInclude";
import Description from "./Description";
import AddFeedBack from "./AddFeedBack";
import LightBoxEditFeedBack from "./LightBoxEditFeedBack";

const CourseDetail = ({ params }) => {
  const Course_ID = parseInt(params.CourseDetail);
  const [feedbackData, setFeedbackData] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [feedBackId, setFeedBackId] = useState();
  const [url, setUrl] = useState(`get-by-course-detail-pageable/${Course_ID}?page=0&direction=1`);

  const handleFeedBackListClick = (feedBackId) => {
    // Xử lý khi feedback được chọn từ FeedBackList
    console.log("FeedBackId selected in Page:", feedBackId);
  };

  const openLightbox = () => {
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const changeUrlFeedBackList = () => {
    if (url === `get-by-course-detail/${Course_ID}`) {
      setUrl(`get-by-course-detail-pageable/${Course_ID}?page=0&direction=1`);
    } else {
      setUrl(`get-by-course-detail/${Course_ID}`);
    }
  };

  useEffect(() => {
    const fetchFeedBack = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/api/sv1/feedback/${url}`);
        const data = response.data;
        setFeedbackData(data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };
    fetchFeedBack();
  }, [url]);

  return (
    <div>
      <NavBar />
      <Banner />
      <div className="max-w-[700px] ml-[214px]">
        <div className="columns-1">
          <ContentText />
          <ThisCourseInclude />
          <Description />
          <AddFeedBack feedBackId={feedBackId ? feedBackId : null} />
          <FeedbackList
            feedbackData={feedbackData}
            onClickChangeUrlFeedBackList={changeUrlFeedBackList}
            openLightbox={openLightbox}
            onFeedBackListClick={handleFeedBackListClick}
          />
        </div>
        <div></div>
        {/* Hiển thị LightBoxEditFeedBack chỉ khi lightboxOpen là true */}
        {lightboxOpen && <LightBoxEditFeedBack onClose={closeLightbox} />}
      </div>
      <Footer />
    </div>
  );
};

export default CourseDetail;
