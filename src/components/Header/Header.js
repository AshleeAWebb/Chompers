import React from "react";
import "../Header/Header.css";
import { Link } from "react-router-dom";
import chomperLogo from "../../assets/chomper.png";

const Header = () => {
  return (
    <div className="header">
      <h1>
        <Link to="/">
          <img className="logo" src={chomperLogo} alt="logo" />
        </Link>
      </h1>
    </div>
  );
};

export default Header;