import type {Question} from "../types/wizard";

export const mockQuests: Question[] = [
  {
    id: "1",
    title: "What is your name?",
    text: "Please enter your full name to get started with the wizard.",
    validationRules: [{type: "NON_EMPTY"}, {type: "MIN_LENGTH", minLength: 5}],
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
    text: "Please enter there name",
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
  {
    id: "5",
    title: "Would you like a new insurance?",
    text: "Please enter yes or no",
    validationRules: [{type: "NON_EMPTY"}],
  },
];
