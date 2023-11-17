import React, { useState, useEffect, useRef } from "react";

function Lightbox({ gallery, onCloseRequest }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartY, setDragStartY] = useState(0);
  const lightboxRef = useRef(null);

  const closeLightbox = () => {
    setIsOpen(false);
    onCloseRequest();
  };

  const handleClickOutside = (event) => {
    if (lightboxRef.current && !lightboxRef.current.contains(event.target)) {
      closeLightbox();
    }
  };

  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => prevZoom + 0.5);
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.5, 0.1));
  };

  const handleMouseDown = (event) => {
    setDragging(true);
    setDragStartX(event.clientX);
    setDragStartY(event.clientY);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseMove = (event) => {
    if (dragging) {
      setPositionX((prevPositionX) => prevPositionX + event.clientX - dragStartX);
      setPositionY((prevPositionY) => prevPositionY + event.clientY - dragStartY);
      setDragStartX(event.clientX);
      setDragStartY(event.clientY);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="fixed -bottom-6 inset-0 z-10 flex items-center justify-center">
      <div ref={lightboxRef} className="fixed inset-0 bg-black opacity-50" onClick={closeLightbox}></div>
      <div className="relative">
        <div className=" grid grid-cols-1 lg:grid-cols-2  gap-4  bg-white p-2 opacity-100 z-10 rounded  mx-2 ">
          <div className="relative text-5xl">
            <div
              className={`flex justify-center ${isZoomed ? (dragging ? "grabbing" : "grab") : ""}`}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
              <div className="">
                <img
                  className="hover:cursor-grab rounded max-h-[60vh] object-scale-down"
                  src={gallery.image_url}
                  alt="lightbox"
                  draggable={false}
                  style={{
                    transform: `scale(${zoomLevel}) translate(${positionX}px, ${positionY}px)`,
                    transition: "transform 0.2s ease",
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                  }}
                />
              </div>
            </div>
            <div
              className={`absolute z-10 top-2 right-2 text-2xl fill-white hidden lg:block ${
                dragging && "fill-gray-800"
              }`}
            >
              <button onClick={handleZoomIn}>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                  <path
                    d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0
               45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 
               208S93.1 0 208 0S416 93.1 416 208zM184 296c0 13.3 10.7 24 24 24s24-10.7 24-24V232h64c13.3 0
                24-10.7 24-24s-10.7-24-24-24H232V120c0-13.3-10.7-24-24-24s-24 10.7-24 24v64H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h64v64z"
                  />
                </svg>
              </button>
              <button className="ml-2" onClick={handleZoomOut}>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                  <path
                    d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0
           208S93.1 0 208 0S416 93.1 416 208zM136 184c-13.3 0-24 10.7-24 24s10.7 24 24 24H280c13.3 0 24-10.7 24-24s-10.7-24-24-24H136z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <h3 className="whitespace-normal lg:mr-9">
            {gallery.title ||
              "Handicraft (còn được gọi tên như Artisanry hoặc Handmade): dịch là Thủ công mỹ nghệ, chỉ các loại hình sản phẩm được làm hoàn toàn bằng tay dưới sự hỗ trợ của công cụ đơn giản. Nói cách khác, sản phẩm Thủ công mỹ nghệ – Handicraft là kết quả từ bàn tay của nghệ nhân thủ công. Chúng phô bày vẻ đẹp của sự khéo léo cùng kĩ thuật truyền thống; chúng không được tạo ra từ quá trình sản xuất máy móc hàng loạt."}
          </h3>
        </div>

        <button className="absolute top-2 right-5 text-3xl fill-slate-500" onClick={closeLightbox}>
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
            <path
              d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5
         12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Lightbox;
