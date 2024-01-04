"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const orderCode = searchParams.get("orderCode");
  const cancel = searchParams.get("cancel");
  const status = searchParams.get("status");

  return (
    <div className="flex flex-col items-center justify-center  p-4">
      <h4 className="text-2xl text-green-500">Thanh toán thành công. Cảm ơn bạn đã sử dụng!</h4>
      <p>
        Nếu có bất kỳ câu hỏi nào, hãy gửi email tới{" "}
        <a className="text-blue-500 hover:underline" href="mailto:support@payos.vn">
          support@edutik.vn
        </a>
      </p>
      <img src="https://cdn.divineshop.vn/static/4e0db8ffb1e9cac7c7bc91d497753a2c.svg" alt="" className="w-32 h-32" />
      <a href="/" id="return-page-btn" className="text-blue-500 font-semibold hover:underline">
        Trở về trang Tạo Link thanh toán
      </a>
      <div className="grid grid-cols-2 gap-2 mt-8">
        <p className="text-gray-700">Order Code:</p>
        <p>{orderCode}</p>
        <p className="text-gray-700">Cancel:</p>
        <p>{cancel}</p>
        <p className="text-gray-700">Status:</p>
        <p>{status}</p>
      </div>
    </div>
  );
}
