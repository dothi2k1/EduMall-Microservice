"use client";
import { useState } from "react";
import StartGame from "./StartGame";
import GamePlay from "./GamePlay";
import Minigame from "@/components/HomePageComponents/Category";

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);

  const toggleGamePlay = () => {
    setIsGameStarted((prev) => !prev);
  };

  return (
    <div>
      <div className="bg-slate-300">{isGameStarted ? <GamePlay /> : <StartGame toggle={toggleGamePlay} />}</div>
      <div className="bg-white p-1 lg:p-10 rounded-lg bg-opacity-50">
        <Minigame />
      </div>
    </div>
  );
}

export default App;
