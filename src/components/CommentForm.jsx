import { useState } from "react";
import { postComment } from "../api";

export const CommentForm = ({ article, setUsername, username, comments, setComments }) => {
  const [commentInput, setCommentInput] = useState("");

  const handleCommentChange = (event) => {
    setCommentInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    postComment(article.article_id, username, commentInput)
      .then((data) => {
        setComments((currComments) => [data.comment, ...currComments]);
      })
      .catch((err) => {
        console.log(err);
      });
      
    setCommentInput("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Comment Form</label>
      <input
        type="text"
        onChange={handleCommentChange}
        value={commentInput}
      />
      <button type="submit">Post Comment</button>
    </form>
  );
};
