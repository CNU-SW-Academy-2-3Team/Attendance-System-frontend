const userUid = sessionStorage.getItem('UID')
const $navigation = document.querySelector('.navigation')
const navigationUserDiv = document.createElement('div')
navigationUserDiv.className = 'accountInfo'
const $accountMenu = document.createElement('a')
$accountMenu.href = "userInfo.html"
$accountMenu.textContent = '현재 로그인한 유저' + userUid
const $logOutBtn = document.createElement('a')
$logOutBtn.href = 'javascript:logOut()';
$logOutBtn.textContent = '로그아웃'
navigationUserDiv.append($accountMenu, $logOutBtn)
$navigation.appendChild(navigationUserDiv)

