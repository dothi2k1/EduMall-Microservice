"use client";
import React, { useState, useEffect } from "react";
import Title from "@/components/Title";
import ProductList from "./ProductList";
import Categories from "./Categories";
import Pagination from "./Pagination";
import Cart from "@/context/Products/Cart";
import FlashSale from "./FlashSale";

export default function Products() {
  const [items, setItems] = useState([]);
  const [priceChange, setPriceChange] = useState(149000);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("all");
  const [sortedProducts, setSortedProducts] = useState(null);
  const endTime = "2023-08-30T23:59:59";

  const handleChangePrice = (e) => {
    setPriceChange(e.target.value);
  };

  const handleCategoryChange = (categoryId) => {
    setCategory(categoryId);
    setCurrentPage(1);
  };

  const handleSortByChange = (sortOption) => {
    setSortBy(sortOption);
  };

  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  let priceArray = [];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.DOMAIN}/products`);
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  items.forEach((item) => priceArray.push(parseInt(item.price)));
  let minPrice = Math.min(...priceArray);
  let maxPrice = Math.max(...priceArray);

  useEffect(() => {
    const filterProductsByPrice = items.filter((item) => parseInt(item.price) <= parseInt(priceChange));
    const filteredProducts =
      category === null ? filterProductsByPrice : filterProductsByPrice.filter((item) => item.category_id === category);
    let sortedProducts;
    switch (sortBy) {
      case "ascending":
        sortedProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
        break;
      case "descending":
        sortedProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
        break;
      default:
        sortedProducts = [...filteredProducts];
    }

    setSortedProducts(sortedProducts);
  }, [category, items, sortBy, priceChange]);

  const filterProductsByPrice = items.filter((item) => parseInt(item.price) <= parseInt(priceChange));
  const filteredProducts =
    category === null ? filterProductsByPrice : filterProductsByPrice.filter((item) => item.category_id === category);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const products = sortedProducts?.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="container mx-auto px-5 pt-[55px] lg:pt-[75px]" >
        <div className="pb-20 pt-16 lg:pb-36 lg:pt-20 ">
          <div className="flex flex-col space-y-14 lg:flex-row lg:space-x-20 lg:space-y-0">
            <div>
              <h5 className="text-heading-5 text-secondary-50 text-gray-600 text-xl font-semibold">Categories</h5>
              <div
                className="mt-6 flex w-[calc(100vw-32px)] flex-row space-x-4 overflow-y-auto pb-5 lg:w-full lg:flex-col lg:space-x-0 lg:space-y-4 lg:pb-0"
                role="tablist"
                aria-orientation="horizontal"
              >
                <Categories handleCategoryChange={handleCategoryChange} category={category} />
              </div>
              <div className="mt-5">
                <span className="text-heading-5 text-secondary-50 text-gray-600 text-xl font-semibold">
                  Filter by Price:{" "}
                </span>
                <span className="font-semibold">
                  {Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(priceChange)}
                </span>
                <input
                  className="w-[90%]"
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  defaultValue={maxPrice}
                  onChange={handleChangePrice}
                />
              </div>
              <div className="mt-20 hidden lg:block">
                <div className="rounded-[32px] bg-primary-100 bg-emerald-500  text-white bg-cover bg-no-repeat py-14 pl-8 pr-11">
                  <h5 className="text-heading-5 ">Limited Time Offer</h5>
                  <h1 className="mt-1.5 w-[216px] font-fredoka-one text-[54px] leading-tight tracking-tight font-semibold ">
                    Get 50% Off!
                  </h1>
                  <p className="text-body-2-All Item mt-3 w-[216px] ">
                    Enjoy a 50% discount on all our premium features
                  </p>
                  <button className="btn-yellow-solid mt-4 font-semibold">Get it now</button>
                </div>
              </div>
            </div>
            <div className="lg:grow">
              <div>
                <div
                  id="headlessui-tabs-panel-:rl:"
                  role="tabpanel"
                  aria-labelledby="headlessui-tabs-tab-:re:"
                  tabIndex={0}
                  data-headlessui-state="selected"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-heading-4 lg:text-heading-3 text-secondary-100 text-3xl font-semibold text-gray-600">
                      All Item
                    </h3>

                    <select
                      className="text-caption-2 text-primary-100 text-xl font-semibold text-emerald-500"
                      value={sortBy}
                      onChange={(e) => handleSortByChange(e.target.value)}
                    >
                      <option value="all">Price: All price</option>
                      <option value="ascending">Price: Low to High</option>
                      <option value="descending">Price: High to Low</option>
                    </select>
                  </div>
                  <Cart />
                  <FlashSale products={items} endTime={endTime} />

                  <ProductList products={products} loading={loading} />
                  <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20 block bg-emerald-300 lg:hidden">
            <div className="rounded-[32px] bg-primary-100  py-14 pl-8 pr-11">
              <h5 className="text-heading-5 text-black">Limited Time Offer</h5>
              <h1 className="mt-1.5 w-[216px] font-fredoka-one text-[54px] leading-tight tracking-tight text-black">
                Get 50% Off!
              </h1>
              <p className="text-body-2-regular mt-3 w-[216px] text-black">
                enjoy a 50% discount on all our premium features
              </p>
              <button className="btn-yellow-solid mt-4">Get it now</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
