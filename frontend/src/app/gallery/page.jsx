"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Masonry from "react-masonry-css";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Lightbox from "./Lightbox";
// import "animate.css";

const breakpointColumnsObj = {
  default: 6,
  1100: 3,
  700: 2,
};

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [alert, setAlert] = useState("");
  const router = useRouter();

  const handleImageClick = (index) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get(`${process.env.DOMAIN}/gallery?page=${page}`);
        const data = response.data;
        setGallery((prevGallery) => [...prevGallery, ...data]);
        setHasMore(data.length > 0);
      } catch (error) {
        console.log("Error fetching gallery:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGallery();
  }, [page]);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const scrollThreshold = 200;
    if (scrollPosition > document.documentElement.offsetHeight - window.innerHeight - scrollThreshold && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }

    if (scrollPosition > scrollThreshold) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const handleNextImage = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleGoToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore]);

  return (
    <div className="container mx-auto px-5 mt-8">
      {isOpen && (
        <Lightbox
          mainSrc={gallery[photoIndex].image_url}
          gallery={gallery[photoIndex]}
          onCloseRequest={() => setIsOpen(false)}
        />
      )}

      {isLoading ? (
        <p>Đang tải đợi xíu nhé...</p>
      ) : (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex ml-[-30px] w-auto"
          columnClassName="bg-clip-padding pl-[30px]"
        >
          {gallery.map((gallery, index) => (
            <div key={gallery.id} className="mb-[30px] cursor-pointer group">
              <div className="relative">
                <LazyLoadImage
                  className="rounded-lg"
                  src={gallery.image_url}
                  alt={gallery.title}
                  effect="blur"
                  offset={100}
                  placeholderSrc="/gallery.jpg"
                />
                <div
                  onClick={() => handleImageClick(index)}
                  className="absolute inset-0 bg-black opacity-50 rounded-lg hidden group-hover:block bottom-1"
                >
                  <p className="text-white p-2 text-sm">{gallery.title || "Handicaft Tille"}</p>
                </div>
                <button className="opacity-50 group-hover:opacity-100 group absolute top-2 right-3 bg-slate-100 hover:bg-white w-6 h-6 rounded-full">
                  <svg className="mx-auto " xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 128 512">
                    <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                  </svg>
                </button>
                <button
                  className={`opacity-20 group-hover:opacity-80 group rounded-full  text-white  border  border-white hover:border-gray-500 px-2 py-2 transition duration-300 
                    group-hover:bg-emerald-300 absolute bottom-5 left-2 group-hover:animate-pulse`}
                >
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`  
                 transition duration-300 hover:text-gray-500 `}
                    height="20px"
                    width="20px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </Masonry>
      )}
      {hasMore || <span>Hết ảnh</span>}
      {showButton && (
        <button onClick={handleGoToTop} className="fixed bottom-5 right-5 animate__animated animate__fadeIn">
          <svg
            className="fill-emerald-300 text-5xl"
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
          >
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM385 231c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-71-71V376c0 13.3-10.7 24-24 24s-24-10.7-24-24V193.9l-71 71c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L239 119c9.4-9.4 24.6-9.4 33.9 0L385 231z" />
          </svg>
        </button>
      )}
      <button
        onClick={handleNextImage}
        className="flex items-center gap-2 px-3 py-2 rounded bg-emerald-300 hover:bg-emerald-500 font-semibold mx-auto mb-5 text-2xl  "
      >
        <p className="text-white">Next Image</p>
        <svg className="fill-white text-3xl  " xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
          <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z" />
        </svg>
      </button>
    </div>
  );
};

export default Gallery;
