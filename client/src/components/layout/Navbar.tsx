import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="bg-black text-white fix">
      <div className="py-5 px-4 md:px-6 flex justify-between items-center">
        <div className="active font-mono text-2xl italic">
          <Link to="/">DevConnector</Link>
        </div>

        <ul className="ml-8 md:ml-8 active ">
          <li className="list-none">
            <Link className="no-underline" to="/profiles">
              Developers
            </Link>
          </li>
        </ul>

        <ul className="flex ml-auto justify-around">
          <li className="listImg">
            <Link to="./login">Login</Link>
          </li>
          <li className="listItem">
            <Link to="register">Sign up</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
