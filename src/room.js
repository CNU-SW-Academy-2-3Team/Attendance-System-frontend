import { API_END_POINT } from "./API.js";
const url = new URL(window.location.href);
const roomId = url.searchParams.get('id');
const userUid = sessionStorage.getItem('UID')
const $roomInfo = document.querySelector('.roominfo');    
axios.get(`${API_END_POINT}/group/${roomId}`)
.then((response) => {
  const room = response.data;
  console.log(response.data)
  const roomElement = document.createElement('div');
  
  roomElement.className = 'roomInfoElement';
  
  

  if(room.master_uid === Number(userUid)){
    roomElement.innerHTML = `
      <div id="roomTitle">
        <h3>${room.group_title}</h3>
      </div>
      <p>${room.group_detail}</p>
      <p>인원 : ${room.head_count} 명</p>
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
      <p>인원 : ${room.head_count} 명</p>
      <button type="button" onclick="attend()">출석 체크 하기</button>
    `;

  }
  const $navigation = document.querySelector('.navigation')
  const navigationUserDiv = document.createElement('div')
  navigationUserDiv.className = 'accountInfo'
  const $accountMenu = document.createElement('a')
  $accountMenu.href = "userInfo.html"
  $accountMenu.textContent = '현재 로그인한 유저' + userUid
  navigationUserDiv.appendChild($accountMenu)
  $navigation.appendChild(navigationUserDiv)
  $roomInfo.append(roomElement)   

    
  })
  .catch((err) => {
      console.log(err.message)
    })
