import React from "react";
import { Link } from "react-router-dom";

const FloatingBtn = (props) => {
  //------------------그룹 생성 플로팅 버튼-------------------------//
  if (props.kind === "groupCreate") {
    return (
      <div className="floatingBtn">
        <span className="createNewRoom">
          <Link className="createBtn" to="/createGroup">
            새 그룹 만들기
          </Link>
        </span>
      </div>
    );
  }
  //------------------그룹 생성 플로팅 버튼-------------------------//

  //------------------그룹 참가 플로팅 버튼-------------------------//
  if (props.kind === "groupJoin") {
    return (
      <div className="floatingBtn">
        <span className="createNewRoom">
          <Link className="createBtn" to="/joinGroup">
            새 그룹 참가하기
          </Link>
        </span>
      </div>
    );
  }
  //------------------그룹 참가 플로팅 버튼-------------------------//
};

export default FloatingBtn;
