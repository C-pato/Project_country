import React, { useEffect, useState } from "react";
import globeLogo from "../assets/globe.svg";
import ChoiceBox from "./ChoiceBox";

import hero from '../assets/hero.png';


const Home = () => {

    const [difficulty, setDifficulty] = useState("Easy")
    function difficultyChange(d) {
        setDifficulty(d)
    }

  return (
    <>
    
      <div className="flex justify-between items-center p-4 border-blue-300 border-2 bg-blue-100 rounded-2xl ">
        <div className="flex items-center gap-2">
          <img src={globeLogo} alt="Globe" className="w-6 h-6" />
          <h1 className="text-xl font-bold">Flag Guessing Game</h1>
        </div>
        <p className="text-blue-800 font-bold">Score:</p>
      </div>

      <div className="mx-10 select-none">

      <div className="flex my-5">
        <p>Choose the correct country for the flag.</p>
       {/* Easy/tough/hard */}
        <p className="px-2">Level: {difficulty}</p>
      </div>

      <div className="border-2 border-blue-200 rounded-2xl">
        <label className="m-5" for="difficulty">Difficulty:</label>

<select className="m-2 border-2 rounded-xs border-blue-300" name="difficulty" id="difficulty" onChange={(t) => {difficultyChange(t.target.value)}}>
  <option value="Easy">Easy</option>
  <option value="Tough">Tough</option>
  <option value="Hard">Hard</option>
</select>
      </div>

   {/* flag thingy with answers could be a component */}
      <div>
        <div className="flex justify-center border-2 border-blue-200 rounded-2xl mt-2">
            <img src={hero} alt="Temp image" />
        </div>
        <p className="flex justify-center m-5">Which country does this flag belong to?</p>

        <ChoiceBox></ChoiceBox>
        


<div className="flex flex-row justify-end">
    <button className="border-2 border-blue-700 bg-blue-700 text-white justify-self-end rounded-xl px-4 w-auto h-10">Next flag</button>
    </div>


      </div>





      </div>
    </>
  );
};
export default Home;
