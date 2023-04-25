import React from "react";
import { Link } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";

const LoginPage = () => {
  return (
    <div className="loginPage">
      <div className="loginForm">
        <h1 style={{ marginRight: "250px" }}>로그인</h1>
        <form>
          <input type="text" id="username" name="username" placeholder="사용자 계정" required />
          <br />
          <input type="password" id="password" name="password" placeholder="비밀번호" required />
          <br />
          <button type="submit" className="button">
            로그인
          </button>
          <br />
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", alignContent: "space-between" }}>
            <p style={{ fontWeight: "lighter", color: "#6d6d6d" }}>계정이 없으신가요?</p>
            <Link href="#" style={{ textDecoration: "none", color: "black", fontSize: "18px", fontWeight: "bold", marginLeft: "15px" }}>
              회원가입
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
