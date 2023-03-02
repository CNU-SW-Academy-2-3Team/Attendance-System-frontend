
import { API_END_POINT } from "./API.js";
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
        postGroupCreate(groupName,groupDes);
    }
    else{
        alert("정보를 전부입력해 주세요");
    }

})



function postGroupCreate(groupName,groupDes){
    const userUid = Number(sessionStorage.getItem('UID'));
    let nowTime = new Date();
    console.log(nowTime)
    axios.post(`${API_END_POINT}/group`, 
        {
            
            'uid' : userUid,
            'group_title' : groupName,
            'group_detail' : groupDes,
            
            
        }
    )
    .then(function (response) {
        console.log(response);
        const inviteCode = response.data;
        alert(`그룹 개설이 완료되었습니다. 초대코드:${inviteCode}`)
        
       
        location.href='index.html'
        
    })
    .catch(function (error) {
        console.log(error);
    });
    

}






