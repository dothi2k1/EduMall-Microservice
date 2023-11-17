"use client";
import React from "react";
import Title from "@/components/Title";
import TransitionEffect from "@/components/TransitionEffect";
import OurBlog from "./OurBlog";
function Blog() {


  return (
    <div>
      <Title page={"Blog"} Title={"Our Blog"} />
      <TransitionEffect />
      <OurBlog />
    </div>
  );
}

export default Blog;
