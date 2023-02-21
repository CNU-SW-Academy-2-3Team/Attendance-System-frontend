const url = new URL(window.location.href);
const roomId = url.searchParams.get('id');

const $roomInfo = document.querySelector('.roominfo');    
axios.get(`https://a247ba36-c96c-4c9c-8eb4-59be066afde6.mock.pstmn.io/roomlist/${roomId}`)
.then((response) => {
  const room = response.data;

  const roomElement = document.createElement('div');
  
  roomElement.className = 'room';
  roomElement.innerHTML = `
    <h3>${room.name}</h3>
    <p>${room.price}</p>
    <p>${room.seller}</p>
  
  `;
  $roomInfo.append(roomElement)    
    
  })
  .catch((err) => {
      console.log(err.message)
    })
