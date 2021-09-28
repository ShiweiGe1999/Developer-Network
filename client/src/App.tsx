import React, { Fragment } from "react";
import "./App.css";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
function App() {
  return (
    <Fragment>
      <Navbar />
      <Landing />
      <Footer />
    </Fragment>
  );
}

export default App;
