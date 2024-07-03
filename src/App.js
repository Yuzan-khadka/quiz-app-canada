
import WelcomePage from './pages/welcome';
import Quiz from './pages/quiz';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<WelcomePage/>} />
          <Route path="/quiz" element={<Quiz/>} />
      </Routes>
    </div>
  );
}

export default App;
