import "./App.css";
import {Wizard} from "./components/Wizard";
import {mockQuests} from "./data/mockQuests";

function App() {
  return (
    <div>
      <h1>Wizard</h1>
      <Wizard questions={mockQuests} />
    </div>
  );
}

export default App;
