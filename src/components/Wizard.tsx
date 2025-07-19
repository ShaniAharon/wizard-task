import {useEffect, useState} from "react";
import type {WizardAnswers, WizardProps} from "../types/wizard";
import {
  getQuestionValidationError,
  validateQuestion,
} from "../utils/validation";
import {WizardNavigation} from "./WizardNavigation";
import {WizardStep} from "./WizardStep";
import {useDebounce} from "../hooks/useDebounce";

export const Wizard = ({questions}: WizardProps) => {
  const [answers, setAnswers] = useState<WizardAnswers>({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers[currentQuestion.id] || "";
  const isInputValid = validateQuestion(currentQuestion, currentAnswer);
  const isLastQuestion = currentIndex === questions.length - 1;
  const [displayValidationError, setDisplayValidationError] = useState("");
  const canGoBack = currentIndex > 0;
  const canGoNext = isInputValid;
  const debouncedAnswer = useDebounce(currentAnswer, 500);

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
    // Clear validation error when user starts typing
    if (displayValidationError) {
      setDisplayValidationError("");
    }
  };

  const validateCurrentQuestion = (answer = currentAnswer): boolean => {
    const isValid = validateQuestion(currentQuestion, answer);
    let error;
    if (!isValid) {
      error = getQuestionValidationError(
        answer,
        currentQuestion.validationRules
      );
    }
    setDisplayValidationError(error || "");
    return isValid;
  };

  // Debounced validation effect
  useEffect(() => {
    if (debouncedAnswer && !displayValidationError) {
      validateCurrentQuestion(debouncedAnswer);
    }
  }, [debouncedAnswer]);

  useEffect(() => {
    setDisplayValidationError("");
  }, [currentIndex]);

  const handleNext = () => {
    if (!validateCurrentQuestion()) {
      return;
    }
    const nextIndex = getValidIndex(currentIndex, 1);
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
    }
  };

  const handleBack = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
          <div className="min-h-[300px] flex flex-col justify-center">
            <WizardStep
              question={currentQuestion}
              answer={currentAnswer}
              onAnswerChange={handleInputChange}
              validationError={displayValidationError}
            />
          </div>
          <WizardNavigation
            canGoBack={canGoBack}
            canGoNext={canGoNext}
            isLastQuestion={isLastQuestion}
            onBack={handleBack}
            onNext={handleNext}
            onDone={handleDone}
          />
        </div>
      </div>
    </div>
  );
};
