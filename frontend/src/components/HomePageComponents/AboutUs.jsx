import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const wordOpacity = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 1.5,
    },
  },
};

function AboutUs() {
  return (
    <section id="about-us">
      <div className="py-10 lg:py-20 px-5">
        <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-2 lg:gap-x-24 lg:gap-y-0">
          <div className="grid grid-cols-2 gap-x-4 lg:gap-x-7">
            <img
              alt="Boy"
              loading="lazy"
              width={518}
              height={756}
              decoding="async"
              data-nimg={1}
              className="rounded-2xl"
              // srcSet="/woman1.jpg"
              src="https://i.pinimg.com/564x/e9/0e/47/e90e4725fd2a86874c106ce3a26bd1a5.jpg "
              style={{ color: "transparent" }}
            />
            <img
              alt="Girl"
              loading="lazy"
              width={518}
              height={756}
              decoding="async"
              data-nimg={1}
              className="mt-10 rounded-2xl lg:mt-36"
              // srcSet="/woman.jpg"
              src="https://i.pinimg.com/564x/73/eb/3e/73eb3ec05b8bf0e98ba90bdc68bccd91.jpg"
              style={{ color: "transparent" }}
            />
          </div>
          <div>
            <h3 className="text-caption-2 lg:text-caption-1 text-primary-100 text-emerald-500 text-2xl mb-5 font-bold">
              About us
            </h3>
            <h2 className="text-heading-4 lg:text-heading-2 mt-2 mb-7 text-3xl font-bold text-slate-600">
              Welcome to Udemy
            </h2>
            <p className="font-sans text-gray-700 text-justify mt-4 lg:w-[65%]">
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
            <button className="border-emerald-500 rounded-full px-5 py-3 border-2 p-1 duration-300 hover:bg-emerald-500 hover:text-white mt-6 text-emerald-500">
              <Link href="/about" className="flex items-center">
                Read More
              </Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
