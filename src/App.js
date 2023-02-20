const url = 'https://a247ba36-c96c-4c9c-8eb4-59be066afde6.mock.pstmn.io'
const $rooms = document.querySelector('.roomlist'); 
const roomList = axios.get("https://a247ba36-c96c-4c9c-8eb4-59be066afde6.mock.pstmn.io/roomlist");
roomList
.then((e) => {
  for(let i = 0; i < e.data.length; i++){
  $rooms.innerHTML +=  `
    <div class="room" data-id="${e.data[i].id}">
    <h3>${e.data[i].name}</h3>
    <p>${e.data[i].price}</p>
    </div>
    `
  }   
  
  }).then(() => {
    const roomsSelected = document.querySelectorAll('.room');
    for(let i =0; i< roomsSelected.length; i++){
      roomsSelected[i].addEventListener('click',() =>{

        window.location.href = `room.html?id=${roomsSelected[i].dataset.id}`
    })
  }

  })
  .catch((err) => {
      console.log(err.message)
    })




        
        
  
    
 
  
  
  
  