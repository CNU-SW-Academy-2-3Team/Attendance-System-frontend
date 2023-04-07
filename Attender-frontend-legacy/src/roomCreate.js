import { API_END_POINT } from "./API.js";
const $groupCreate = document.querySelector(".roomCreate");

const groupCreateElements = document.createElement("form");

groupCreateElements.name = "groupForm";
groupCreateElements.id = "groupForm";

groupCreateElements.innerHTML = `
<b><font size="14" color="gray">새로운 그룹 생성하기</font></b>
    <br><br>
    <input type="text" placeholder="그룹 이름"id="groupName" class="input-line" style="width:200px; height:35px">
    <br><br>
    <input type="text" placeholder="그룹 설명"id="groupDescription" class="input-line" style="width:200px; height:35px">
    <br><br>
    <button type="button" id="groupCreateButton">그룹 개설하기</button>
    <button type="button" onclick="history.back()">돌아가기</button>

`;
$groupCreate.appendChild(groupCreateElements);

const $groupCreateButton = document.querySelector("#groupCreateButton");

$groupCreateButton.addEventListener("click", () => {
  const groupName = document.getElementById("groupName").value;
  const groupDes = document.getElementById("groupDescription").value;

  console.log(groupName);
  console.log(groupDes);

  if (groupName && groupDes) {
    postGroupCreate(groupName, groupDes);
  } else {
    alert("정보를 전부입력해 주세요");
  }
});

function postGroupCreate(groupName, groupDes) {
  const userUid = Number(sessionStorage.getItem("UID"));
  let nowTime = new Date();
  console.log(nowTime);
  axios
    .post(`${API_END_POINT}/group`, {
      uid: userUid,
      group_title: groupName,
      group_detail: groupDes,
    })
    .then(function (response) {
      console.log(response);
      const inviteCode = response.data;
      alert(`그룹 개설이 완료되었습니다. 초대코드:${inviteCode}`);

      location.href = "roomCreateList.html";
    })
    .catch(function (error) {
      console.log(error);
    });
}
