import { API_END_POINT } from "./API.js";
const url = new URL(window.location.href);
const roomId = url.searchParams.get('id');
const userUid = sessionStorage.getItem('UID')
const $roomInfo = document.querySelector('.roominfo');
axios.all( 
[axios.get(`${API_END_POINT}/group/${roomId}/${userUid}`), axios.get(`${API_END_POINT}/group/${roomId}/attendance`),
            axios.get(`${API_END_POINT}/group/${roomId}/count`)])
.then(axios.spread((response1, response2, count) => {
  
  const res1 = response1.data.groupInfo;
  const attendanceState = response1.data.attendanceState;
  const attendance_code = response2.data;
  const response = {...res1,attendance_code,attendanceState};
  console.log(response)
  const room = response;
  const roomElement = document.createElement('div');
  
  roomElement.className = 'roomInfoElement';
  if(room.leader_uid === Number(userUid)){
    roomElement.innerHTML = `
      <div id="roomTitle">
        <h3>${room.group_title}</h3>
      </div>
      <p>${room.group_detail}</p>
      <p>인원 : ${count.data} 명</p>
      <p>초대 코드 : ${room.invite_code}</p>
      <p>현재 출석 코드 : ${room.attendance_code ? room.attendance_code : '생성된 코드가 없습니다.'}</p>
      <button type="button" onclick="openTodaysCode()">출석 코드 생성하기</button>
  
    `;
  }else{
    roomElement.innerHTML = `
      <div id="roomTitle">
        <h3>${room.group_title}</h3>
      </div>
      <p>${room.group_detail}</p>
      <p>인원 : ${count.data} 명</p>
      <button type="button" onclick="attend()">출석 체크 하기</button>
    `;

  }
  const $navigation = document.querySelector('.navigation')
  const navigationUserDiv = document.createElement('div')
  navigationUserDiv.className = 'accountInfo'
  const $accountMenu = document.createElement('a')
  $accountMenu.href = "userInfo.html"
  $accountMenu.textContent = '현재 로그인한 유저' + userUid
  const $logOutBtn = document.createElement('a')
  $logOutBtn.href = 'javascript:logOut()';
  $logOutBtn.textContent = '로그아웃'
  navigationUserDiv.append($accountMenu, $logOutBtn)
  $navigation.appendChild(navigationUserDiv)
  $roomInfo.append(roomElement)   

    
  }))
  .catch((err) => {
      console.log(err.message)
    })
