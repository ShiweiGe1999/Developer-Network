import React from "react";
import "./Landing.css";
export default function Landing() {
  return (
    <div className="landing">
      <div className="overlay">
        <div className="mx-auto text-center text-white">
          <h1 className="mb-8 text-5xl">Developer Connector</h1>
          <p className="text-xl mb-10">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <a href="register.html" className="btn bg-blue-500">
            Sign Up
          </a>
          <a href="login.html" className="bg-white bg-opacity-50 btn">
            Login
          </a>
        </div>
      </div>
    </div>
  );
}
