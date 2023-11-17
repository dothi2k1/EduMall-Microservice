"use client";
import { useEffect, useState, useRef, useContext } from "react";
import "./style.css";
import swal from "sweetalert";
import { AuthContext } from "@/context/User/AuthProvider";
import MultipleTabsNavs from "@/components/Minigame/MultipleTabsNavs";
import Minigame from "@/components/HomePageComponents/Category";
import Cookies from "js-cookie";
const SlotMachine = () => {
  const [rollCheck, setRollCheck] = useState(true);
  const { user, userId, fetchUserData } = useContext(AuthContext);

  const gift = [
    {
      name: "9999 Xu",
      coin: 9999,
    },
    {
      name: "1000 Xu",
      coin: 1000,
    },
    {
      name: "3000 Xu",
      coin: 300,
    },
    {
      name: "7000  Xu",
      coin: 7000,
    },
    { name: "16 Xu", coin: 16 },
    { name: "9999 Xu", coin: 9999 },
    { name: "16 Xu", coin: 16 },
  ];
  const items = [];
  const itemsAll = [
    { username: "mondo0810", prize: "545 Xu", date: "2023-08-04T16:21:11.000Z" },
    { username: "quyhoa", prize: "5 Xu", date: "2023-08-04T16:21:11.000Z" },
    { username: "mondo0810", prize: "1000 Xu", date: "2023-08-04T16:21:11.000Z" },
    { username: "mondo0810", prize: "5 Xu", date: "2023-08-04T16:21:11.000Z" },
    { username: "mondo0810", prize: "1000 Xu", date: "2023-08-04T16:21:11.000Z" },
    { username: "tranminh", prize: "54 Xu", date: "2023-08-04T16:21:11.000Z" },
    { username: "mondo0810", prize: "1000 Xu", date: "2023-08-04T16:21:11.000Z" },
    { username: "mondo0810", prize: "54 Xu", date: "2023-08-04T16:21:11.000Z" },
    { username: "mondo0810", prize: "1000 Xu", date: "2023-08-04T16:21:11.000Z" },
    { username: "mondo0810", prize: "54 Xu", date: "2023-08-04T16:21:11.000Z" },
  ];
  const slotRefs = {
    slot1: useRef(null),
    slot2: useRef(null),
    slot3: useRef(null),
    slot4: useRef(null),
    slot5: useRef(null),
  };

  const handlePlayClick = () => {
    for (const ref of Object.values(slotRefs)) {
      if (ref.current) {
        ref.current.className = "a1";
      }
    }

    if (rollCheck) {
      setRollCheck(false);
      const sampleData = {
        status: "SUCCESS",
        msg: "Congratulations! You won a prize!",
        locale: 0,
        pos: randomInt(1, 6),
        num_roll_remain: 5,
        hinh: randomInt(3, 5),
      };

      const data = sampleData;

      const hinh = parseInt(data.hinh);

      const gift_detail = data.msg;
      const num_roll_remain = data.num_roll_remain;

      if (data.locale == 1) {
        var num1 = parseInt(data.pos) + 1;
        var num2 = num1 + 1;
        if (num2 > parseInt(7)) {
          num2 = num2 - parseInt(7);
        }
        var num3 = num2 + 1;
        if (num3 > parseInt(7)) {
          num3 = num3 - parseInt(7);
        }
        var num4 = num3 + 1;
        if (num4 > parseInt(7)) {
          num4 = num4 - parseInt(7);
        }
        var num5 = num4 + 1;
        if (num5 > parseInt(7)) {
          num5 = num5 - parseInt(7);
        }
      } else {
        if (data.hinh == 5) {
          var num1 = parseInt(data.pos) + 1;
          var num2 = parseInt(data.pos) + 1;
          var num3 = parseInt(data.pos) + 1;
          var num4 = parseInt(data.pos) + 1;
          var num5 = parseInt(data.pos) + 1;
        } else if (data.hinh == 4) {
          var num1 = parseInt(data.pos) + 1;
          var num2 = parseInt(data.pos) + 1;
          var num3 = parseInt(data.pos) + 1;
          var num4 = parseInt(data.pos) + 1;
          var num5 = num4 + 1;
          if (num5 > parseInt(7)) {
            num5 = num5 - parseInt(7);
          }
        } else if (data.hinh == 3) {
          var num1 = parseInt(data.pos) + 1;
          var num2 = parseInt(data.pos) + 1;
          var num3 = parseInt(data.pos) + 1;
          var num4 = num3 + 1;
          if (num4 > parseInt(7)) {
            num4 = num4 - parseInt(7);
          }
          var num5 = num4 + 1;
          if (num5 > parseInt(7)) {
            num5 = num5 - parseInt(7);
          }
        }
      }

      doSlot(num1, num2, num3, num4, num5, num_roll_remain, hinh);
    }
  };

  const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const [numChanges, setNumChanges] = useState(randomInt(1, 4) * 7);

  const i1Ref = useRef(0);
  const i2Ref = useRef(0);
  const i3Ref = useRef(0);
  const i4Ref = useRef(0);
  const i5Ref = useRef(0);

  const doSlot = (one, two, three, four, five, num_roll_remain, hinh) => {
    const newNumChanges = randomInt(1, 4) * 7;
    setNumChanges(newNumChanges);
    let numeberSlot1 = numChanges + one;
    let numeberSlot2 = numChanges + 2 * 7 + two;
    let numeberSlot3 = numChanges + 4 * 7 + three;
    let numeberSlot4 = numChanges + 6 * 7 + four;
    let numeberSlot5 = numChanges + 8 * 7 + five;

    const resetIRefs = () => {
      i1Ref.current = 0;
      i2Ref.current = 0;
      i3Ref.current = 0;
      i4Ref.current = 0;
      i5Ref.current = 0;
    };

    // Spinning slots
    const slot1 = setInterval(() => updateSlotClass(slotRefs.slot1, i1Ref, numeberSlot1, slot1), 50);
    const slot2 = setInterval(() => updateSlotClass(slotRefs.slot2, i2Ref, numeberSlot2, slot2), 50);
    const slot3 = setInterval(() => updateSlotClass(slotRefs.slot3, i3Ref, numeberSlot3, slot3), 50);
    const slot4 = setInterval(() => updateSlotClass(slotRefs.slot4, i4Ref, numeberSlot4, slot4), 50);
    const slot5 = setInterval(() => updateSlotClass(slotRefs.slot5, i5Ref, numeberSlot5, slot5), 50);

    let spinningSlots = 5;
    const updateSlotClass = (slotTile, iRef, numeberSlot, slotRef) => {
      iRef.current += 1;
      const i = iRef.current;
      if (i >= numeberSlot) {
        clearInterval(slotRef);
        slotTile.current.classList.add("active");
        spinningSlots -= 1;
        if (spinningSlots === 0) {
          const wonPrize = one === two && two === three;
          resetIRefs();
          console.log(iRef.current + "reset iref về 0");

          let giftIndex = 0;

          setTimeout(() => {
            if (wonPrize) {
              giftIndex = one;
              swal(
                "Congratulations",
                `Bạn đã trúng! ${gift[giftIndex - 1].name}. Tiền xu đã được cộng vào tài khoản`,
                "success",
              );
              setRollCheck(true);

              // Call the API to update coins after winning
              fetch(process.env.DOMAIN + "/minigame/bingo", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  user_id: userId,
                  coin: gift[giftIndex - 1].coin,
                }),
              })
                .then((response) => response.json())
                .then((data) => {
                  console.log("Coins updated successfully");
                })
                .catch((error) => {
                  console.error("Error updating coins:", error);
                });
            } else {
              swal("Không được rồi", `Chúc bạn may mắn lần sau`, "success");
            }
          }, 500);
        }
        return null;
      }
      if (slotTile.current) {
        if (slotTile.current.className === "a7") {
          slotTile.current.className = "a0";
        }
        slotTile.current.className = "a" + (parseInt(slotTile.current.className.substring(1)) + 1);
      }
    };

    return () => {
      clearInterval(slot1);
      clearInterval(slot2);
      clearInterval(slot3);
      clearInterval(slot4);
      clearInterval(slot5);
    };
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      fetchUserData(token);
    }
  }, [rollCheck]);

  return (
    <div className="container mx-auto lg:my-10 px-2">
      <div className="text-white  flex flex-col items-center justify-center my-10">
        <h3 className=" uppercase text-3xl flex justify-center font-extrabold ">BingGo Luckily accept Atom Xu</h3>
        <span className="font-extrabold mt-2 text-xl">
          Bạn đang có <span className="bg-red-500 text-white px-2 py-1 rounded">{user.coin}</span> xu
        </span>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2  lg:px-5   ">
        <div id="boxfull" className="">
          <div className="c-content-client-logos-slider-1  c-bordered" data-slider="owl">
            <div className="row-flex-safari game-list" style={{ marginBottom: "40px" }}>
              <main className="bingo_main">
                <section id="status"></section>
                <section id="Slots">
                  <div ref={slotRefs.slot1} id="slot1" className="a1"></div>
                  <div ref={slotRefs.slot2} id="slot2" className="a1"></div>
                  <div ref={slotRefs.slot3} id="slot3" className="a1"></div>
                  <div ref={slotRefs.slot4} id="slot4" className="a1"></div>
                  <div ref={slotRefs.slot5} id="slot5" className="a1"></div>
                </section>

                <section id="Gira">
                  <img
                    src="/images/uY7bxQoQlg_1583374251.png"
                    id="choi"
                    onClick={handlePlayClick}
                    style={{ cursor: "pointer" }}
                  />
                </section>
                <div className="clearfix"></div>
              </main>
            </div>
          </div>
        </div>
        <div className="div">
          <h1 className="font-semibold text-3xl mx-auto text-white ">Play now</h1>
          <p className="text-white font-semibold mt-5">
            {/* Chúc mừng bạn đã trúng: {result ? result : <span>...................</span>} */}
          </p>
          <MultipleTabsNavs items={items} itemsAll={itemsAll} />
        </div>
      </div>
      <div className="bg-white p-1 lg:p-10 rounded-lg bg-opacity-50 mt-9">
        <Minigame />
      </div>
    </div>
  );
};

export default SlotMachine;
