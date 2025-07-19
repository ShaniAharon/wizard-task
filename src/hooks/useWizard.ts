import {useState, useEffect, useCallback, useMemo} from "react";
import type {Question, WizardAnswers} from "../types/wizard";
import {
  validateQuestion,
  getQuestionValidationError,
} from "../utils/validation";
import {useDebounce} from "./useDebounce";

export interface UseWizardProps {
  questions: Question[];
  onDone?: (answers: WizardAnswers) => void;
}

export const useWizard = ({questions, onDone}: UseWizardProps) => {
  const [answers, setAnswers] = useState<WizardAnswers>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayValidationError, setDisplayValidationError] = useState("");

  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers[currentQuestion?.id] || "";
  const debouncedAnswer = useDebounce(currentAnswer, 500);

  const isInputValid = useMemo(() => {
    return currentQuestion
      ? validateQuestion(currentQuestion, currentAnswer)
      : false;
  }, [currentQuestion, currentAnswer]);

  const isLastQuestion = currentIndex === questions.length - 1;
  const canGoBack = currentIndex > 0;
  const canGoNext = isInputValid;

  const shouldSkipQuestion = useCallback(
    (questionIndex: number): boolean => {
      const question = questions[questionIndex];
      if (!question?.skipCondition) return false;

      const {questionId, expectedValue} = question.skipCondition;
      return answers[questionId]?.toLowerCase() === expectedValue.toLowerCase();
    },
    [questions, answers]
  );

  const getValidIndex = (fromIndex: number, direction: 1 | -1): number => {
    let nextIndex = fromIndex + direction;

    while (nextIndex >= 0 && nextIndex < questions.length) {
      if (!shouldSkipQuestion(nextIndex)) return nextIndex;
      nextIndex += direction;
    }

    return direction === 1 ? questions.length : -1;
  };

  const validateCurrentQuestion = (answer = currentAnswer): boolean => {
    if (!currentQuestion) return false;

    const isValid = validateQuestion(currentQuestion, answer);
    let error = "";

    if (!isValid) {
      error =
        getQuestionValidationError(answer, currentQuestion.validationRules) ||
        "";
    }

    setDisplayValidationError(error);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: e.target.value,
    }));

    if (displayValidationError) {
      setDisplayValidationError("");
    }
  };

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
    if (onDone) {
      onDone(answers);
    }
  };

  // Debounced validation effect
  useEffect(() => {
    if (debouncedAnswer && !displayValidationError && currentQuestion) {
      validateCurrentQuestion(debouncedAnswer);
    }
  }, [debouncedAnswer, currentQuestion]);

  useEffect(() => {
    setDisplayValidationError("");
  }, [currentIndex]);

  return {
    answers,
    currentIndex,
    currentQuestion,
    currentAnswer,
    displayValidationError,
    isInputValid,
    isLastQuestion,
    canGoBack,
    canGoNext,
    handleInputChange,
    handleNext,
    handleBack,
    handleDone,
  };
};
