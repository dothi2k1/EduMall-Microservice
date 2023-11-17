const RoleDice = ({ roleDice, currentDice }) => {
  return (
    <div className="mt-[48px] flex flex-col items-center">
      <div className="dice cursor-pointer" onClick={roleDice}>
        <img src={`/images/dice/dice_${currentDice}.png`} alt="dice 1" />
      </div>
      <p className="text-[24px]">Click on Dice to roll</p>
    </div>
  );
};

export default RoleDice;
