const StartGame = ({ toggle }) => {
  return (
    <div className="grid lg:grid-cols-2 lg:gap-14 max-w-[1180px] lg:h-[100vh] mx-auto items-center">
      <div>
        <img className="mt-5 lg:mt-0 w-[70%] mx-auto lg:w-full" src="/images/dices.png" />
      </div>
      <div className="content mt-5 mb-14 text-center lg:text-left">
        <h1 className="text-[36px] lg:text-[96px]">Dice Game</h1>
        <button className="border border-black px-4 py-2 bg-white hover:bg-black hover:text-white transition duration-300 rounded-full" onClick={toggle}>Play Now</button>
      </div>
    </div>
  );
};

export default StartGame;