import React from "react";
import "./Footer.css";
export default function Footer() {
  return (
    <footer className="footer">
      Copyright &copy; {new Date().getFullYear()} Developer Social Network
    </footer>
  );
}
