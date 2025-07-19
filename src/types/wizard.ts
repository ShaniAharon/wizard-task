export interface Question {
  id: string;
  title: string;
  text: string;
}

export interface WizardProps {
  questions: Question[];
}
