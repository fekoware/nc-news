import { useParams } from "react-router-dom";
import { useState } from "react";
import { fetchCommentsByArticleId } from "../api";
import { useEffect } from "react";
import { CommentCard } from "./CommentCard";

export const ArticleCommentsList = ({comments, setComments}) => {
  const { article_id } = useParams();
 

  useEffect(() => {
    fetchCommentsByArticleId(article_id).then((data) => {
      setComments(data);
    });
  }, [article_id]);

  return (
    comments && (
      <ul className="comments-list">
        {comments.map((comment) => (
          <CommentCard comment={comment} key={comment.comment_id} />
        ))}
      </ul>
    )
  );
};
