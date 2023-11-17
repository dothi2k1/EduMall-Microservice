import React from "react";
import { motion } from "framer-motion";

function ContentCard({ contentInfor }) {
  return (
    <div className={`lg: ${contentInfor.mt_top} container lg:w-11/12 mx-auto`}>
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-10">
        <h4 className="text-caption-2 lg:text-caption-1 text-emerald-700 text-4xl font-bold">{contentInfor.number}</h4>
      </div>
      <h5 className="text-heading-5 mt-6 text-caption-2 lg:text-caption-1 text-emerald-500 text-2xl mb-7 font-bold">
        {contentInfor.title}
      </h5>
      <p className="text-body-2-regular mt-4 font-sans text-gray-700 text-justify">{contentInfor.content}</p>
    </div>
  );
}

function ListContent() {
  const contentInfors = [
    {
      id: 1,
      mt_top: "mt-0",
      number: "01",
      title: "An entrepreneurial spirit",
      content:
        "For six generations, Udemy has been an innovative, independent, family-owned, family-owned, up-to-date with new and responsible crop care practices, with an entrepreneurial spirit that has become its business model business of the company.",
    },
    {
      id: 2,
      mt_top: "mt-14",
      number: "02",
      title: "Creative freedom",
      content:
        "We are committed to offering only the finest floral arrangements and gifts, backed by service that is friendly and prompt. Because all of our customers are important, our professional and knowledgable staff is dedicated to making your experience a pleasant one.",
    },
    {
      id: 3,
      mt_top: "mt-20",
      number: "03",
      title: "Plant lover's destination",
      content:
        "Orientation for the development of the company: Udemy always takes the Trust as the first, takes the heart of a plant lover to serve customers, tries to think in pursuit of new things and catch up with modern trends.",
    },
  ];

  return (
    <div className="pb-10 pt-3 lg:pb-10 lg:pt-6 px-5 container lg:w-11/12 mx-auto">
      <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-3 lg:gap-x-14 lg:gap-y-0">
        {contentInfors.map((contentInfor) => {
          return <ContentCard key={contentInfor.id} contentInfor={contentInfor} />;
        })}
      </div>
    </div>
  );
}

export default ListContent;
