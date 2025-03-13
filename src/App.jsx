import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './pages/Home'
import GenerateTeamsPage from "./pages/GenerateTeamsPage";
import PublicTeamsPage from "./pages/PublicTeamsPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generate" element={<GenerateTeamsPage />} />
          <Route path="/team/:id" element={<PublicTeamsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
