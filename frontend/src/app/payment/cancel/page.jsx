"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const search = searchParams.get("code");
  const id = searchParams.get("id");
  const orderCode = searchParams.get("orderCode");
  const cancel = searchParams.get("cancel");
  const status = searchParams.get("status");

  // Lấy thông tin từ query params của URL

  return (
    <div className="flex justify-center flex-col items-center">
      <h4 className="text-2xl text-red-500">Thanh toán thất bại</h4>
      <p>
        Nếu có bất kỳ câu hỏi nào, hãy gửi email tới <a href="mailto:support@edutik.vn">support@edutik.vn</a>
      </p>
      <img src="https://cdn.divineshop.vn/static/4e0db8ffb1e9cac7c7bc91d497753a2c.svg" alt="" />
      <a href="/" id="return-page-btn">
        Trở về trang Tạo Link thanh toán
      </a>

      {/* Hiển thị thông tin từ query params */}
      <p>Code: {search}</p>
      <p>ID: {id}</p>
      <p>Cancel: {cancel}</p>
      <p>Status: {status}</p>
      <p>Order Code: {orderCode}</p>
    </div>
  );
}
