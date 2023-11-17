import React from "react";
import Wheel from "@/components/Minigame/Wheel";
import Banner from "@/components/HomePageComponents/Banner";

export default function page() {
  const prizes = [
    { name: "100$", probability: 0, angle: 0 }, // 10%
    { name: "800$", probability: 20, angle: 45 }, // 20%
    { name: "700$", probability: 20, angle: 90 }, // 30%
    { name: "600$", probability: 10, angle: 135 }, // 15%
    { name: "500$", probability: 10, angle: 180 }, // 10%
    { name: "400$", probability: 10, angle: 225 }, // 5%
    { name: "ATOM LUCKY", probability: 30, angle: 270 }, // 10%
    { name: "200$", probability: 0, angle: 315 }, // 0%
  ];

  return (
    <>
      <div className="mx-2 my-5 ">
        <Wheel prizes={prizes} imageWheel="/wheel.png" name="Billion dollar rotation" />
      </div>
    </>
  );
}
