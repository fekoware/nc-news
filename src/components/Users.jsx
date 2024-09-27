import { fetchUsers } from "../api";
import { postComment } from "../api";

import { useState } from "react";
import { useEffect } from "react";

export const Users = ({
  username,
  setUsername,
  article,
  comments,
  setComments,
}) => {
  const [users, setUsers] = useState([]);
  const [commentPost, setCommentPost] = useState("");
  const [commentInput, setCommentInput] = useState("");

  useEffect(() => {
    fetchUsers()
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log(err, "an error");
      });
  }, [commentPost, username]);

  const handleUserChange = (event) => {
    setUsername(event.target.value);
  };

  const handleCommentChange = (event) => {
    setCommentInput(event.target.value);
    setCommentPost(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    postComment(username, commentInput, article.article_id)
      .then((data) => {
        console.log(data);
        return setComments((currComments) => {
          return [data.comment, ...currComments];
        });
      })
      .catch((err) => {
        console.log(err);
      });
    setCommentInput("");
  };

  return (
    <div class='py-4'>
      <form onSubmit={handleSubmit}>
      <div></div>
        <label class='font-bold'> Choose A User:</label>

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

        <label class="py-2"> Post A Comment as {username}</label>
        <input
       class="w-full border-2 border-green-300 focus:border-green-800 hover:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none transition ease-in-out duration-300 pl-2"
       type="text"
       onChange={handleCommentChange}
       value={commentInput}
        >
          
        </input>
        <button
          class=" w-full bg-green-700  text-white px-4 py-2  transition-opacity duration-200 ease-in-out hover:opacity-80 active:opacity-100 my-2"
          type="submit"
        >
          Post Comment
        </button>
      </form>
    </div>
  );
};
