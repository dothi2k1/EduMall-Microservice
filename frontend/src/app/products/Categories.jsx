import React from "react";
import { useState, useEffect } from "react";

const Button = ({ isActive, category_id, image, title, quantity, handleCategoryChange }) => (
  <button
    onClick={() => handleCategoryChange(category_id)}
    className={`${
      isActive ? "bg-emerald-200" : ""
    } false group flex w-52 shrink-0 space-x-4 rounded-2xl border border-secondary-10 px-3 py-3.5 text-left transition duration-300 hover:bg-emerald-200 lg:w-72`}
    id={`headlessui-tabs-tab-${category_id}`}
    role="tab"
    aria-selected="false"
    tabIndex={-1}
    data-headlessui-state=""
    type="button"
  >
    <img
      alt="Handicraft"
      decoding="async"
      loading="lazy"
      data-nimg={1}
      src={image}
      className="rounded aspect-square max-w-[50px] object-cover filter brightness-110 saturate-100"
    />

    <div>
      <h5 className="text-base text-heading-5 leading-none group-hover:text-black font-semibold">{title}</h5>
      <div className="text-primary-100 text-caption-2 group-hover:text-black mt-2">{quantity} Items</div>
    </div>
  </button>
);

const Categories = ({ handleCategoryChange, category }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(process.env.DOMAIN + "/products/categories")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <button
        onClick={() => handleCategoryChange(null)}
        className={`bg-primary-100 outline-0 group flex w-52 shrink-0 space-x-4 rounded-2xl border border-secondary-10 px-3 py-3.5 text-left transition duration-300 hover:bg-emerald-300 lg:w-72`}
        id="headlessui-tabs-tab-:re:"
        role="tab"
        aria-selected="true"
        tabIndex={0}
        data-headlessui-state="selected"
        type="button"
        aria-controls="headlessui-tabs-panel-:rl:"
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth={0}
          viewBox="0 0 16 16"
          className="text-emerald-500 ml-2 group-hover:text-white"
          height="48px"
          width="48px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z" />
        </svg>
        <div>
          <h5 className="text-black text-heading-5 leading-none group-hover:text-black font-semibold">All</h5>
          <div className="text-black text-caption-2 group-hover:text-black mt-2">32 Items</div>
        </div>
      </button>
      {data.map((item, index) => (
        <Button
          key={index}
          {...item}
          isActive={item.category_id === category}
          handleCategoryChange={handleCategoryChange}
        />
      ))}
    </>
  );
};

export default Categories;
