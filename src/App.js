import { API_END_POINT } from "./API.js";
const $rooms = document.querySelector('.roomlist'); 
const userUid = sessionStorage.getItem('UID');
axios.get(`${API_END_POINT}/user/${userUid}/groups/created`)
.then((response) => {
  const rooms = response.data;
  const roomElements = rooms.map((room) => {
    const roomElement = document.createElement('div');
    roomElement.className = 'room';
    roomElement.dataset.id = room.gid;
    roomElement.innerHTML = `
      <h3>${room.group_title}</h3>
      <p>${room.group_detail}</p>
      <p>by ${room.master_uid}</p>
      <p>참가자 수 : ${room.head_count}</p>
    
    `;
    roomElement.addEventListener('click', () =>{
      window.location.href = `room.html?id=${room.gid}`;
    });
    return roomElement;
  })

  $rooms.append(...roomElements)

})
.catch((err) => {
    console.error(err.message)
  })
