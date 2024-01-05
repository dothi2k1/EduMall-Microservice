"use client";
import React, { useEffect, useState } from "react";
import FeedbackList from "./FeedBackList";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Banner from "./Banner";
import ContentText from "./ContentText";
import ThisCourseInclude from "./ThisCourseInclude";
import Description from "./Description";
import AddFeedBack from "./AddFeedBack";
import { useParams } from "next/navigation";
import { fetchFeedBack } from "@/service/userService";
import { getById } from "@/service/courseService";
import { getListRoute } from "@/service/routeService";
import Cart from "@/components/Cart/Cart";
import { string } from "random-js";

const CourseDetail = () => {
  const param = useParams();
  
  const Course_ID = parseInt(param.CourseDetail);
  const [feedbackData, setFeedbackData] = useState([]);
  const [url, setUrl] = useState(`get-by-course-detail-pageable/${Course_ID}?page=0&direction=1`);
  const [data, setData] = useState();
  const [route, setRoute] = useState([]);
  const changeUrlFeedBackList = () => {
    if (url === `get-by-course-detail/${Course_ID}`) {
      setUrl(`get-by-course-detail-pageable/${Course_ID}?page=0&direction=1`);
    } else {
      setUrl(`get-by-course-detail/${Course_ID}`);
    }
  };

  useEffect(() => {
    fetchFeedBack(url).then(res => setFeedbackData(res));
    getById(Course_ID).then(res => {
      let json = res.data.course.title;
      let title = JSON.parse(json);
      let data = res.data.course;
      setData({ ...data, title: title });
    });
    getListRoute(Course_ID).then(res => setRoute(res.data));
    
  }, [url]);

  setData
  return (
    <div>
      <NavBar />
      <Cart />
      <Banner course={data}/>
      <div className="w-full lg:px-20 px-10 py-10 flex flex-col  items-center lg:items-stretch">
        <div className="lg:max-w-[700px] w-full">
          <ContentText outcome={data?.description?.outcome}/>
          <ThisCourseInclude routes={route} summary={{video:data?.videos,doc:data?.doc}}/>
          <Description />
          <AddFeedBack />
          <FeedbackList feedbackData={feedbackData} onClickChangeUrlFeedBackList={changeUrlFeedBackList} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CourseDetail;
