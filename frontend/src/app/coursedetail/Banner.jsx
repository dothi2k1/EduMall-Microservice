export default function Banner(params) {
  return (
    <div className="h-[430px] bg-gray-800 w-full leading-10">
      <div className="ml-[214px] mt-[70px] max-w-[750px] text-white">
        <div className="py-5 mt-[70px]">
          <p>Phát triển - Ngôn ngữ lập trình - Python</p>
          <p className="font-bold text-[34px]">The Complete Python Bootcamp From Zero to Hero in Python</p>
          <p>
            Learn Python like a Professional Start from the basics and go all the way to creating your own applications
            and games
          </p>
          <p className="leading-8 text-sm">
            <span className="text-yellow-700">
              4,6 <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
            </span>
            <span className="ml-2">
              <a href="#" className="text-sky-400">
                (489267 xếp hạng)
              </a>{" "}
              1.831.481 học viên
            </span>
            <br />
            Được tạo bởi{" "}
            <a href="#" className="text-sky-400">
              Johnny Dang
            </a>
            <br />
            <i class="fa-solid fa-circle-exclamation"></i> Lần cập nhật gần nhất 7/2023
            <i class="fa-solid fa-globe ml-7"></i> Tiếng Anh
            <br />
            <i class="fa-solid fa-keyboard"></i> Tiếng Việt [Tự động], Tiếng Anh [Tự động]
          </p>
        </div>
      </div>
    </div>
  );
}
