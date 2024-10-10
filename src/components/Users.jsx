import { fetchUsers } from "../api";
import { postComment } from "../api";

import { useState } from "react";
import { useEffect } from "react";

export const Users = ({ username, setUsername }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers()
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log(err, "an error");
      });
  }, [username]);

  const handleUserChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <div class="py-4">
      <label class="font-bold"> Choose A User:</label>

      <select value={username} onChange={handleUserChange}>
        {users.map((user) => {
          return (
            <option value={user.username} key={user.username}>
              {user.username}
            </option>
          );
        })}
      </select>
      <br></br>
    </div>
  );
};
