import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);

  // Lấy danh sách người dùng từ API
  useEffect(() => {
    axios
      .get("https://reimagined-spork-r46qwxqgvx5jhx5wj-5000.app.github.dev/api/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Lỗi khi tải danh sách:", error));
  }, []);

  return (
    <div className="p-4">
      <h2>Danh sách người dùng</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
