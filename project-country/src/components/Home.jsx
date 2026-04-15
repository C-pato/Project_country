import React, { useEffect, useState } from "react";
import globeLogo from "../assets/globe.svg";
import ChoiceBox from "./ChoiceBox";

import estonia from "../assets/estonia.png";

const Home = () => {
  const [difficulty, setDifficulty] = useState("Easy");
  const [selectedId, setSelectedId] = useState();
  const [currentData, setCurrentData] = useState([]);
  const [flag, setFlag] = useState(null);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);

  const points = {
  Easy: 1,
  Tough: 3,
  Hard: 5
  };


  async function handleChoice(choice) {
  setSelectedId(choice.id);

  if (choice.isCorrect) {
    setScore(prev => prev + points[difficulty]);
  } else {
    const finalScore = score;

    try {
      await fetch("http://localhost:3000/score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          score: finalScore
        })
      });
    } catch (err) {
      console.error("Failed to send score:", err);
    }

    setScore(0);
  }
}


  function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


  async function loadData() {
  setLoading(true);

  try {
    const res = await fetch(`http://localhost:3000/random-country/${difficulty}`);

    if (!res.ok) {
      throw new Error("API failed");
    }

    const data = await res.json();

    setFlag(data.details.flag);
    setCurrentData(convertToTable(data));
    setSelectedId(undefined);

  } catch (err) {
    console.error("Load failed:", err);
  } finally {
    setLoading(false); // ALWAYS runs
  }
}


  function difficultyChange(d) {
    setDifficulty(d);
  }

  



  function nextFlag() {
  loadData();
}


function convertToTable(apiData) {
  const { details, otherOptions } = apiData;

  const correctEntry = {
    id: Math.floor(Math.random() * 1000000),
    text: details.name,
    isCorrect: true
  };

  const incorrectEntries = otherOptions.map(option => ({
    id: Math.floor(Math.random() * 1000000),
    text: option,
    isCorrect: false
  }));

  const table = [correctEntry, ...incorrectEntries];

  return shuffle(table);
}



  useEffect(() => {
  loadData();
}, [difficulty]);



  useEffect(()=>{
    console.log(currentData)
  }, [currentData])



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
        <p className="text-blue-800 font-bold">Score: {score}</p>
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
  {loading ? (
    <p className="text-blue-700 font-bold text-xl">Loading...</p>
  ) : (
    flag && (
      <img 
        src={flag}
        alt="Country flag"
        className="border-2 border-blue-200 rounded-2xl md:w-1/3 h-auto"
      />
    )
  )}
</div>

          <p className="flex justify-center m-5">
            Which country does this flag belong to?
          </p>


<div className="grid grid-cols-3">
          {currentData && currentData.map(item => (
  <ChoiceBox
    key={item.id}
    choiceId={item.id}
    text={item.text}
    isCorrect={item.isCorrect}
    selectedId={selectedId}
    setSelectedId={setSelectedId}
    onSelect={handleChoice}
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
