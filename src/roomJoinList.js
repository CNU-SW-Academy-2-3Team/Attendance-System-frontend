import { API_END_POINT } from "./API.js";
const $rooms = document.querySelector('.roomlist'); 
const userUid = sessionStorage.getItem('UID');
axios.get(`${API_END_POINT}/user/${userUid}/groups/joined`)
.then((response) => {
  const rooms = response.data;
  const roomElements = rooms.map((room) => {
    const roomElement = document.createElement('div');
    console.log(response)
    roomElement.className = 'room';
    roomElement.dataset.id = room.gid;
    
    roomElement.innerHTML = `
      <h3>${room.group_title}</h3>
      <p>${room.group_detail}</p>
      <span>by ${room.master_uid}</span>
      <!--<p>참가자 수 : ${room.head_count}</p>-->
    
    `;
    roomElement.addEventListener('click', () =>{
      window.location.href = `room.html?id=${room.gid}&guid=${room.guid}`;
    });
    return roomElement;
  })
  const $roomJoinButton = document.createElement('div')
  $roomJoinButton.className = 'roomAppendButton'
  $roomJoinButton.innerHTML =`<h3>새 그룹 참가하기</h3>`
  
  const $navigation = document.querySelector('.navigation')
  const navigationUserDiv = document.createElement('div')
  navigationUserDiv.className = 'accountInfo'
  const $accountMenu = document.createElement('a')
  $accountMenu.href = "#"
  $accountMenu.textContent = '현재 로그인한 유저' + userUid
  navigationUserDiv.appendChild($accountMenu)
  $navigation.appendChild(navigationUserDiv)
  $roomJoinButton.addEventListener('click', () => {
    openInviteCode()
  })
  $rooms.append(...roomElements)
  $rooms.append($roomJoinButton)

})
.catch((err) => {
    console.error(err.message)
  })