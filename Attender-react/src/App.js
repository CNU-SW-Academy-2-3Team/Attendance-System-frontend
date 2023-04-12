import "./App.css";
import Navbar from "./components/Navbar/navBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main/main";
import RoomList from "./components/RoomList/roomList";
import RoomPage from "./components/Room/room";
import AddNewRoom from "./components/NewRoom/newRoom";
import CodeGen from "./components/Room/codeGen";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route
            path="/groupCreateList"
            element={<RoomList kind="groupCreate" />}
          ></Route>
          <Route
            path="/groupJoinList"
            element={<RoomList kind="groupJoin" />}
          ></Route>
          <Route path="/room/:roomId" element={<RoomPage />}></Route>
          <Route
            path="/createGroup"
            element={<AddNewRoom kind="groupCreate" />}
          ></Route>
          <Route
            path="/joinGroup"
            element={<AddNewRoom kind="groupJoin" />}
          ></Route>
          <Route path="/room/codeGen/:rooId" element={<CodeGen />}></Route>
          <Route path="*" element={<div>404 NotFound</div>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
