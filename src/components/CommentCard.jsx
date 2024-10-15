import { deleteComment } from "../api";
import { useState } from "react";
import { updateCommentVotes } from "../api";
import { formatDistanceToNow } from "date-fns";

export const CommentCard = ({ username, comment, article_id }) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = (event, commentID) => {
    event.preventDefault();
    commentID = comment.comment_id;
    deleteComment(commentID)
      .then(() => {
        setIsDeleted(true);
        setTimeout(() => setIsDeleted(false), 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateVote = (votes) => {
    updateCommentVotes(votes, comment.comment_id).catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className="w-full my-4 p-4 bg-white rounded-md shadow-sm border border-gray-200">
      {!isDeleted ? (
        <>
          <div className="border-b-2 border-gray-300 mb-4"></div>
          <div className="mb-2">
            <p className="font-bold text-lg text-gray-900">{comment.author}</p>
            <p className="text-gray-700">{comment.body}</p>
          </div>

          <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
            <p>{formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}</p>
            {username === comment.author && (
              <form>
                <button
                  className="bg-red-500 text-white font-semibold px-4 py-2 rounded-md transition-opacity duration-200 ease-in-out hover:opacity-80 active:opacity-100"
                  type="submit"
                  onClick={handleDelete}
                >
                  Delete Comment
                </button>
              </form>
            )}
          </div>
        </>
      ) : (
        <>
          <p className="text-gray-500 italic">Comment has been deleted.</p>
        </>
      )}
    </div>
  );
};
