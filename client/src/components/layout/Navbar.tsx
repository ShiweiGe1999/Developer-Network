import React from "react";
import "./Navbar.css";
export default function Navbar() {
  return (
    <nav className="bg-black text-white fix">
      <div className="py-5 px-4 md:px-6 flex justify-between items-center">
        <div className="active font-mono text-2xl italic">
          <a className="navbar-brand" href="landing.html">
            DevConnector
          </a>
        </div>

        <ul className="ml-8 md:ml-8 active ">
          <li className="list-none">
            <a className="no-underline" href="profiles.html">
              Developers
            </a>
          </li>
        </ul>

        <ul className="flex ml-auto justify-around">
          <li className="listItem">
            <a className="nav-link" href="feed.html">
              Post Feed
            </a>
          </li>
          <li className="listItem">
            <a className="nav-link" href="dashboard.html">
              Dashboard
            </a>
          </li>
          <li className="listImg">
            <img
              className="rounded-full w-6 h-6"
              src="https://www.gravatar.com/avatar/anything?s=200&d=mm"
              alt=""
              title="You must have a Gravatar connected to your email to display an image"
            />
          </li>
          <li className="listItem">
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </nav>
  );
}
