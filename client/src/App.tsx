import React, { Fragment } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
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
