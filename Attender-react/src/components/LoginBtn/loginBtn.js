import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LoginBtn = () => {
  const [isLogin, setIsLogin] = useState(false);
  const userUid = sessionStorage.getItem("UID");

  const logOut = () => {
    sessionStorage.clear();
    window.location.reload();
    setIsLogin(false);
  };

  useEffect(() => {
    if (sessionStorage.getItem("UID") != null) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  if (isLogin === true) {
    return (
      <div className="accountInfo">
        <Link>현재 로그인한 유저 {userUid}</Link>
        <Link onClick={logOut}>로그아웃</Link>
      </div>
    );
  }
  if (isLogin === false) {
    return (
      <div className="accountInfo">
        <Link to="/login">Login</Link>
      </div>
    );
  }
};

export default LoginBtn;
