import type {Question} from "../types/wizard";
import type {ValidationRule} from "./types";

export const validateValue = (value: string, rule: ValidationRule): boolean => {
  switch (rule.type) {
    case "NON_EMPTY":
      return value.trim() !== "";
    case "MIN_LENGTH":
      return value.length >= (rule.minLength || 0);
    case "EMAIL":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value.trim());
    default:
      return true;
  }
};

export const getValidationError = (
  value: string,
  rule: ValidationRule
): string | null => {
  if (validateValue(value, rule)) {
    return null;
  }

  switch (rule.type) {
    case "NON_EMPTY":
      return "This field is required";
    case "MIN_LENGTH":
      return `Minimum length is ${rule.minLength || 0} characters`;
    case "EMAIL":
      return "Please enter a valid email address";
    default:
      return "Invalid value";
  }
};

export const validateQuestion = (
  question: Question,
  answer: string
): boolean => {
  return question.validationRules.every((rule) => validateValue(answer, rule));
};

export const getQuestionValidationError = (
  value: string,
  rules: ValidationRule[]
): string | null => {
  for (const rule of rules) {
    if (!validateValue(value, rule)) {
      return getValidationError(value, rule);
    }
  }
  return null;
};
