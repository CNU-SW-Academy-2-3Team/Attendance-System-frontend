const url = 'https://a247ba36-c96c-4c9c-8eb4-59be066afde6.mock.pstmn.io'
const $rooms = document.querySelector('.roomlist'); 
axios.get("https://a247ba36-c96c-4c9c-8eb4-59be066afde6.mock.pstmn.io/roomlist")
.then((response) => {
  const rooms = response.data;
  const roomElements = rooms.map((room) => {
    const roomElement = document.createElement('div');
    roomElement.className = 'room';
    roomElement.dataset.id = room.id;
    roomElement.innerHTML = `
      <h3>${room.name}</h3>
      <p>${room.price}</p>
    
    `;
    roomElement.addEventListener('click', () =>{
      window.location.href = `room.html?id=${room.id}`;
    });
    return roomElement;
  })

  $rooms.append(...roomElements)


axios.post('http://localhost:8080/api/group', 
    {
      
      'uid': 3,
      'group_title' : 'test',
      'group_detail' : 'testset'
    }
  )
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
