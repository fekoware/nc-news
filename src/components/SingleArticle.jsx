import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { fetchArticleById, updateVotesByArticleId } from "../api";
import { Link } from "react-router-dom";
import { ArticleCommentsList } from "./ArticleCommentsList";
import "../css/SingleArticle.css";

export const SingleArticle = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState("");
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticleById(article_id).then((data) => {
      setArticle(data);
    });
  }, [article_id]);

  const incrementCount = (increment) => {
    setCount((currCount) => {
      currCount = 0;
      const newCount = currCount + increment;
      setError(null);
      updateVotesByArticleId(article.article_id, newCount).catch((err) => {
        //if unable to increment
        setCount((currCount) => {
          currCount - increment;
          setError("Like unsuccesful, try again");
        });
      });
      return newCount;
    });
  };

  return (
    <>
      <Link to="/">Go Back</Link>
      <img src={article.article_img_url} />
      <p>{article.author}</p>
      <p>{article.topic}</p>
      <p>{article.votes + count} likes </p>
      <div>
        <button onClick={() => incrementCount(1)}>Like Article</button>
        <button onClick={() => incrementCount(-1)}>Remove Like</button>
        {error ? <p>{error}</p> : null}
      </div>

      <p>{article.category} </p>
      <p>{article.created_at} </p>
      <p>{article.comment_count} comments </p>
      <p>{article.title} </p>
      <p>{article.body} </p>
      <ArticleCommentsList />

      <p> View other articles - links of other articles to be placed here</p>
    </>
  );
};
