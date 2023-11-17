import React from "react";
import { motion } from "framer-motion";

function AboutUs() {
  return (
    <section id="about-us" className="container lg:w-11/12 mx-auto">
      <div className="py-10 lg:py-20 px-5">
        <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-0">
          <div className="grid grid-cols-2 gap-x-4 lg:gap-x-7">
            <img
              alt="Boy"
              loading="lazy"
              width={518}
              height={756}
              decoding="async"
              data-nimg={1}
              className="rounded-2xl"
              srcSet="https://cdn.shopify.com/s/files/1/0047/0987/5786/files/Cofoco_-_Copenhagen_Denmark_1024x1024.png?v=1593774500"
              style={{ color: "transparent" }}
            />
            <img
              alt="Girl"
              loading="lazy"
              width={518}
              height={756}
              decoding="async"
              data-nimg={1}
              className="mt-20 rounded-2xl lg:mt-36"
              srcSet="https://www.livelyroot.com/cdn/shop/files/02.02.2022-LivelyRoot-DiscoChurch-WEB-54_1_e4324068-b34f-4ee4-b22d-0a360242e485_960x.jpg?v=1665007207"
              style={{ color: "transparent" }}
            />
          </div>
          <div>
            <h3 className="text-caption-2 lg:text-caption-1 text-primary-100 text-emerald-700 text-4xl mb-5 font-bold">
              About us
            </h3>
            <h2 className="text-heading-4 lg:text-heading-2 mt-2 mb-7 text-4xl font-bold text-emerald-500">
              Our History
            </h2>
            <p className="text-justify font-sans text-gray-700 mt-4 lg:w-full">
              Udemy was started in 1977 by its current CEO, Marcus Thompson. Coming from a background in dust control
              and air filtering in industrial settings the transition into achieving this via plants in offices and
              hotels was a natural progression.
              <br />
              <br />
              Starting off from a small unit in Leicester and working alongside his brother, the business spread its
              wings and grew, concentrating on the Midlands. This has all changed now!
              <br />
              <br />
              We now cover the whole of the UK and Ireland, and even deliver planting to Italy, Austria, France, Germany
              and Denmark. From a two man company to a large team based throughout the country we are proud of our team
              and the great work that we achieve every day.
              <br />
              <br />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
