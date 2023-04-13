import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { API_END_POINT } from "../../components/utils/API";

const Attendace = () => {
  const navigate = useNavigate();
  const [serchParams, setSerchParams] = useSearchParams();
  const [inputCode, setInputCode] = useState("");
  const guid = serchParams.get("guid");

  function checkAttendance() {
    if (inputCode) {
      let today = new Date();

      axios
        .post(`${API_END_POINT}/user/attendance`, {
          guid: guid,
          attendance_code: inputCode,
          enter_time: today,
        })
        .then((response) => {
          if (response.data === "OK") {
            alert("출석이 완료되었습니다.");
            navigate(-1);
          } else if (response.data === "FAIL") {
            alert("잘못된 출석 코드 입니다.");
          }
        })
        .catch(function (error) {
          alert("잘못된 코드 입니다.");
        });
    } else {
      alert("코드를 입력해 주세요");
    }
  }

  return (
    <>
      {" "}
      <div className="attendForm">
        <b>
          <font size="5" color="gray">
            출석체크 하기
          </font>
        </b>
        <br />
        <br />

        <input type="text" id="attendCode" placeholder="출석체크코드" onChange={(e) => setInputCode(e.target.value)} />
        <br />
        <br />
        <button type="button" onClick={checkAttendance}>
          출석하기
        </button>
        <button
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          창닫기
        </button>
      </div>
    </>
  );
};

export default Attendace;
