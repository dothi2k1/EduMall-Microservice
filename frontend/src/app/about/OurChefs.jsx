import React from "react";
import { motion } from "framer-motion";

function ChefCard({ chefInfor }) {
  return (
    <div className="mt-28 lg:mt-0 container lg:w-11/12 mx-auto">
      <div className="group flex h-[415px] justify-center rounded-[32px] ">
        <motion.img
          alt="Chef"
          loading="lazy"
          width={518}
          height={832}
          decoding="async"
          data-nimg={1}
          className={` h-full w-fit origin-bottom scale-125 rounded-xl transition duration-300 lg:${chefInfor.scale} lg:group-hover:${chefInfor.hoverScale}`}
          // srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fchef-1.a4616b77.png&w=640&q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fchef-1.a4616b77.png&w=1080&q=75 2x"
          src={chefInfor.urlImg}
          style={{ color: "transparent" }}
        />
      </div>
      <div className="mt-6 text-center">
        <h5 className="text-black text-2xl mb-2 font-bold">{chefInfor.name}</h5>
        <h6 className="text-gray-700 text-xl mt-1 text-secondary-50">{chefInfor.position}</h6>
      </div>
      <p className="px-7 pt-4 text-gray-600 font-sans">
        Lorem ipsum dolor sit amet consectetur adipisicing. <br />
        Dolor dolorem in tempora. <br />
        Aut maxime ut architecto ipsum mollitia. Tenetur, cumque.
      </p>
    </div>
  );
}

function OurChefs() {
  const chefInfors = [
    {
      id: 1,
      scale: "scale-100",
      hoverScale: "scale-[1.2]",
      urlImg: "https://i.pinimg.com/564x/f9/b5/0c/f9b50c406951eb9ce68dc7a9165aa8e1.jpg",
      name: "Ethan Mitchell",
      position: "COO",
    },
    {
      id: 2,
      scale: "scale-[1.2]",
      hoverScale: "scale-125",
      urlImg: "https://i.pinimg.com/564x/0e/24/7c/0e247c95916762cf77fec46c825ea626.jpg",
      name: "Marcus Thompson",
      position: "CEO",
    },
    {
      id: 3,
      scale: "scale-100",
      hoverScale: "scale-[1.2]",
      urlImg: "https://i.pinimg.com/564x/a5/42/19/a54219e5ad638cd8e345cd8f376946f4.jpg",
      name: "Alexander Scott",
      position: "CFO",
    },
  ];
  return (
    <section id="our-chef" className="container lg:w-11/12 mx-auto">
      <div className="py-10 lg:py-20 px-5">
        <h3 className="text-caption-2 lg:text-caption-1 text-center text-primary-100 text-emerald-700 text-4xl mb-7 font-bold">
        The Leadership
        </h3>
        <h2 className="text-heading-4 lg:text-heading-2 mt-2 mb-7 text-4xl font-bold text-center text-emerald-500">
          Meet Our Executive Board
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-y-8 lg:mt-32 lg:grid-cols-3 lg:gap-x-[75px] lg:gap-y-0">
          {chefInfors.map((chefInfor) => {
            return <ChefCard key={chefInfor.id} chefInfor={chefInfor} />;
          })}
        </div>
      </div>
    </section>
  );
}

export default OurChefs;
