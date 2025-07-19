import {useState} from "react";
import type {WizardProps} from "../types/wizard";

export const Wizard = ({questions}: WizardProps) => {
  const [currQuest, setCurrQust] = useState(questions[0]);
  let [currQuestIdx, setCurrQustIdx] = useState(0);
  const handleNext = () => {
    if (currQuestIdx < questions.length - 1) {
      const nextIdx = currQuestIdx + 1;
      setCurrQustIdx(nextIdx);
      setCurrQust(questions[nextIdx]);
    }
  };

  const handleBack = () => {
    if (currQuestIdx > 0) {
      const prevIdx = currQuestIdx - 1;
      setCurrQustIdx(prevIdx);
      setCurrQust(questions[prevIdx]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {currQuest.title}
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
            {currQuest.text}
          </p>

          <input type="text" placeholder="Enter your answer..." />
        </div>

        <div>
          <button onClick={handleBack}>Back</button>
          <button onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  );
};
