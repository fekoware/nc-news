import { useState } from "react";
import { useEffect } from "react";
import { fetchArticles } from "../api.js";
import { Link } from "react-router-dom";
import "../css/ArticlesList.css";
import { ArticlesCard } from "./ArticlesCard.jsx";

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
    articles && (
      <ul>
        {articles.map((article) => (
          <ArticlesCard article={article} key={article.article_id} />
        ))}
      </ul>
    )
  );
};
