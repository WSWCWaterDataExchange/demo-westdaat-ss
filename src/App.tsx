import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import LandingPage from "./pages/LandingPage";
import { HashRouter  } from "react-router-dom";

function App() {
  return (
    <HashRouter >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/landingpage/:siteUUID" element={<LandingPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </HashRouter >
  );
}

export default App;
