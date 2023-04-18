import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import LoginBtn from "../LoginBtn/loginBtn";

const path = window.location.pathname;

const Navbar = () => {
  useEffect(() => {
    if (path === "/login") {
      return console.log("unmount");
    }
  }, [path]);
  return (
    <nav className="navigation">
      <div className="logo">
        <Link to="/">Attender</Link>
      </div>

      <Link to="/groupCreateList">생성한 그룹</Link>
      <Link to="/groupJoinList">참여중인 그룹</Link>
      <Link to="/">Contact</Link>
      <LoginBtn />
    </nav>
  );
};

export default Navbar;
