import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlassMinus } from "@fortawesome/free-solid-svg-icons";
function Lightbox({ images, index, onCloseRequest, product, imgProduct_click }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartY, setDragStartY] = useState(0);
  const lightboxRef = useRef(null);
  const [hoverImgIndex, setHoverImgIndex] = useState(0);
  const [imgProduct, setImgProduct] = useState();

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
    <div className="fixed inset-0 z-30 flex items-center justify-center">
      <div ref={lightboxRef} className="fixed inset-0 bg-black opacity-50" onClick={closeLightbox}></div>
      <div className="relative h-full">
        <div className="grid grid-cols-1 h-full lg:w-[1280px] gap-0 lg:grid-cols-5 lg:gap-4 bg-white p-2 opacity-100 z-10 rounded ">
          <div className="relative text-5xl lg:col-span-4">
            <div
              className={`flex justify-center ${isZoomed ? (dragging ? "grabbing" : "grab") : ""}`}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
              <div className="max-h-[50vh] lg:max-h-screen">
                <img
                  className="mx-auto hover:cursor-grab rounded h-[100%] lg:h-full lg:w-auto"
                  src={imgProduct ? imgProduct : imgProduct_click}
                  alt="lightbox"
                  draggable={false}
                  style={{
                    transform: `scale(${zoomLevel}) translate(${positionX}px, ${positionY}px)`,
                    transition: "transform 0.2s ease",
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
                <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
              </button>
              <button className="ml-2" onClick={handleZoomOut}>
                <FontAwesomeIcon icon={faMagnifyingGlassMinus} />
              </button>
            </div>
          </div>
          <div>
            <h3 className="font-sans font-semibold whitespace-normal lg:mr-9 text-2xl">
              {product.name ||
                "Handicraft (còn được gọi tên như Artisanry hoặc Handmade): dịch là Thủ công mỹ nghệ, chỉ các loại hình sản phẩm được làm hoàn toàn bằng tay dưới sự hỗ trợ của công cụ đơn giản. Nói cách khác, sản phẩm Thủ công mỹ nghệ – Handicraft là kết quả từ bàn tay của nghệ nhân thủ công. Chúng phô bày vẻ đẹp của sự khéo léo cùng kĩ thuật truyền thống; chúng không được tạo ra từ quá trình sản xuất máy móc hàng loạt."}
            </h3>
            <div className="grid grid-cols-4 lg:grid-cols-2 mt-5">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt=""
                  className="rounded border border-gray-200 p-1 w-[70px] h-[70px] hover:border-[3px] hover:border-emerald-500 my-2"
                  onMouseOver={(e) => {
                    setHoverImgIndex(index);
                    setImgProduct(e.target.src);
                  }}
                />
              ))}
            </div>
          </div>
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
