import "../css/CommentCard.css";
import { deleteComment } from "../api";
import { useState } from "react";

export const CommentCard = ({ username, comment }) => {
  let commentID;
  const [isDeleted, setIsDeleted] = useState(false);


  /*

        if username and comment authour match, display button
        */

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
    <div className="comment-card">
      {!isDeleted ? (
        <>
          <p>{comment.author}</p>
          <p>{comment.body}</p>
          <p>{comment.votes}</p>
          {username === comment.author && (
            <form>
              <button type="submit" onClick={handleDelete}>
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
