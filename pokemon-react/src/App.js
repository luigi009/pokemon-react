import React from "react";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="p-6">
        <Home />
      </div>
    </>
  );
}

export default App;
