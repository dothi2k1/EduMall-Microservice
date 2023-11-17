import React from "react";

function OneMeal() {
  return (
    <div className="py-10 lg:py-20 px-5 container lg:w-11/12 mx-auto">
      <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-0">
        <div className="order-last lg:order-first">
          <h2 className="text-heading-4 lg:text-heading-2 text-secondary-100">
            <p className="text-heading-4 lg:text-heading-2 mt-2 mb-7 text-4xl font-bold text-emerald-700">
              Our Production Process
            </p>
          </h2>
          <div className="mt-4">
            <p className="font-sans text-gray-700 text-justify">
              There are a number of different types of nurseries, broadly grouped as wholesale or retail nurseries, with some overlap depending on the specific operation. Wholesale nurseries produce plants in large quantities which are sold to retail nurseries, landscapers, garden centers, and other retail outlets which then sell to the public.
              <br />
              <br />
              Wholesale nurseries may be small operations that produce a specific type of plant using a small area of land, or very larger operations covering many acres.
              Some wholesale nurseries produce plants on contract for others which place an order for a specific number and size of plant, while others produce a wide range of plants that are offered for sale to other nurseries and landscapers and sold as first come first served.
              <br />
              <br />
              Retail nurseries sell plants ready to be placed in the landscape or used in homes and businesses.
            </p>
          </div>
        </div>
        {/* className="h-52 rounded-[20px] bg-green-500 lg:h-80 lg:rounded-[32px] overflow-hidden" */}
        {/* <div className="py-10 lg:py-20">
  <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-0">
    <div className="order-last lg:order-first">
      <h2 className="text-heading-4 lg:text-heading-2 text-secondary-100">
        One Meal at a Time
      </h2>
      <p className="text-body-2-regular mt-4 text-secondary-50">
        Through collaborative efforts with local residents, organizations, and
        key stakeholders, we have established a strong network of support. Over
        the years, we have implemented various initiatives such as community
        gardens, mobile markets, and educational programs focused on nutrition
        and culinary skills. By fostering community engagement and leveraging
        technology, we have amplified our impact and connected individuals to
        vital resources. Our history is rooted in the success stories of
        individuals and families who have gained improved access to nutritious
        food, leading to enhanced well-being and a stronger sense of community.
      </p>
    </div>
    <div className="h-52 rounded-[20px] bg-green-500 lg:h-80 lg:rounded-[32px] overflow-hidden">
      <video src="/assets/video/about.mp4" autoPlay="" controls="" loop="" />
    </div>
  </div>
</div> */}
        <iframe
          className="w-[382px] h-96 rounded-[20px] lg:w-full lg:rounded-2xl overflow-hidden"
          width={560}
          height={315}
          src="https://www.youtube.com/embed/Krn76P3rcuE"
          title="YouTube video player"
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen=""
        />
        {/* <iframe
          className="w-[382px] h-[215] rounded-[20px] lg:h-[315px] lg:w-full lg:rounded-2xl overflow-hidden"
          width={560}
          height={315}
          src="https://www.youtube.com/embed/WLRzUMMoR8I"
          title="YouTube video player"
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen=""
        /> */}
        {/* <iframe
          className="w-[382px] h-[215] rounded-[20px] lg:h-[315px] lg:w-full lg:rounded-2xl overflow-hidden"
          width={560}
          height={315}
          src="https://www.youtube.com/embed/VJY4sTPXhYk"
          title="YouTube video player"
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen=""
        /> */}
        {/* <iframe
          className="w-[382px] h-[215] rounded-[20px] lg:h-[315px] lg:w-full lg:rounded-2xl overflow-hidden"
          width={560}
          height={315}
          src="https://www.youtube.com/embed/iTytvWs5nV8"
          title="YouTube video player"
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen=""
        /> */}
        {/* <iframe
          className="w-[382px] h-[215] rounded-[20px] lg:h-[315px] lg:w-full lg:rounded-2xl overflow-hidden"
          width={560}
          height={315}
          src="https://www.youtube.com/embed/GYeOvRQ0FpQ"
          title="YouTube video player"
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen=""
        /> */}
        {/* <iframe
          className="w-[382px] h-[215] rounded-[20px] lg:h-[315px] lg:w-full lg:rounded-2xl overflow-hidden"
          width={560}
          height={315}
          src="https://www.youtube.com/embed/8O0qDEp3_G0"
          title="YouTube video player"
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen=""
        /> */}
      </div>
    </div>
  );
}

export default OneMeal;
