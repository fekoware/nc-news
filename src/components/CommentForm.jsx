import { useState } from "react";
import { postComment } from "../api";

export const CommentForm = ({ article, username, comments, setComments }) => {
  const [commentInput, setCommentInput] = useState("");

  const handleCommentChange = (event) => {
    setCommentInput(event.target.value);
  };

  const handleInput = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    postComment(username, commentInput, article.article_id)
      .then((data) => {
        setComments((currComments) => [data.comment, ...currComments]);
      })
      .catch((err) => {
        console.log(err);
      });

    setCommentInput("");
    event.target.style.height = "auto";
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <label className="w-full font-bold text-lg mb-2 block">
        Leave a Comment
      </label>
      <textarea
        className="w-full border-2 border-blue-500 resize-none overflow-hidden p-2 mb-4 rounded-lg"
        onChange={handleCommentChange}
        value={commentInput}
        onInput={handleInput}
        rows="1"
        placeholder="What do you think?"
      />
      <button
        type="submit"
        className="bg-blue-500 w-full text-white font-semibold px-4 py-2 rounded-md transition-opacity duration-200 ease-in-out hover:opacity-80 active:opacity-100"
      >
        Post Comment
      </button>
    </form>
  );
};
