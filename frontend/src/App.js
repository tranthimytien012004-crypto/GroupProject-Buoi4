import React from "react";
import AddUser from "./components/AddUser";
import UserList from "./components/UserList";

function App() {
  return (
    <div className="App">
      <h1>Quản lý người dùng</h1>
      <AddUser />
      <UserList />
    </div>
  );
}

export default App;
