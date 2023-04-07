import { API_END_POINT } from "./API.js";
const url = new URL(window.location.href);
const roomId = url.searchParams.get("id");
const userUid = sessionStorage.getItem("UID");
const $roomInfo = document.querySelector(".roominfo");
axios
  .all([axios.get(`${API_END_POINT}/group/${roomId}/${userUid}`), axios.get(`${API_END_POINT}/group/${roomId}/attendance`), axios.get(`${API_END_POINT}/group/${roomId}/count`)])
  .then(
    axios.spread((response1, response2, count) => {
      const res1 = response1.data.groupInfo;
      const attendanceState = response1.data.attendanceState;
      const attendance_code = response2.data;
      const response = { ...res1, attendance_code, attendanceState };
      console.log(response);
      const room = response;
      const roomElement = document.createElement("div");

      roomElement.className = "roomInfoElement";
      if (room.leader_uid === Number(userUid)) {
        roomElement.innerHTML = `
      <div id="roomTitle">
        <h3>${room.group_title}</h3>
      </div>
      <p>${room.group_detail}</p>
      <p>인원 : ${count.data ? count.data : "0"} 명</p>
      <p>초대 코드 : <span style="cursor:pointer;" class="inviteCode">${room.invite_code}</span><span style="cursor:pointer;" class="inviteCodeHide">초대코드 확인하기</span></p>
      <p>현재 출석 코드 : <span style="cursor:pointer;" class="attendCode">${
        room.attendance_code ? room.attendance_code : "생성된 코드가 없습니다."
      }</span><span style="cursor:pointer;" class="attendCodeHide">출석코드 확인하기</span></p>
      <button type="button" onclick="openTodaysCode()">출석 코드 생성하기</button>
  
    `;
      } else {
        if (room.attendanceState === "NO" && room.cid === null) {
          roomElement.innerHTML = `
      <div id="roomTitle">
        <h3>${room.group_title}</h3>
      </div>
      <p>${room.group_detail}</p>
      <p>인원 : ${count.data} 명</p>
      <p>현재 상태 : <span style="color:gray;">미출결</span> </p>
      <button style="background-color:gray;"type="button" onclick="">현재 활성화된 코드가 없습니다.</button>
    `;
        } else if (room.attendanceState === "NO") {
          roomElement.innerHTML = `
      <div id="roomTitle">
        <h3>${room.group_title}</h3>
      </div>
      <p>${room.group_detail}</p>
      <p>인원 : ${count.data} 명</p>
      <p>현재 상태 : <span style="color:gray;">미출결</span> </p>
      <button type="button" onclick="attend()">출석 체크 하기</button>
    `;
        } else if (room.attendanceState === "Enter") {
          roomElement.innerHTML = `
      <div id="roomTitle">
        <h3>${room.group_title}</h3>
      </div>
      <p>${room.group_detail}</p>
      <p>인원 : ${count.data} 명</p>
      <p>현재 상태 : <span style="color:#2BAE66;">출석 완료</span></p>
      <button style = "background-color: red;"type="button" onclick="leave()">퇴실 하기</button>
    `;
        } else if (room.attendanceState === "Exit") {
          roomElement.innerHTML = `
      <div id="roomTitle">
        <h3>${room.group_title}</h3>
      </div>
      <p>${room.group_detail}</p>
      <p>인원 : ${count.data} 명</p>
      <p>현재 상태 : 퇴실 완료 </p>
      <button style="background-color:gray;"type="button" onclick="">퇴실 중...</button>
    `;
        }
      }
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
      $roomInfo.append(roomElement);

      const attendHide = document.querySelector(".attendCodeHide");
      const attendHideCode = document.querySelector(".attendCode");
      attendHide.addEventListener("click", (e) => {
        e.target.style.display = "none";
        attendHideCode.style.display = "inline";
      });
      attendHideCode.addEventListener("click", (e) => {
        navigator.clipboard.writeText(e.target.textContent).then(() => {
          alert("출석 코드가 복사되었습니다.");
        });
      });
      const inviteHide = document.querySelector(".inviteCodeHide");
      const inviteHideCode = document.querySelector(".inviteCode");
      inviteHide.addEventListener("click", (e) => {
        e.target.style.display = "none";
        inviteHideCode.style.display = "inline";
      });
      inviteHideCode.addEventListener("click", (e) => {
        navigator.clipboard.writeText(e.target.textContent).then(() => {
          alert("초대 코드가 복사되었습니다.");
        });
      });
    })
  )
  .catch((err) => {
    console.log(err.message);
  });
