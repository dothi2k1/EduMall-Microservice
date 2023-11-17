import React from "react";
import Wheel from "@/components/Minigame/Wheel";

export default function page() {
  const prizes = [
    { name: "300$ - VOUCHER1", probability: 10, angle: 0 }, // 10%
    { name: "100$ - VOUCHER2", probability: 20, angle: 45 }, // 20%
    { name: "50% OFF - VOUCHER3 ", probability: 20, angle: 90 }, // 30%
    { name: "1 FREE - VOUCHER4", probability: 10, angle: 135 }, // 15%
    { name: "Next Time", probability: 10, angle: 180 }, // 10%
    { name: "1 FREE - VOUCHER5", probability: 10, angle: 225 }, // 5%
    { name: "100% OFF - VOUCHER6 ", probability: 10, angle: 270 }, // 10%
    { name: "So Close", probability: 10, angle: 315 }, // 0%
  ];

  return (
    <>
      <div className="mx-2 my-5 ">
        <Wheel prizes={prizes} imageWheel="/employer-wheel.png" name="Super voucher rotation" />
      </div>
    </>
  );
}
