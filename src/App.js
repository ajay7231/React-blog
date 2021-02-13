import React from "react";
import Homepage from "./components/Homepage";
import "../src/styles/app.css";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import Blogs from "./components/Blogs";
import { selectSignedIn } from "./config/useSlice";

const App = () => {
  const isSignedIn = useSelector(selectSignedIn);
  return (
    <div className="app">
      <Navbar />
      <Homepage />
      {isSignedIn && <Blogs />}
    </div>
  );
};

export default App;
