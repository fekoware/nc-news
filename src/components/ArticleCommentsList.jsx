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
    setIsLoading(true)
    fetchCommentsByArticleId(article_id).then((data) => {
      setComments(data);
    isLoading(false)
    }).catch((err) => {
      setIsLoading(false);
      console.log(err)
      setIsError(true)
    });
  }, [article_id, comments]);

  if (isLoading) {
    return <h2>Loading comments...</h2>
  }

  if(isError) {
    return <h2>Error loading comments, refresh page</h2>
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
