import React, { useEffect, useState } from "react";

function ScrollButton() {
  const [showButton, setShowButton] = useState(false);
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const scrollThreshold = 200;
    if (scrollPosition > scrollThreshold) {
      setShowButton(true);
    } else {
      setShowButton(false);
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
  });
  return (
    <div>
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
    </div>
  );
}

export default ScrollButton;
