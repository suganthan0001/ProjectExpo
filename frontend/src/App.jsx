import { useState } from "react";
import "./App.css";
import PageNotFound from "./components/PageNotFound";
import Login from "./components/loginPage/Login";
import { Route,Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import {Toaster} from 'react-hot-toast'
import Home from "./components/home/Home";
import useStore from './components/zustand/store'
import QueryPage from "./components/queryPage/QueryPage";


function App() {
  const { theme } = useStore();
  return (
    <>
    <div data-theme={theme ? "light" : "dark"} className="duration-300">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to={"/login"} />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/home" element={<Home />} />
        <Route path="/query" element={<QueryPage />} />
      </Routes>
    </div>
    <div><Toaster/></div>
    </>
  );
}

export default App;
