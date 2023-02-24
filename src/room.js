import { API_END_POINT } from "./API.js";
const url = new URL(window.location.href);
const roomId = url.searchParams.get('id');

const $roomInfo = document.querySelector('.roominfo');    
axios.get(`${API_END_POINT}/group/${roomId}`)
.then((response) => {
  const room = response.data;

  const roomElement = document.createElement('div');
  
  roomElement.className = 'room';
  roomElement.innerHTML = `
    <div id="roomTitle">
      <h3>${room.group_title}</h3>
    </div>
    <p>${room.group_detail}</p>
    <p>초대 코드 : ${room.invite_code}</p>
    <p>현재 출석 코드 : ${room.attendance_code ? room.attendance_code : '생성된 코드가 없습니다.'}</p>
    
  
  `;
  $roomInfo.append(roomElement)    
    
  })
  .catch((err) => {
      console.log(err.message)
    })
