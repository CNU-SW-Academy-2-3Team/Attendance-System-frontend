import React, { useEffect } from "react";
import axios from "axios";
import { API_END_POINT } from "../../components/utils/API";
const Main = () => {
  // useEffect(() => {
  //   axios.get(`${API_END_POINT}/main`).then((response) => {
  //     console.log(response.data);
  //     const nowMemberAmount = response.data.memberCount;
  //     const nowGroupAmount = response.data.groupCount;
  //     document.querySelector(".nowGroupAmount").textContent = nowGroupAmount;
  //     document.querySelector(".nowMemberAmount").textContent = nowMemberAmount;
  //   });
  //   let positions = ["모임회장 이여", "선생님 이여", "관리직 이여", "동아리회장 이여", "그룹장 이여"];

  //   const $textRotate = document.querySelector("#js-textRotate");
  //   const texts = document.createElement("span");
  //   texts.className = "textsUl";
  //   $textRotate.appendChild(texts);
  //   const textsUl = document.querySelector(".textsUl");
  //   textsUl.textContent = `${positions[positions.length - 1]}`;

  //   let intervalId;
  //   let i = 0;
  //   function animation() {
  //     textsUl.textContent = `${positions[i]}`;
  //     i += 1;
  //     if (i >= positions.length) {
  //       i = 0;
  //     }

  //     clearInterval(intervalId);
  //     interval();
  //   }

  //   function interval() {
  //     intervalId = setInterval(animation, 2000 / 1);
  //   }
  //   interval();
  // });

  return (
    <div className="mainContents">
      <div className="mainSlogan">
        <span>만국의</span>
        <span id="js-textRotate"></span>
        <p>단결하라</p>
        <p>그대들이 잃을 것은 불편함이요</p>
        <p>얻을 것은 편리함이다.</p>
      </div>
      <div className="mainInfomation">
        <div className="nowAmoutInfomation">
          <div>
            현재 개설된 그룹 수 <span className="nowGroupAmount"></span> 개 |
          </div>
          <div>
            현재 회원 수 <span className="nowMemberAmount"></span> 명
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
