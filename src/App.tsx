import "./App.css";
import {Wizard} from "./components/Wizard";
import {mockQuests} from "./data/mockQuests";

function App() {
  return (
    <div className="min-h-screen">
      <Wizard questions={mockQuests} />
    </div>
  );
}

export default App;
