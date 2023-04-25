const UserBtn = () => {
  const user3 = () => {
    sessionStorage.setItem("UID", "3");
    const userUid = sessionStorage.getItem("UID");
    window.location.reload();
  };
  const user5 = () => {
    sessionStorage.setItem("UID", "5");
    const userUid = sessionStorage.getItem("UID");
    window.location.reload();
  };
  const user7 = () => {
    sessionStorage.setItem("UID", "7");
    const userUid = sessionStorage.getItem("UID");
    window.location.reload();
  };

  return (
    <>
      <button type="button" onClick={user3}>
        유저3 로긴하기
      </button>
      <button type="button" onClick={user5}>
        유저5 로긴하기
      </button>
      <button type="button" onClick={user7}>
        유저7 로긴하기
      </button>
    </>
  );
};

export default UserBtn;
