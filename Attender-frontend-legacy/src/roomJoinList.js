import { API_END_POINT } from "./API.js";
const $rooms = document.querySelector(".roomlist");
const userUid = sessionStorage.getItem("UID");
axios
  .get(`${API_END_POINT}/user/${userUid}/groups/joined`)
  .then((response) => {
    if (response.data.length === 0) {
      const $roomNull = document.createElement("div");
      $roomNull.className = "roomNullButton";
      $roomNull.innerHTML = `<h3>참가중인 그룹이 없습니다.</h3>`;
      $rooms.append($roomNull);
    } else {
      const rooms = response.data;
      const roomElements = rooms.map((roomobj) => {
        const room = roomobj.group;
        const guid = roomobj.guid;
        const roomElement = document.createElement("div");
        console.log(response);
        roomElement.className = "room";
        roomElement.dataset.id = room.gid;

        roomElement.innerHTML = `
      <h3>${room.group_title}</h3>
      <p>${room.group_detail}</p>
      <span>by ${room.leader_uid}</span>
      <!--<p>참가자 수 : ${room.head_count}</p>-->
    
    `;
        roomElement.addEventListener("click", () => {
          window.location.href = `room.html?id=${room.gid}&guid=${guid}`;
        });
        return roomElement;
      });

      const $navigation = document.querySelector(".navigation");
      const navigationUserDiv = document.createElement("div");
      navigationUserDiv.className = "accountInfo";
      const $accountMenu = document.createElement("a");
      $accountMenu.href = "userInfo.html";
      $accountMenu.textContent = "현재 로그인한 유저" + userUid;
      const $logOutBtn = document.createElement("a");
      $logOutBtn.href = "javascript:logOut()";
      $logOutBtn.textContent = "로그아웃";
      navigationUserDiv.append($accountMenu, $logOutBtn);
      $navigation.appendChild(navigationUserDiv);
      $rooms.append(...roomElements);
    }
  })
  .catch((err) => {
    console.error(err.message);
  });
