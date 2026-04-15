import React from "react";

const ChoiceBox = (props) => {
  const isAnswered = props.selectedId !== undefined;
  const isSelected = props.selectedId === props.choiceId;

  function buttonClick() {
  if (isAnswered) return;

  const choice = {
    id: props.choiceId,
    text: props.text,
    isCorrect: props.isCorrect
  };

  props.onSelect(choice);
  props.setSelectedId(props.choiceId);
}

  let buttonClasses = "border-blue-300 hover:border-blue-500 border-2 rounded-2xl text-black hover:opacity-80";

  if (isAnswered) {
    if (props.isCorrect) {
      buttonClasses = "border-green-500 border-2 bg-green-200 text-black";
    } else if (isSelected) {
      buttonClasses = "border-red-500 border-2 bg-red-200 text-black";
    } else {
      buttonClasses = "border-gray-400 border-2 bg-gray-200 text-gray-600 cursor-not-allowed";
    }
  }

  return (
    <div className="w-full p-2">
      <button
        onClick={buttonClick}
        disabled={isAnswered}
        className={`w-full rounded-xl p-4 font-bold transition-colors duration-300
          ${buttonClasses}`}
      >
        {props.text}
      </button>
    </div>
  );
};

export default ChoiceBox;