import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components and Pages
import Home from "./pages/Home";
import Forms from "./pages/Forms";
import Rankings from "./pages/Rankings";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Forms />} />
          <Route path="/rankings" element={<Rankings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
