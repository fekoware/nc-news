import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { fetchArticleById, updateVotesByArticleId } from "../api";
import { Link } from "react-router-dom";
import { ArticleCommentsList } from "./ArticleCommentsList";
import "../css/SingleArticle.css";
import { Users } from "./Users";

export const SingleArticle = () => {
  const { article_id, topicSlug } = useParams();
  const [article, setArticle] = useState("");
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    fetchArticleById(article_id).then((data) => {
      setArticle(data);
    });
  }, [article_id]);

  const incrementCount = (increment) => {
    setCount((currCount) => {
      setError(null);

      return currCount + increment;
    });
    updateVotesByArticleId(article.article_id, increment).catch((err) => {
      //if unable to increment
      setCount((currCount) => {
        setError("Like unsuccesful, try again");
        return currCount - increment;
      });
    });
  };

  return (
    <>
      <Link to={`/articles/${topicSlug}`}>Go Back</Link>

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

      <Users
        username={username}
        setUsername={setUsername}
        article={article}
        key={article.article_id}
        comments={comments}
        setComments={setComments}
      />
      <ArticleCommentsList
        username={username}
        setUsername={setUsername}
        comments={comments}
        setComments={setComments}
      />

      <p> View other articles - links of other articles to be placed here</p>
    </>
  );
};
