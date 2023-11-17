import React from "react";

function Button({ text }) {
  return (
    <button className="border-emerald-500 rounded-full px-5 py-3 border-2 p-1 duration-300 hover:bg-emerald-500 hover:text-white mt-6 text-emerald-500">
      {text}
    </button>
  );
}

export default Button;
