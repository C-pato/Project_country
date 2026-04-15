import React, { useState } from "react";

const ChoiceBox = ({ text, isCorrect }) => {
  const [clicked, setClicked] = useState(false);

  function buttonClick() {
    setClicked(true);
  }

  return (
    <div className="w-full p-2">
      <button
        onClick={buttonClick}
        className={`w-full rounded-xl p-4 font-bold transition-colors duration-300
          ${
            clicked
              ? isCorrect
                ? "border-green-500 border-2 bg-green-200 text-black"
                : "border-red-500 border-2 bg-red-200 text-black"
              : "border-blue-500 border-2 rounded-2xl text-black hover:opacity-80"
          }`}
      >
        {text}
      </button>
    </div>
  );
};

export default ChoiceBox;