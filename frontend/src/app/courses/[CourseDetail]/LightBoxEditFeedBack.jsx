// components/Lightbox.js

import { useState } from "react";
import AddFeedBack from "./AddFeedBack";

const LightBoxEditFeedBack = ({ onClose }) => {
  // State để kiểm soát trạng thái của lightbox
  const [lightboxOpen, setLightboxOpen] = useState(true);

  // Hàm xử lý khi đóng lightbox
  const handleClose = () => {
    setLightboxOpen(false);
    onClose();
  };

  return (
    // JSX của lightbox
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center ${
        lightboxOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white p-6 rounded-md max-w-md">
        {/* Nút đóng lightbox */}

        {/* Nội dung lightbox */}
        <AddFeedBack handleClose={handleClose} lightboxOpen={lightboxOpen} />
      </div>
    </div>
  );
};

export default LightBoxEditFeedBack;
