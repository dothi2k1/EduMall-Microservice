"use client";
import React, { useState } from "react";
import Title from "@/components/Title";
import TransitionEffect from "@/components/TransitionEffect";
import swal from "sweetalert";
import FeedbackForm from "@/components/HomePageComponents/FeedbackForm";

function Feedback() {
  return (
    <>
      <Title page={"Feedback"} Title={"Feedback Website"} />

      <div className="my-20">
        <FeedbackForm />
      </div>
    </>
  );
}

export default Feedback;
