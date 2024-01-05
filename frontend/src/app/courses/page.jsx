"use client";
import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";
import Pagination from "./Pagination";
import { getAll } from "@/service/courseService";
export default function Products() {
  
  const [priceChange, setPriceChange] = useState(149000);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("all");
 
  


  const handleSortByChange = (sortOption) => {
    setSortBy(sortOption);
  };

  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  let priceArray = [];


  const totalPages = 0;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
        <div className="pb-20 pt-16 lg:pb-10 lg:pt-20 min-h-full">
          <div className="flex flex-col space-y-14 lg:flex-row  lg:space-y-0">
            <div className="border-r-[1px] shadow-[rgba(0,0,0,0.3)_1px_0px_0px_0px] px-3">
              <h5 className="text-heading-5 text-secondary-50 text-gray-600 text-xl font-semibold">Filter</h5>
              <div
                className="mt-6 flex lg:w-[200px] flex-row space-x-4 overflow-y-auto pb-5 lg:flex-col lg:space-x-0 lg:space-y-4 lg:pb-0"
                role="tablist"
                aria-orientation="horizontal"
            >
              <div className="flex flex-col">
                <label htmlFor="" className="font-bold">Type</label>
                <select name="" id="" className="bg-none">
                  <option value="">e-learning</option>
                  <option value="">Distance learning</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-bold">Categories</label>
                <select name="" id="">
                  <option value="">Python</option>
                  <option value="">Java</option>
                </select>
              </div>
              </div>
              
              
            </div>
            <div className="lg:grow p-5">
              <div>
                <div
                  id="headlessui-tabs-panel-:rl:"
                  role="tabpanel"
                  aria-labelledby="headlessui-tabs-tab-:re:"
                  tabIndex={0}
                  data-headlessui-state="selected"
                >
                  <div className="flex justify-between">
                    <h3 className="text-heading-4 lg:text-heading-3 text-secondary-100 text-xl font-semibold text-gray-600">
                      All Item
                    </h3>

                    <select
                      className="text-caption-2 text-primary-100 text-sm font-semibold text-emerald-500 p-2" 
                      value={sortBy}
                      onChange={(e) => handleSortByChange(e.target.value)}
                    >
                      <option value="all">Sort by:</option>
                      <option value="ascending">Price: Low to High</option>
                      <option value="descending">Price: High to Low</option>
                    </select>
                  </div>
                  <ProductList loading={loading} setLoad={setLoading} />
                  <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
                </div>
              </div>
            </div>
          </div>
          
        </div>
    </>
  );
}