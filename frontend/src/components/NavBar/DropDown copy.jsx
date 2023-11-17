import React from "react";
import Link from "next/link";

export default function DropDown() {
  return (
    <button className=" group text-body-2-medium flex items-center transition ">
      <span>
        <span className="group-hover:text-emerald-300 "> Category</span>
        <div className="hidden group-hover:block">
          <div
            className="absolute grid grid-cols-1 gap-2 items-baseline  space-y-6 rounded-2xl bg-white p-5 drop-shadow-lg transform opacity-100 scale-100  lg:max-w-[500px] max-w-full mr-5"
            aria-labelledby="headlessui-menu-button-:R6mba:"
            id="headlessui-menu-items-:r8:"
            role="menu"
            tabIndex={0}
            data-headlessui-state="open"
          >
            <Link href="/category" className="flex   ">
              <div className="max-w-[80px]">
                <img
                  alt="Plant"
                  src="https://img.freepik.com/free-vector/seller-is-sitting-shop-selling-different-varieties-trees_1150-41150.jpg"
                  className="rounded aspect-square w-fit  hover:border-2 border-emerald-300 object-cover"
                />
              </div>
              <h5 className=" gird grid-cols-1 leading-none ml-2  text-left hover:text-emerald-300 ">
                Plant Shop
                <p className="text-sm text-left">List of Plant items of the shop</p>
              </h5>
            </Link>
            <Link href="/minigame/wheel1" className="flex">
              <div className="max-w-[80px]">
                <img
                  alt="Plant"
                  src="/sieusale.jpg"
                  className="rounded aspect-square w-fit hover:border-2 border-emerald-300 object-cover"
                />
              </div>
              <h5 className=" gird grid-cols-1 leading-none ml-2  text-left hover:text-emerald-300 ">
                Super Sale Round
                <p className="text-sm text-left">Minigame category receives voucher</p>
              </h5>
            </Link>
            <Link href="/minigame/wheel2" className="flex">
              <div className="max-w-[80px]">
                <img
                  alt="Plant"
                  src="https://i.pinimg.com/564x/c4/1c/5c/c41c5cc63b37ac8929ad764295d946fc.jpg"
                  className="rounded aspect-square w-fit hover:border-2 border-emerald-300 object-cover"
                />
              </div>
              <h5 className=" gird grid-cols-1 leading-none ml-2  text-left hover:text-emerald-300 ">
                Dollars revolution
                <p className="text-sm text-left">The category of Minigame received dollars</p>
              </h5>
            </Link>
            <Link href="/minigame/bingo" className="flex">
              <div className="max-w-[80px]">
                <img
                  alt="Plant"
                  src="https://i.pinimg.com/564x/8e/32/95/8e3295af366c24025e887af2dfc8f103.jpg"
                  className="rounded aspect-square w-fit hover:border-2 border-emerald-300 object-cover"
                />
              </div>
              <h5 className=" gird grid-cols-1 leading-none ml-2  text-left hover:text-emerald-300 ">
                Bingo New Year
                <p className="text-sm text-left">Minigame category receives voucher</p>
              </h5>
            </Link>
            <Link href="/minigame/dice" className="flex">
              <div className="max-w-[80px]">
                <img
                  alt="Plant"
                  src="https://i.pinimg.com/564x/92/16/98/921698cfa27a9b0e261b77dae079ec86.jpg"
                  className="rounded aspect-square w-fit hover:border-2 border-emerald-300 object-cover"
                />
              </div>
              <h5 className=" gird grid-cols-1 leading-none ml-2  text-left hover:text-emerald-300 ">
                Minigame DICE
                <p className="text-sm text-left">Minigame category receives voucher</p>
              </h5>
            </Link>
          </div>
        </div>
      </span>
      <svg
        stroke="currentColor"
        className="group-hover:fill-emerald-300"
        strokeWidth={0}
        viewBox="0 0 24 24"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill="none" d="M0 0h24v24H0V0z" />
        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
      </svg>
    </button>
  );
}
