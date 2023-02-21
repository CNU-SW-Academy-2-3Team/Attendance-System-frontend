const $groupCreate = document.querySelector('.room-create')


const groupCreateElements = document.createElement('form');

groupCreateElements.name = 'groupForm';
groupCreateElements.id = 'groupForm';

groupCreateElements.innerHTML = `
    <p>방 이름</p>
    <input type="text" id="groupName" class="input-line">
    <p>방 설명</p>
    <input type="text" id="groupDescription" class="input-line">
    <button type="button" id="groupCreateButton">모임 개설하기</button>

`;
$groupCreate.appendChild(groupCreateElements);


const $groupCreateButton = document.querySelector("#groupCreateButton");

$groupCreateButton.addEventListener('click',() => {
    const groupName = document.getElementById('groupName').value
    const groupDes = document.getElementById('groupDescription').value

    console.log(groupName);
    console.log(groupDes);

    if(groupName && groupDes){
        postgroupCreate(groupName,groupDes);
    }
    else{
        alert("정보를 전부입력해 주세요");
    }

})



function postgroupCreate(groupName,groupDes){
    axios.post('http://localhost:8080/api/group', 
        {
      
            'uid': 3,
            'group_title' : groupName,
            'group_detail' : groupDes
        }
    )
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });



}






