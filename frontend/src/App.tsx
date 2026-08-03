import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Career from "./pages/Career";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/career" element={<Career />} />
        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </BrowserRouter>
  );
}
