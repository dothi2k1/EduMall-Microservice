"use client";
import React, { useEffect, useState } from "react";
import FeedbackList from "./FeedBackList";
import axios from "axios";
import NavBar from "@/components/NavBar";
import footer from "@/components/Footer";
import Banner from "./Banner";
import ContentText from "./ContentText";
import ThisCourseInclude from "./ThisCourseInclude";

const FeedBackPage = () => {
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    const fetchFeedBack = async () => {
      try {
        const response = await axios.get("http://localhost:9000/api/sv1/feedback/get-all");
        const data = response.data;
        console.log(data);
        setFeedbackData(data);
        console.log(feedbackData);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchFeedBack();
  }, []);

  return (
    <div>
      <NavBar />
      <Banner />
      <div className="max-w-[700px] ml-[214px]">
        <div className="columns-1">
          <ContentText />
          <ThisCourseInclude />
          <FeedbackList feedbackData={feedbackData} />
        </div>
      </div>
      <footer />
    </div>
  );
};

export default FeedBackPage;
