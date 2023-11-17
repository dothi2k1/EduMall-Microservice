"use client";
import swal from "sweetalert";
import { useState, useEffect, useContext } from "react";
import styles from "./Home.module.css";
import { AuthContext } from "@/context/User/AuthProvider";
import MultipleTabsNavs from "@/components/Minigame/MultipleTabsNavs";
import Minigame from "../HomePageComponents/Category";

const Wheel = ({ prizes, imageWheel, name }) => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState("");
  const [probabilities, setProbabilities] = useState(prizes.map((prize) => prize.probability));
  const [items, setItems] = useState([]);
  const [itemsAll, setItemsAll] = useState([]);
  const { username } = useContext(AuthContext);

  useEffect(() => {
    const fetchResultsByUsername = async () => {
      try {
        const response = await fetch(process.env.DOMAIN + "/minigame/resultAll");
        const data = await response.json();
        setItemsAll(data);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchResultsByUsername();
  }, [spinning]);

  useEffect(() => {
    const fetchResultsByUsername = async () => {
      try {
        const response = await fetch(process.env.DOMAIN + "/minigame/result", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username }),
        });
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchResultsByUsername();
  }, [spinning]);

  const getRandomDegree = () => {
    const randomProbability = Math.random() * 100;
    let cumulativeProbability = 0;
    for (const prize of prizes) {
      cumulativeProbability += prize.probability;
      if (randomProbability < cumulativeProbability) {
        return prize.angle;
      }
    }
    return prizes[prizes.length - 1].angle;
  };

  const handleSpin = () => {
    if (!spinning) {
      const totalProbability = probabilities.reduce((total, prob) => total + prob, 0);
      if (totalProbability !== 100) {
        alert("Total probability must be 100%");
        return;
      }

      const fullRevolutions = Math.floor(Math.random() * 22) + 23;
      const degrees = fullRevolutions * 360 + getRandomDegree();
      setSpinning(true);
      setResult("");

      const wheel = document.getElementById("wheel");
      wheel.style.transition = "transform 3s ease-out";
      wheel.style.transform = `rotate(${degrees}deg)`;
      setTimeout(async () => {
        const positiveDegrees = (360 + degrees) % 360;
        console.log(positiveDegrees);
        const index = Math.floor((positiveDegrees / 360) * prizes.length);
        console.log((positiveDegrees / 360) * prizes.length);

        if (prizes[index]) {
          swal({
            title: "You have won",
            text: prizes[index].name,
            icon: "success",
            button: "Okii spin",
          });
          setResult(prizes[index].name);
          try {
            const prize = prizes[index].name;
            const apiUrl = process.env.DOMAIN + "/minigame/spin";
            const usernamemini = username.trim() === "" ? "Guest" : username;

            const response = await fetch(apiUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ usernamemini, prize }),
            });

            const data = await response.json();
            console.log(data);
          } catch (error) {
            console.error("Error saving spin history:", error);
          }
        } else {
          console.log(`Error: Prize at index ${index} is undefined.`);
          setResult("Unknown Prize");
        }
        setSpinning(false);
        // Send the spin history data to the API

        // End
      }, 3000);
    }
  };

  return (
    <div className="container mx-auto">
      <h3 className="text-white uppercase text-3xl flex justify-center font-extrabold my-10">{name}</h3>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2  lg:px-5   ">
        <div className="  lg:mx-0 ">
          <div className="relative flex items-center justify-center">
            <img
              id="wheel"
              className={`object-scale-down  ${styles.wheel} ${spinning ? styles.spinning : ""}`}
              src={imageWheel}
              alt=""
            />
            <img
              onClick={handleSpin}
              className="absolute m-auto top-0 right-0 left-0 bottom-0 max-w-[80px] hover:max-w-[90px] duration-200 cursor-pointer"
              src="/button.png"
              alt=""
            />
          </div>
          <p className="text-xl text-white flex justify-center my-5 font-semibold">
            You still have <span className="text-red-500 px-2 font-extrabold bg-white mx-2 rounded-full">3</span> lượt
            quay free of charge
          </p>
        </div>

        <div className="div">
          <h1 className="font-semibold text-3xl mx-auto text-white ">Play now</h1>
          <p className="text-white font-semibold mt-5">
            Congratulations on winning: {result ? result : <span>...................</span>}
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

export default Wheel;
