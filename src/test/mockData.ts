import type {Question} from "../types/wizard";

export const mockQuestions: Question[] = [
  {
    id: "1",
    title: "What is your name?",
    text: "Please enter your full name to get started with the wizard.",
    validationRules: [{type: "NON_EMPTY"}, {type: "MIN_LENGTH", minLength: 3}],
  },
  {
    id: "2",
    title: "Do you have insurance?",
    text: "Please enter yes or no",
    validationRules: [{type: "NON_EMPTY"}],
  },
  {
    id: "3",
    title: "What is the name of your insurance company?",
    text: "Please enter the name",
    validationRules: [{type: "NON_EMPTY"}],
    skipCondition: {
      questionId: "2",
      expectedValue: "no",
    },
  },
  {
    id: "4",
    title: "What is your email address?",
    text: "We will use this to send you important updates and notifications.",
    validationRules: [{type: "NON_EMPTY"}, {type: "EMAIL"}],
  },
];

export const mockQuestionsWithSkip: Question[] = [
  {
    id: "1",
    title: "Question 1",
    text: "First question",
    validationRules: [{type: "NON_EMPTY"}],
  },
  {
    id: "2",
    title: "Skip trigger question",
    text: "Answer 'skip' to skip next question",
    validationRules: [{type: "NON_EMPTY"}],
  },
  {
    id: "3",
    title: "Skippable question",
    text: "This question will be skipped if previous answer is 'skip'",
    validationRules: [{type: "NON_EMPTY"}],
    skipCondition: {
      questionId: "2",
      expectedValue: "skip",
    },
  },
  {
    id: "4",
    title: "Final question",
    text: "Last question",
    validationRules: [{type: "NON_EMPTY"}],
  },
];
