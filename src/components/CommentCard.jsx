import { deleteComment } from "../api";
import { useState } from "react";
import { updateCommentVotes } from "../api";

export const CommentCard = ({ username, comment, article_id }) => {
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

  const updateVote = (votes) => {
    console.log(article_id)
    console.log(comment.comment_id)

    console.log(votes, Number(article_id), comment.comment_id, "comment cardf");
    updateCommentVotes(votes, comment.comment_id).catch((err) => {
      console.log(votes, comment.comment_id, "inside function");

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
          <p class="flex w-full justify-end">{comment.votes} likes</p>

          <button
            class="bg-red-500 w-full text-white px-4 py-2  transition-opacity duration-200 ease-in-out hover:opacity-80 active:opacity-100"
            onClick={() => updateVote(1)}
          >
            Like Comment
          </button>

          <button
            class="bg-red-500 w-full text-white px-4 py-2  transition-opacity duration-200 ease-in-out hover:opacity-80 active:opacity-100"
            onClick={() => updateVote(-1)}
          >
            Dislike Comment
          </button>

          {username === comment.author && (
            <form>
              <button
                class="bg-red-500 w-full text-white px-4 py-2  transition-opacity duration-200 ease-in-out hover:opacity-80 active:opacity-100"
                type="submit"
                onClick={handleDelete}
              >
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
