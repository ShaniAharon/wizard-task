import type {ValidationRule} from "../utils/types";

export interface Question {
  id: string;
  title: string;
  text: string;
  skipCondition?: SkipCondition;
  validationRules: ValidationRule[];
}

export type SkipCondition = {
  questionId: string;
  expectedValue: string;
};

export interface WizardAnswers {
  [questionId: string]: string;
}

export interface WizardProps {
  questions: Question[];
}

export interface WizardNavigationProps {
  canGoBack: boolean;
  canGoNext: boolean;
  isLastQuestion: boolean;
  onBack: () => void;
  onNext: () => void;
  onDone: () => void;
}

export interface WizardStepProps {
  question: Question;
  answer: string;
  onAnswerChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validationError?: string;
}
