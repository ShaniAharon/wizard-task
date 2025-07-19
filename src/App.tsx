import "./App.css";
import {Wizard} from "./components/Wizard";
import {mockQuests} from "./data/mockQuests";
import type {WizardAnswers} from "./types/wizard";

function App() {
  const onDone = (answers: WizardAnswers) => {
    console.log("Wizard completed", answers);
  };

  return (
    <div className="min-h-screen">
      <Wizard questions={mockQuests} onDone={onDone} />
    </div>
  );
}

export default App;
