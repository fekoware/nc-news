import { fetchUsers } from "../api";
import { postComment } from "../api";

import { useState } from "react";
import { useEffect } from "react";

export const Users = ({ article, comments, setComments }) => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
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

   

    postComment(article.article_id, username, commentInput)
      .then((data) => {

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
    <div>
      <form onSubmit={handleSubmit}>
        <label> Choose User:</label>
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

        <label> Comment Form</label>
        <input
          type="text"
          onChange={handleCommentChange}
          value={commentInput}
        ></input>
        <button type="submit">Post Comment</button>
      </form>
    </div>
  );
};
