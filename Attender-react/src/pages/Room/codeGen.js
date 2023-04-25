import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { API_END_POINT } from "../../components/utils/API";

const CodeGen = () => {
  const roomId = useParams().roomId;
  const [serchParams, setSerchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dateNow = new Date();

  const [timeInput, setTimeInput] = useState({
    startTime: "",
    endTime: "",
  });

  const onChangeTimeInput = (e) => {
    setTimeInput({
      ...timeInput,
      [e.target.name]: e.target.value,
    });
    console.log(timeInput.startTime, timeInput.endTime);
  };
  const fetchCodeGen = async () => {
    try {
      setError(null);
      setLoading(true);
      if (timeInput.startTime && timeInput.endTime) {
        axios
          .put(`${API_END_POINT}/attendance`, {
            gid: roomId,
            acceptStartTime: timeInput.startTime,
            acceptEndTime: timeInput.endTime,
          })
          .then((response) => {
            console.log(response);
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
  if (loading) return <div>로딩중</div>;
  if (error) return <div>에러 발생</div>;
  return (
    <>
      <div className="roominfo">
        <h2>출석 체크</h2>
      </div>
      <div className="codeForm">
        <br />
        <b>
          <font style={{ size: "5", color: "gray" }}>오늘의 출석 코드 생성하기</font>
        </b>
        <br />
        <br />

        <p>시작시간</p>
        <input type="datetime-local" id="startTime" name="startTime" onChange={onChangeTimeInput} />
        <br />
        <br />
        <p>종료시간</p>
        <input type="datetime-local" id="endTime" name="endTime" onChange={onChangeTimeInput} />
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
