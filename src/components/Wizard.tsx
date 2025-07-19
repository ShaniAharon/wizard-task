import {useState} from "react";
import type {WizardAnswers, WizardProps} from "../types/wizard";
import {
  getQuestionValidationError,
  validateQuestion,
} from "../utils/validation";

export const Wizard = ({questions}: WizardProps) => {
  const [answers, setAnswers] = useState<WizardAnswers>({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers[currentQuestion.id] || "";
  const isInputValid = currentAnswer.trim() !== "";
  const isLastQuestion = currentIndex === questions.length - 1;
  const [displayValidationError, setDisplayValidationError] = useState("");

  const shouldSkipQuestion = (questionIndex: number) => {
    const question = questions[questionIndex];
    if (!question.skipCondition) return false;

    const {questionId, expectedValue} = question.skipCondition;
    return answers[questionId]?.toLowerCase() === expectedValue.toLowerCase();
  };

  const getValidIndex = (fromIndex: number, direction: 1 | -1) => {
    let nextIndex = fromIndex + direction;

    while (nextIndex >= 0 && nextIndex < questions.length) {
      if (!shouldSkipQuestion(nextIndex)) return nextIndex;
      nextIndex += direction;
    }

    return direction === 1 ? questions.length : -1;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: e.target.value,
    }));
  };

  const validateCurrentQuestion = (): boolean => {
    const isValid = validateQuestion(currentQuestion, currentAnswer);
    if (!isValid) {
      const error = getQuestionValidationError(
        currentAnswer,
        currentQuestion.validationRules
      );
      setDisplayValidationError(error || "");
    }
    return isValid;
  };

  const handleNext = () => {
    if (!validateCurrentQuestion()) {
      return;
    }
    setDisplayValidationError("");
    const nextIndex = getValidIndex(currentIndex, 1);
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
    }
  };

  const handleBack = () => {
    setDisplayValidationError("");
    const prevIndex = getValidIndex(currentIndex, -1);
    if (prevIndex >= 0) {
      setCurrentIndex(prevIndex);
    }
  };

  const handleDone = () => {
    console.log("Wizard completed", answers);
  };

  if (!questions?.length) {
    return <div>No questions available</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {currentQuestion.title}
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto mb-6">
            {currentQuestion.text}
          </p>
          <input
            type="text"
            value={currentAnswer}
            onChange={handleInputChange}
            placeholder="Enter your answer..."
            className="w-full max-w-2xl p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <span>{displayValidationError && displayValidationError}</span>
        <div className="mt-6 flex justify-between max-w-2xl mx-auto">
          {currentIndex > 0 && (
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
            >
              Back
            </button>
          )}
          <button
            onClick={isLastQuestion ? handleDone : handleNext}
            disabled={!isInputValid}
            className={`px-4 py-2 ${
              isInputValid
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-blue-300 text-white cursor-not-allowed"
            } rounded-md`}
          >
            {isLastQuestion ? "Done" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};
