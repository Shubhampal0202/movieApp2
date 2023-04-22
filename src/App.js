import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/header/Header";
import Main from "./Components/main/Main";
import Favourite from "./Components/favourite/Favourite";
import { useState } from "react";
function App() {
  // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
  return (
    <BrowserRouter>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/favourites" element={<Favourite />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
