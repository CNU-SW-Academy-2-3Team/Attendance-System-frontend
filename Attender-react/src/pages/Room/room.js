import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { API_END_POINT } from "../../components/utils/API";

const RoomPage = () => {
  //------------------각종 선언부-------------------------//
  const userUid = sessionStorage.getItem("UID");
  const roomId = useParams().roomId;
  const [serchParams, setSerchParams] = useSearchParams();
  const guid = serchParams.get("guid");
  const [role, setRole] = useState(userUid);
  const [roomInfo, setRoomInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inviteCode = useRef();
  const attendCode = useRef();
  //------------------각종 선언부-------------------------//

  const navigate = useNavigate();
  const navigateToCodeGen = (e) => {
    navigate(`/room/codeGen/${roomId}`);
  };

  const navigateToAttendance = (e) => {
    navigate(`/room/attendance/${roomId}?guid=${guid}`);
  };

  const leave = () => {
    let nowTime = new Date();

    axios
      .patch(`${API_END_POINT}/user/attendance`, {
        guid: guid,
        exit_time: nowTime,
      })
      .then(() => {
        alert("퇴실이 완료 되었습니다.");
        window.location.reload();
      });
  };

  //------------------RoomInfo API 요청부-------------------------//
  const fetchRoomInfo = async () => {
    try {
      setError(null);
      setLoading(true);
      setRole(userUid);
      await axios.all([axios.get(`${API_END_POINT}/group/${roomId}/${userUid}`), axios.get(`${API_END_POINT}/group/${roomId}/attendance`), axios.get(`${API_END_POINT}/group/${roomId}/count`)]).then(
        axios.spread((response1, response2, response3) => {
          const res1 = response1.data.groupInfo;
          const attendanceState = response1.data.attendanceState;
          const attendanceCode = response2.data;
          const count = response3.data;
          const response = {
            ...res1,
            attendanceCode,
            attendanceState,
            count,
          };
          setRoomInfo(response);
        })
      );
    } catch (e) {
      console.log(e.message);
      setError(e);
    }
    setLoading(false);
  };
  console.log(roomInfo);
  //------------------RoomInfo API 요청부-------------------------//

  //------------------RoomInfo API 함수 실행부-------------------------//
  useEffect(() => {
    fetchRoomInfo();
  }, []);
  //------------------RoomInfo API 함수 실행부-------------------------//

  //------------------코드 확인 & 자동 복사 함수 실행부-------------------------//
  const seeInviteCode = (e) => {
    e.target.style.display = "none";
    inviteCode.current.style.display = "inline";
  };
  const seeAttendCode = (e) => {
    e.target.style.display = "none";
    attendCode.current.style.display = "inline";
  };
  const copyCode = (e) => {
    navigator.clipboard.writeText(e.target.textContent).then(() => {
      alert("코드가 복사되었습니다.");
    });
  };

  //------------------코드 확인 & 자동 복사 함수 실행부-------------------------//

  //------------------실제 렌더링부-------------------------//

  //------------------에러및 로딩시 렌더-------------------------//
  if (loading) return <div>로딩중</div>;
  if (error) return <div>에러 발생</div>;
  //------------------에러및 로딩시 렌더-------------------------//

  //------------------방장일 경우 렌더-------------------------//
  if (roomInfo) {
    if (roomInfo.leader_uid === Number(role)) {
      return (
        <div className="roominfo">
          <div className="roomInfoElement">
            <div id="roomTitle">
              <h3>{roomInfo.group_title}</h3>
            </div>
            <p>{roomInfo.group_detail}</p>
            <p>인원 : {roomInfo.count}명</p>
            <p>
              초대 코드 :
              <span className="inviteCode" style={{ cursor: "pointer" }} ref={inviteCode} onClick={copyCode}>
                {roomInfo.invite_code}
              </span>
              <span className="inviteCodeHide" style={{ cursor: "pointer" }} onClick={seeInviteCode}>
                초대코드 확인하기
              </span>
            </p>
            <p>
              현재 출석 코드 :
              <span className="attendCode" style={{ cursor: "pointer" }} ref={attendCode} onClick={copyCode}>
                {roomInfo.attendanceCode ? roomInfo.attendanceCode : "생성된 코드가 없습니다."}
              </span>
              <span className="attendCodeHide" style={{ cursor: "pointer" }} onClick={seeAttendCode}>
                출석코드 확인하기
              </span>
            </p>
            <button type="button" onClick={navigateToCodeGen}>
              출석 코드 생성하기
            </button>
          </div>
        </div>
      );
      //------------------방장일 경우 렌더-------------------------//

      //------------------방장이 아닐 경우 렌더-------------------------//
    } else {
      if (roomInfo.attendanceState === "NO" && roomInfo.cid === null) {
        return (
          <div className="roominfo">
            <div className="roomInfoElement">
              <div id="roomTitle">
                <h3>{roomInfo.group_title}</h3>
              </div>
              <p>{roomInfo.group_detail}</p>
              <p>인원 : {roomInfo.count}명</p>
              <p>
                현재 상태 : <span style={{ color: "gray" }}>미출결</span>
              </p>
              <button type="button" style={{ background: "gray" }}>
                현재 활성화된 코드가 없습니다.
              </button>
            </div>
          </div>
        );
      } else if (roomInfo.attendanceState === "NO") {
        return (
          <div className="roominfo">
            <div className="roomInfoElement">
              <div id="roomTitle">
                <h3>{roomInfo.group_title}</h3>
              </div>
              <p>{roomInfo.group_detail}</p>
              <p>인원 : {roomInfo.count}명</p>
              <p>
                현재 상태 : <span style={{ color: "gray" }}>미출결</span>
              </p>
              <button type="button" onClick={navigateToAttendance}>
                출석 체크 하기
              </button>
            </div>
          </div>
        );
      } else if (roomInfo.attendanceState === "Enter") {
        return (
          <div className="roominfo">
            <div className="roomInfoElement">
              <div id="roomTitle">
                <h3>{roomInfo.group_title}</h3>
              </div>
              <p>{roomInfo.group_detail}</p>
              <p>인원 : {roomInfo.count}명</p>
              <p>
                현재 상태 : <span style={{ color: "#2BAE66" }}>출석 완료</span>
              </p>
              <button type="button" onClick={leave}>
                퇴실 하기
              </button>
            </div>
          </div>
        );
      } else if (roomInfo.attendanceState === "Exit") {
        return (
          <div className="roominfo">
            <div className="roomInfoElement">
              <div id="roomTitle">
                <h3>{roomInfo.group_title}</h3>
              </div>
              <p>{roomInfo.group_detail}</p>
              <p>인원 : {roomInfo.count}명</p>
              <p>
                현재 상태 : <span style={{ color: "#2BAE66" }}>퇴실 완료</span>
              </p>
              <button type="button" onClick={navigateToAttendance}>
                재출결
              </button>
            </div>
          </div>
        );
      }
    }
  }
  //------------------방장이 아닐 경우 렌더-------------------------//

  //------------------실제 렌더링부-------------------------//
};

export default RoomPage;
