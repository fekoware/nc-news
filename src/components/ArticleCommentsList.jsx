import { useParams } from "react-router-dom";
import { useState } from "react";
import { fetchCommentsByArticleId } from "../api";
import { useEffect } from "react";
import { CommentCard } from "./CommentCard";

export const ArticleCommentsList = ({ username, setUsername, comments, setComments}) => {
  const { article_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  
 

  useEffect(() => {
    fetchCommentsByArticleId(article_id).then((data) => {
      setComments(data);
      setIsLoading(false)
    }).catch((err) => {
      setIsLoading(false);
      console.log(err)
      setIsError(true)
    });
  }, [article_id, comments]);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center space-y-4">
        <h1 className="text-xl font-bold">Loading Comments...</h1>
        <div className="w-16 h-16 border-8 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div class="flex flex-col justify-center items-center h-screen space-y-4">
        <h1 class="text-xl font-bold">
          Error loading comments, refresh this page
        </h1>
      </div>
    );
  }

  return (
    comments && (
      <ul className="comments-list">
        {comments.map((comment) => (
          <CommentCard username={username} comment={comment} key={comment.comment_id} />
        ))}
      </ul>
    )
  );
};
