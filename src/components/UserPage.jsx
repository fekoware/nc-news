import { fetchUsers } from "../api";
import { useState } from "react";
import { useEffect } from "react";

export const UserPage = ({ username, setUsername }) => {
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);


  console.log(username, "username");

  useEffect(() => {
    fetchUsers()
      .then((data) => {
        setIsLoading(false);
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
        setIsError(true);
      });
  }, [username]);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen space-y-4">
        <h1 className="text-xl font-bold">Loading User...</h1>
        <div className="w-16 h-16 border-8 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div class="flex flex-col justify-center items-center h-screen space-y-4">
        <h1 class="text-xl font-bold">
          Error loading users, refresh this page
        </h1>
      </div>
    );
  }


  return (

    <div className="grid grid-cols-1 pt-10 justify-items-center">
  <p class='text-3xl font-bold'>{user.name}</p>
  <p class='text-2xl font-bold'> {user.username}</p>
  <img class='flex w-1/5 h-auto pt-10' src={user.avatar_url} alt={`${user.name}'s avatar`} />
  </div>

  )
};
