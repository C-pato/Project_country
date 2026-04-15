import React, { useState } from "react";
import { Link } from "react-router-dom";
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
      <div className="select-none flex items-center justify-between border-b border-blue-200/80 bg-white/80 px-4 py-4 shadow-[0_8px_24px_rgba(30,64,175,0.1)] backdrop-blur-md">
        <div className="flex items-center gap-2">
          <img src={globeLogo} alt="Globe" className="h-6 w-6" />
          <h1 className="text-xl font-bold text-blue-950">Flag Guessing Game</h1>
        </div>
        <div className="flex items-center gap-2">
          <p className="rounded-xl border border-blue-200 bg-linear-to-r from-blue-50 to-sky-50 px-3 py-1 text-sm font-semibold text-blue-800">
            Score:
          </p>
          <Link
            to="/leaderboard"
            className="rounded-xl border border-blue-300 bg-white px-3 py-1 text-sm font-semibold text-blue-800 transition hover:border-blue-500"
          >
            Leaderboard
          </Link>
        </div>
      </div>

      <div className="md:mx-2 select-none">
        <div className="flex justify-center px-3">
          <div className="mt-4 w-full max-w-md rounded-2xl border border-blue-200/80 bg-white/80 p-2 shadow-[0_12px_32px_rgba(30,64,175,0.16)] backdrop-blur-md">
            <div className="flex items-center justify-between gap-3 rounded-xl bg-linear-to-r from-blue-50 to-sky-50 px-3 py-2">
              <label
                htmlFor="difficulty"
                className="text-xs font-semibold tracking-[0.2em] text-blue-700 uppercase"
              >
                Difficulty: {difficulty}
              </label>

              <select
                className="hover:border-blue-500 rounded-xl border border-blue-300 bg-white px-3 py-1.5 text-sm font-semibold text-blue-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                name="difficulty"
                id="difficulty"
                value={difficulty}
                onChange={(t) => {
                  difficultyChange(t.target.value);
                }}
              >
                <option value="Easy">Easy</option>
                <option value="Tough">Tough</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>
        </div>

        {/* flag pic with buttons component */}
        <div>
          <div className="flex justify-center rounded-2xl mt-2">
            <img
              src={estonia}
              alt="Temp image"
              className="border-2 border-blue-200 rounded-2xl md:w-1/3 h-auto"
            />
          </div>
          <p className="flex justify-center m-4 font-medium">
            Which country does this flag belong to?
          </p>

          <div className="grid grid-cols-3">
            {dummy_data.map((item) => (
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
              disabled={selectedId === undefined}
              onClick={nextFlag}
              className={`mb-2 justify-self-end rounded-xl border-2 px-5 w-auto h-12 text-white transition-colors duration-300 ${
                selectedId === undefined
                  ? "border-gray-300 bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "border-blue-400 bg-blue-400 hover:border-blue-500 hover:bg-blue-500"
              }`}
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
