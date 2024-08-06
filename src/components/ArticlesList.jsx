import { useState } from "react";
import { useEffect } from "react";
import { fetchArticles } from "../api.js";
import "../css/ArticlesList.css";

export const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTem] = useState("");
  const [topicTerm, setTopicTerm] = useState("");
  const [sortByTerm, setSortByTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchArticles()
      .then((data) => {
        setArticles(data);

        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (isLoading) {
    return <h2 className="loading"> Loading books ...</h2>;
  }

  return (
    <div>
      <h2> Articles Connected</h2>
      <ul>
        {articles.map((article) => (
          <li className="article" key={article.article_id}>
            <img src={article.article_img_url} />
            <p>{article.author}</p>
            <p>{article.title} </p>
            <p>{article.topic}</p>
            <p>{article.votes} likes </p>
            <p>{article.category} </p>
            <p>{article.created_at} </p>
            <p>{article.comment_count} comments </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
