import React from "react";
import { motion } from "framer-motion";

const singelWord = {
  initial: {
    opacity: 0,
    x: 50,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.5,
      duration: 1.5,
    },
  },
};

function Title({ page, Title }) {
  return (
    <div className="bg-emerald-600 pb-20 pt-32 lg:pb-24 lg:pt-34">
      <motion.div variants={singelWord} initial="initial" animate="animate" className="text-center">
        <h4 className="text-caption-2 lg:text-caption-1 text-secondary-50 text-3xl font-semibold text-emerald-100">
          Home <span className=" text-emerald-200">/ {page}</span>
        </h4>
        <h1 className="text-heading-3 lg:text-heading-1 text-secondary-100  text-6xl font-semibold text-white">
          {Title}
        </h1>
      </motion.div>
    </div>
  );
}

export default Title;
