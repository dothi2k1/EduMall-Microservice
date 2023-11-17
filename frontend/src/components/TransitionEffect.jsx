import React from "react";
import { motion } from "framer-motion";

function TransitionEffect() {
  return (
    <>
      <motion.div
        className="fixed top-0 bottom-0 right-full w-screen h-screen z-30 bg-emerald-600"
        initial={{ x: "100%", width: "100%" }}
        animate={{ x: "0%", width: "0%" }}
        // exit={{x: ['0%', '100%'], width: ['0%', '100%']}}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      ></motion.div>

      <motion.div
        className="fixed top-0 bottom-0 right-full w-screen h-screen z-20 bg-emerald-700"
        initial={{ x: "100%", width: "100%" }}
        animate={{ x: "0%", width: "0%" }}
        transition={{ delay: 0.12, duration: 0.8, ease: "easeInOut" }}
      ></motion.div>

      <motion.div
        className="fixed top-0 bottom-0 right-full w-screen h-screen z-10 bg-emerald-800"
        initial={{ x: "100%", width: "100%" }}
        animate={{ x: "0%", width: "0%" }}
        transition={{ delay: 0.24, duration: 0.8, ease: "easeInOut" }}
      ></motion.div>
    </>
  );
}

export default TransitionEffect;
