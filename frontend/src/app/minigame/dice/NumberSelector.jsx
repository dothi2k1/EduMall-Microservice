const NumberSelector = ({
  setError,
  error,
  selectedNumber,
  setSelectedNumber,
}) => {
  const arrNumber = [1, 2, 3, 4, 5, 6];

  const numberSelectorHandler = (value) => {
    setSelectedNumber(value);
    setError("");
  };

  return (
    <div className="flex flex-col items-center">
      <p className="error text-red-700">{error}</p>
      <div className="mt-5 lg:mt-0 grid grid-cols-3 lg:grid-cols-6 gap-[24px]">
        {arrNumber.map((value, i) => (
          <div 
            className="h-[72px] w-[72px] border-[1px] border-black grid place-items-center text-[24px] font-[700px]"
            key={i}
            onClick={() => numberSelectorHandler(value)}
            style={{backgroundColor: `${value === selectedNumber ? "black" : "white"}`, color: `${value === selectedNumber ? "white" : "black"}`}}
          >
            {value}
          </div>
        ))}
      </div>
      <p className="text-[24px] font-[700px]">Select Number</p>
    </div>
  );
};

export default NumberSelector;