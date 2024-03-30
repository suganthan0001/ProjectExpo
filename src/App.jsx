import { useState } from "react";
import "./App.css";
import PageNotFound from "./components/PageNotFound";
import Login from "./components/loginPage/Login";
import { Route,Routes } from "react-router-dom";

function App() {

  const [theme, setTheme] = useState(true);

  return (
    <>
    <div data-theme={theme ? "light" : "dark"} className="duration-300">
      <Routes>
        <Route path="/login" element={<Login setTheme = {setTheme} theme={theme} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
    </>
  );
}

export default App;
