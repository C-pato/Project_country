import React, { useEffect, useState } from "react";
import globeLogo from "../assets/globe.svg";
import ChoiceBox from "./ChoiceBox";

import estonia from "../assets/estonia.png";

const Home = () => {
  const [difficulty, setDifficulty] = useState("Easy");
  function difficultyChange(d) {
    setDifficulty(d);
  }

  const [selectedId, setSelectedId] = useState();

  function nextFlag() {
    setSelectedId(undefined);
  }



  const dummy_data = [
  { id: 1, text: "Estonia", isCorrect: true },
  { id: 2, text: "Germany", isCorrect: false },
  { id: 3, text: "Russia", isCorrect: false },
  { id: 4, text: "Denmark", isCorrect: false },
  { id: 5, text: "Netherlands", isCorrect: false },
  { id: 6, text: "Sweden", isCorrect: false },
];

  return (
    <>
      <div className=" flex justify-between items-center p-4 border-blue-300 border-2 bg-blue-100 rounded-b-lg ">
        <div className="flex items-center gap-2">
          <img src={globeLogo} alt="Globe" className="w-6 h-6" />
          <h1 className="text-xl font-bold">Flag Guessing Game</h1>
        </div>
        <p className="text-blue-800 font-bold">Score:</p>
      </div>

      <div className="md:mx-2 select-none">
        <div className="flex my-5">
          <p className="mx-2">Choose the correct country for the flag.</p>
          {/* Easy/tough/hard */}
          <p className="px-2">Level: {difficulty}</p>
        </div>

        <div className="border-2 border-blue-200 rounded-2xl bg-blue-100">
          <label className="m-5" >
            Difficulty:
          </label>

          <select
            className="m-2 border-2 rounded-xs border-blue-300 bg-white"
            name="difficulty"
            id="difficulty"
            onChange={(t) => {
              difficultyChange(t.target.value);
            }}
          >
            <option value="Easy">Easy</option>
            <option value="Tough">Tough</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {/* flag thingy with answers could be a component */}
        <div>
          <div className="flex justify-center rounded-2xl mt-2">
            <img src={estonia} alt="Temp image" className="border-2 border-blue-200 rounded-2xl md:w-1/3 h-auto" />
          </div>
          <p className="flex justify-center m-5">
            Which country does this flag belong to?
          </p>


<div className="grid grid-cols-3">
          {dummy_data.map(item => (
  <ChoiceBox
    key={item.id}
    choiceId={item.id}
    text={item.text}
    isCorrect={item.isCorrect}
    selectedId={selectedId}
    setSelectedId={setSelectedId}
  />
))}

</div>

          <div className="flex flex-row justify-end mx-2">
            <button
              onClick={nextFlag}
              className="border-2 border-blue-700 bg-blue-700 text-white justify-self-end rounded-xl px-4 w-auto h-10"
            >
              Next flag
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
