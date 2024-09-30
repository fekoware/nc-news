import { useState } from "react";
import { postComment } from "../api";

export const CommentForm = ({ article, username, comments, setComments }) => {
  const [commentInput, setCommentInput] = useState("");

  const handleCommentChange = (event) => {
    setCommentInput(event.target.value);
  };

  const handleInput = (event) => {
    event.target.style.height = 'auto'; 
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    postComment( username, commentInput, article.article_id)
      .then((data) => {
        setComments((currComments) => [data.comment, ...currComments]);
      })
      .catch((err) => {
        console.log(err);
      });
      
    setCommentInput("");
    event.target.style.height = 'auto'
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Comment Form</label>
      <textarea
  className="w-full border-2 border-red-500 resize-none overflow-hidden"
  onChange={handleCommentChange}
  value={commentInput}
  onInput={handleInput}
  rows="1"
/>
      <button type="submit">Post Comment</button>
    </form>
  );
};
