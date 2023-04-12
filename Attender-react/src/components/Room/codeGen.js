import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { API_END_POINT } from "../utils/API";

const CodeGen = () => {
  const roomId = useParams().roomId;
  const [serchParams, setSerchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const startTime = useRef();
  const endTime = useRef();
  const navigate = useNavigate();
  const [timeInput, setTimeInput] = useState({
    startTime: "",
    endTime: "",
  });

  const onChangeTimeInput = (e) => {
    setTimeInput({
      ...timeInput,
      [e.target.name]: e.target.value,
    });
  };
  const fetchCodeGen = async () => {
    try {
      setError(null);
      setLoading(true);
      if (timeInput.startTime.value && timeInput.endTime.value) {
        console.log(timeInput.startTime.value);
        console.log(timeInput.endTime.value);
        axios
          .put(`${API_END_POINT}/api/attendance`, {
            gid: roomId,
            acceptStartTime: timeInput.startTime.value,
            acceptEndTime: timeInput.endTime.value,
          })
          .then((response) => {
            console.log(response);
            console.log(timeInput.startTime.value);
            console.log(timeInput.endTime.value);
            alert(`출석 코드가 생성되었습니다.`);
            navigate(-1);
          });
      } else {
        alert("시간을 정확하게 입력해주세요");
      }
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {}, []);
  return (
    <>
      <div className="roominfo">
        <h2>출석 체크</h2>
      </div>
      <div className="codeForm">
        <br />
        <b>
          <font style={{ size: "5", color: "gray" }}>
            오늘의 출석 코드 생성하기
          </font>
        </b>
        <br />
        <br />

        <p>시작시간</p>
        <input
          type="datetime-local"
          id="startTime"
          name="startTime"
          value=""
          onChange={onChangeTimeInput}
        />
        <br />
        <br />
        <p>종료시간</p>
        <input
          type="datetime-local"
          id="endTime"
          name="endTime"
          value=""
          onChange={onChangeTimeInput}
        />
        <br />
        <br />
        <button type="button" onClick={fetchCodeGen}>
          생성하기
        </button>
        <button
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          돌아가기
        </button>
      </div>
      <div className="makeInviteCode"></div>
    </>
  );
};

export default CodeGen;
