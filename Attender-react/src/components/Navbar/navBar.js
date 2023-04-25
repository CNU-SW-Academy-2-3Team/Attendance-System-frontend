import React, { useEffect } from "react";

import { Link, useLocation } from "react-router-dom";
import LoginBtn from "../LoginBtn/loginBtn";

const Navbar = () => {
  const locationNow = useLocation();
  if (locationNow.pathname === "/login") return null;
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
