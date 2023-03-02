import { API_END_POINT } from "./API.js";
const url = new URL(window.location.href);
const roomId = url.searchParams.get('id');

const $roomInfo = document.querySelector('.roominfo');    
axios.get(`${API_END_POINT}/group/${roomId}`)
.then((response) => {
  const room = response.data;
  console.log(response.data)
  const roomElement = document.createElement('div');
  
  roomElement.className = 'roomInfoElement';
  
  

  if(room.master_uid === Number(sessionStorage.getItem('UID'))){
    roomElement.innerHTML = `
      <div id="roomTitle">
        <h3>${room.group_title}</h3>
      </div>
      <p>${room.group_detail}</p>
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
      <button type="button" onclick="attend()">출석 체크 하기</button>
    `;

  }
  const userUid = sessionStorage.getItem('UID')
  const $navigation = document.querySelector('.navigation')
  const navigationUser = document.createElement('div')
  navigationUser.textContent = '현재 로그인한 유저' + userUid
  $navigation.appendChild(navigationUser)
  $roomInfo.append(roomElement)   

    
  })
  .catch((err) => {
      console.log(err.message)
    })
