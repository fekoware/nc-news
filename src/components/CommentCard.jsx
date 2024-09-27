
import { deleteComment } from "../api";
import { useState } from "react";

export const CommentCard = ({ username, comment }) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = (event, commentID) => {
    event.preventDefault();
    commentID = comment.comment_id;
    deleteComment(commentID)
      .then((data) => {
        setIsDeleted(true);
        setTimeout(() => setIsDeleted(false), 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="comment-card py-2">
      {!isDeleted ? (
        <>
          <p className="font-bold">{comment.author}</p>
          <p>{comment.body}</p>
          <p>{comment.created_at}</p>
          <p class='flex w-full justify-end'>{comment.votes} likes</p>
          {username === comment.author && (
            <form>
              <button class="bg-red-500 w-full text-white px-4 py-2  transition-opacity duration-200 ease-in-out hover:opacity-80 active:opacity-100" type="submit" onClick={handleDelete}>
                Delete Comment
              </button>
            </form>
          )}
        </>
      ) : (
        <>
          <p>Comment has been deleted.</p>
        </>
      )}
    </div>
  );
};
