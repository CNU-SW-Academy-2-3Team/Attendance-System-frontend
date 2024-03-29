import "./App.css";
import { Navbar, FloatingBtn, UserBtn } from "./components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main, AddNewRoom, RoomList, RoomPage, Attendace, CodeGen } from "../src/pages";
import LoginPage from "./pages/Login/loginpage";
import { useEffect, useState } from "react";

function App() {
  let path = window.location.pathname;

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <UserBtn />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/groupCreateList" element={<RoomList kind="groupCreate" />}></Route>
          <Route path="/groupJoinList" element={<RoomList kind="groupJoin" />}></Route>
          <Route path="/room/:roomId" element={<RoomPage />}></Route>
          <Route path="/createGroup" element={<AddNewRoom kind="groupCreate" />}></Route>
          <Route path="/joinGroup" element={<AddNewRoom kind="groupJoin" />}></Route>
          <Route path="/room/codeGen/:roomId" element={<CodeGen />}></Route>
          <Route path="/room/attendance/:roomId" element={<Attendace />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="*" element={<div>404 NotFound</div>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
