import React from "react";

export default function page() {
  return (
    <div className="main-box">
      <h4 className="text-lg text-green-500">Thanh toán thành công. Cảm ơn bạn đã sử dụng payOS!</h4>
      <p>
        Nếu có bất kỳ câu hỏi nào, hãy gửi email tới <a href="mailto:support@payos.vn">support@payos.vn</a>
      </p>
      <a href="/" id="return-page-btn">
        Trở về trang Tạo Link thanh toán
      </a>
    </div>
  );
}
