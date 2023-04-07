import React from "react";

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navigation">
      <div className="logo">
        <Link to="/">Attender</Link>
      </div>

      <Link to="/groupCreateList">생성한 그룹</Link>
      <Link to="/groupJoinList">참여중인 그룹</Link>
      <Link to="/">Contact</Link>
    </nav>
  );
};

export default Navbar;
