"use client";
import React from "react";
import { useState, useEffect } from "react";
import Title from "@/components/Title";
import NavBarReponsive from "../../components/NavBar";
import AboutUs from "./AboutUs";
import ListContent from "./ListContent";
import OneMeal from "./OneMeal";
import OurChefs from "./OurChefs";
import Testimonial from "@/components/HomePageComponents/Testimonial";
import Footer from "../../components/Footer";
import TransitionEffect from "@/components/TransitionEffect";
import ImgLeft from "./ImgLeft";
import ImgLeft_2 from "./ImgLeft_2";
import ScrollButton from "@/components/HomePageComponents/ScrollButton";
export default function About() {
  return (
    <>
      <NavBarReponsive />
      <TransitionEffect />
      <Title page={"About"} Title={"About"} />
      <AboutUs />
      <ListContent />
      <ImgLeft />
      <OneMeal />
      <ImgLeft_2 />
      <OurChefs />
      {/* <Testimonial /> */}
      <Footer />
      <ScrollButton />
    </>
  );
}
