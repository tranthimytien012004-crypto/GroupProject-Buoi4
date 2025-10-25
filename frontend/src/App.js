// Code từ frontend
import React, { useState } from "react";
import AddUser from "./components/AddUser";
import UserList from "./components/UserList";
// Code từ backend
function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="App" style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1> 📋 Quản lý người dùng</h1>
      <AddUser onUserAdded={() => setRefresh(!refresh)} />
      <UserList key={refresh} />
    </div>
  );
}

export default App;
