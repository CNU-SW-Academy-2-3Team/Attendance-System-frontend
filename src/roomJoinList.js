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
      <p>by ${room.master_uid}</p>
      <p>참가자 수 : ${room.head_count}</p>
    
    `;
    roomElement.addEventListener('click', () =>{
      window.location.href = `room.html?id=${room.gid}&guid=${room.guid}`;
    });
    return roomElement;
  })
  const $navigation = document.querySelector('.navigation')
  const navigationUser = document.createElement('div')
  navigationUser.textContent = '현재 로그인한 유저 ' + userUid
  $navigation.appendChild(navigationUser)
  $rooms.append(...roomElements)

})
.catch((err) => {
    console.error(err.message)
  })