import { fetchUsers } from "../api";
import { useState } from "react";
import { useEffect } from "react";

export const UserPage = ({ username, setUsername }) => {
  const [user, setUser] = useState([]);
  console.log(username, "username");

  useEffect(() => {
    fetchUsers()
      .then((data) => {
        console.log(data);
        data.map((user) => {
          if (username === user.username) {
            console.log(user);

            setUser(user);
            return (
                <img src={user.avatar_url} alt={`${user.name}'s avatar`} />
            )
          }
        });
      })
      .catch((err) => {
        console.log(err, "an error");
      });
  }, [username]);

  //fetch all users

  // iterate through users. if username selected matches
  // the user, display the user details in the database
  console.log(user.name, "hello");
  return <img src={user.avatar_url} alt={`${user.name}'s avatar`} />
};
