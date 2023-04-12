import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_END_POINT } from "../utils/API";
import { Link, useNavigate } from "react-router-dom";
import FloatingBtn from "../FloatingBtn/floatingBtn";

const RoomList = (props) => {
  //------------------각종 선언부-------------------------//
  const [creatGroupList, setCreateGroupList] = useState(null);
  const [joinGroupList, setJoinGroupList] = useState(null);
  const [kind, setKind] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  sessionStorage.setItem("UID", "3");
  const userUid = sessionStorage.getItem("UID");
  //------------------각종 선언부-------------------------//

  //------------------페이지 이동 함수-------------------------//
  const navigate = useNavigate();
  const navigateToRoomPage = (e) => {
    navigate(`/room/${e.target.dataset.id}`);
  };
  //------------------페이지 이동 함수-------------------------//

  //------------------생성한 그룹리스트 요청 API-------------------------//
  const fetchCreateGroupList = async () => {
    try {
      setError(null);
      setCreateGroupList(null);
      setLoading(true);
      setKind("");
      await axios
        .get(`${API_END_POINT}/user/${userUid}/groups/created`)
        .then((response) => {
          if (response.data.length === 0) {
            setKind("groupCreate");
          } else {
            setKind("groupCreate");
            setCreateGroupList(response.data);

            // roomElement.addEventListener("click", () => {
            //   window.location.href = `room.html?id=${room.gid}`;
            // });

            // const $navigation = document.querySelector(".navigation");
            // const navigationUserDiv = document.createElement("div");
            // navigationUserDiv.className = "accountInfo";
            // const $accountMenu = document.createElement("a");
            // $accountMenu.href = "userInfo.html";
            // $accountMenu.textContent = "현재 로그인한 유저" + userUid;

            // navigationUserDiv.append($accountMenu);
            // $navigation.appendChild(navigationUserDiv);
            // $rooms.append(...roomElements);
          }
        });
    } catch (e) {
      console.log(e.message);
      setError(e);
    }
    setLoading(false);
  };
  //------------------생성한 그룹리스트 요청 API-------------------------//

  //------------------참여한 그룹리스트 요청 API-------------------------//
  const fetchJoinGroupList = async () => {
    try {
      setError(null);
      setCreateGroupList(null);
      setLoading(true);
      setKind("");
      await axios
        .get(`${API_END_POINT}/user/${userUid}/groups/joined`)
        .then((response) => {
          if (response.data.length === 0) {
            setKind("groupJoin");
          } else {
            setKind("groupJoin");
            setJoinGroupList(response.data);
            console.log(response.data);

            // roomElement.addEventListener("click", () => {
            //   window.location.href = `room.html?id=${room.gid}`;
            // });

            // const $navigation = document.querySelector(".navigation");
            // const navigationUserDiv = document.createElement("div");
            // navigationUserDiv.className = "accountInfo";
            // const $accountMenu = document.createElement("a");
            // $accountMenu.href = "userInfo.html";
            // $accountMenu.textContent = "현재 로그인한 유저" + userUid;

            // navigationUserDiv.append($accountMenu);
            // $navigation.appendChild(navigationUserDiv);
            // $rooms.append(...roomElements);
          }
        });
    } catch (e) {
      console.log(e.message);
      setError(e);
    }
    setLoading(false);
  };
  //------------------참여한 그룹리스트 요청 API-------------------------//

  //------------------API 함수 실행부-------------------------//
  useEffect(() => {
    if (props.kind === "groupCreate") {
      fetchCreateGroupList();
    }
    if (props.kind === "groupJoin") {
      fetchJoinGroupList();
    }
  }, [props.kind]);
  //------------------API 함수 실행부-------------------------//

  //------------------실제 렌더링부-------------------------//
  if (loading) return <div>로딩중</div>;
  if (error) return <div>에러 발생</div>;
  if (kind === "groupCreate" && !creatGroupList)
    return <div className="roomNullButton">생성한 그룹이 없습니다</div>;
  if (kind === "groupJoin" && !joinGroupList)
    return <div className="roomNullButton">참여중인 그룹이 없습니다</div>;

  //------------------생성한 그룹리스트 렌더-------------------------//
  if (kind === "groupCreate" && creatGroupList) {
    return (
      <>
        <div className="roomlist">
          {creatGroupList.map((room) => (
            <div
              className="room"
              data-id={room.gid}
              key={room.gid}
              onClick={navigateToRoomPage}
            >
              <h3>{room.group_title}</h3>
              <p>{room.group_detail}</p>
              <span>By{room.leader_uid}</span>
            </div>
          ))}
        </div>
        <FloatingBtn kind={kind} />
      </>
    );
  }
  //------------------생성한 그룹리스트 렌더-------------------------//

  //------------------참여한 그룹리스트 렌더-------------------------//
  if (kind === "groupJoin" && joinGroupList) {
    return (
      <>
        <div className="roomlist">
          {joinGroupList.map((room) => (
            <div
              className="room"
              data-id={room.group.gid}
              data-guid={room.guid}
              key={room.group.gid}
              onClick={(e) => {
                navigateToRoomPage(e);
              }}
            >
              <h3>{room.group.group_title}</h3>
              <p>{room.group.group_detail}</p>
              <span>By{room.group.leader_uid}</span>
            </div>
          ))}
        </div>
        <FloatingBtn kind={kind} />
      </>
    );
  }
  //------------------참여한 그룹리스트 렌더-------------------------//

  //------------------실제 렌더링부-------------------------//
};

export default RoomList;
