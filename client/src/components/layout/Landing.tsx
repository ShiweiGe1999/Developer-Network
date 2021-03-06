import React, { useEffect } from "react";
import "./Landing.css";
import SplitText from "../SplitText";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { selectAuth } from "../../reducers/authReducer";
import { useHistory } from "react-router";
export default function Landing() {
  const auth = useAppSelector(selectAuth);
  const history = useHistory();
  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/dashboard");
    }
  }, [history, auth]);
  return (
    <div className="landing">
      <div className="overlay">
        <div className="mx-auto text-center text-white">
          <h1 className="mb-10 text-5xl">
            <span>
              <SplitText copy="Developer Connector" />
            </span>
          </h1>
          <p className="text-xl mb-10">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <Link
            to="/register"
            className="btn bg-blue-500 inline-block active:animate-bounce"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="bg-white bg-opacity-50 btn active:animate-bounce inline-block"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
