import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components";
import { Home } from "./pages";

function App() {
  return (
    <div className="bg-gray-600 h-screen w-screen">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App