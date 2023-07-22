import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header, } from "./components";
import { Home, PlayGround, Private, PrivateRoom, Public, PublicRoom } from "./pages";

function App() {
  return (
    <div className="bg-gray-600 h-screen w-screen">
      <Router>
        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
          <Header />
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/playground" element={<PlayGround />} />
              <Route path="/private" element={<Private />} />
              <Route path="/public" element={<Public />} />
              <Route path="/private/:id" element={<PrivateRoom />} />
              <Route path="/public/:roomid" element={<PublicRoom />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;

