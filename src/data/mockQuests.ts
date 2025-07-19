import type {Question} from "../types/wizard";
import {makeId} from "../utils/helpers";

export const mockQuests: Question[] = [
  {
    id: makeId(),
    title: "What is your first name?",
    text: "Please enter your first name to get started with the wizard.",
  },
  {
    id: makeId(),
    title: "What is your last name?",
    text: "Please enter your last name to continue.",
  },
  {
    id: makeId(),
    title: "What is your email address?",
    text: "We'll use this to send you important updates and notifications.",
  },
];
