import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { logout } from "../../reducers/authReducer";
export default function Navbar() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);

  return (
    <nav className="bg-black text-white fix" style={{ minWidth: "500px" }}>
      <div className="py-5 px-4 md:px-6 flex justify-between items-center ">
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
        {!state.auth.isAuthenticated ? (
          <ul className="flex ml-auto justify-around">
            <li className="listImg">
              <Link to="./login">Login</Link>
            </li>
            <li className="listItem">
              <Link to="register">Sign up</Link>
            </li>
          </ul>
        ) : (
          <ul className="flex ml-auto justify-around items-center">
            <li className="listItem">
              <button
                onClick={() => {
                  dispatch(logout());
                }}
              >
                Logout
              </button>
            </li>
            <li className="listImg h-8 hover:cursor-pointer">
              <img
                src={state.auth.user.avatar}
                alt="avatar"
                className="w-full h-full object-contain rounded-full "
              />
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
