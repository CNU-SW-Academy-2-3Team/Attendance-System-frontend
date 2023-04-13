import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_END_POINT } from "../../components/utils/API";

const AddNewRoom = (props) => {
  //------------------각종 선언부-------------------------//
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [groupInput, setGroupInput] = useState({
    groupName: "",
    groupDes: "",
  });

  const [inviteCode, setInviteCode] = useState("");
  sessionStorage.setItem("UID", "5");
  const userUid = sessionStorage.getItem("UID");
  let navigate = useNavigate();
  //------------------각종 선언부-------------------------//

  //------------------Input값 set함수부-------------------------//
  const onChangeGroupInput = (e) => {
    setGroupInput({
      ...groupInput,
      [e.target.name]: e.target.value,
    });
  };
  const onChangeInviteCode = (e) => {
    setInviteCode(e.target.value);
  };
  //------------------Input값 set함수부-------------------------//

  //------------------그룹 생성 API 호출-------------------------//
  const fetchCreateGroup = async (groupName, groupDes) => {
    try {
      setLoading(true);
      setError(null);
      await axios
        .post(`${API_END_POINT}/group`, {
          uid: userUid,
          group_title: groupName,
          group_detail: groupDes,
        })
        .then((response) => {
          alert(`그룹 개설이 완료되었습니다. 초대코드 : ${response.data}`);
          navigate("/groupCreateList");
        });
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };
  //------------------그룹 생성 API 호출-------------------------//

  //------------------그룹 참여 API 호출-------------------------//
  const fetchJoinGroup = async () => {
    if (inviteCode !== "") {
      try {
        setError(null);
        setLoading(true);
        await axios
          .post(`${API_END_POINT}/group/join`, {
            uid: userUid,
            invite_code: inviteCode,
          })
          .then((response) => {
            if (response.data === "OK") {
              alert("그룹 참가가 완료되었습니다.");
              navigate("/joinGroup");
            } else if (response.data === "Already Exist") {
              alert("이미 참가한 그룹입니다.");
              navigate("/joinGroup");
            } else if (response.data === "FAIL") {
              alert("잘못된 초대 코드입니다.");
            }
          });
      } catch (e) {
        setError(e);
        alert("잘못된 코드 입니다.");
      }
    } else {
      alert("코드를 입력해 주세요");
    }
    setLoading(false);
  };
  //------------------그룹 참여 API 호출-------------------------//

  useEffect(() => {
    console.log(props.kind);
  }, []);

  //------------------에러 또는 로딩시 렌더-------------------------//
  if (error) return <div>에러 발생</div>;
  if (loading) return <div>로딩 중</div>;
  //------------------에러 또는 로딩시 렌더-------------------------//

  //------------------그룹 생성페이지 렌더-------------------------//
  if (props.kind === "groupCreate") {
    return (
      <div className="roomCreate">
        <form id="groupForm">
          <b>
            <font size="14" color="gray">
              새로운 그룹 생성하기
            </font>
          </b>
          <br></br>
          <br></br>
          <input type={"text"} placeholder="그룹 이름" id="groupName" name="groupName" className="input-line" style={{ width: "200px", height: "35px" }} onChange={onChangeGroupInput}></input>
          <br></br>
          <br></br>
          <input type={"text"} placeholder="그룹 설명" id="groupDescription" name="groupDes" className="input-line" style={{ width: "200px", height: "35px" }} onChange={onChangeGroupInput}></input>
          <br></br>
          <br></br>
          <button
            type="button"
            id="groupCreateButton"
            onClick={() => {
              if (groupInput.groupName && groupInput.groupDes) {
                fetchCreateGroup(groupInput.groupName, groupInput.groupDes);
              } else {
                alert("정보를 전부 입력해 주세요.");
              }
            }}
          >
            그룹 개설하기
          </button>
          <button
            type="button"
            onClick={() => {
              navigate(-1);
            }}
          >
            돌아가기
          </button>
        </form>
      </div>
    );
  }
  //------------------그룹 생성페이지 렌더-------------------------//

  //------------------그룹 참여페이지 렌더-------------------------//
  if (props.kind === "groupJoin") {
    return (
      <div className="codeForm">
        <b>
          <font size="14" color="gray">
            새로운 그룹에 참가하기
          </font>
        </b>
        <br></br>
        <br></br>
        <input type="text" id="inviteCode" name="invinteCode" placeholder="그룹 초대 코드" style={{ height: "35px" }} onChange={onChangeInviteCode}></input>
        <br></br>
        <br></br>
        <button type="button" onClick={fetchJoinGroup}>
          입장하기
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
    );
  }
  //------------------그룹 참여페이지 렌더-------------------------//
};

export default AddNewRoom;
