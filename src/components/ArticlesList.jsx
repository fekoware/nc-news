import { useState } from "react";
import { useEffect } from "react";
import { fetchArticles } from "../api.js";
import { Link, useSearchParams } from "react-router-dom";
import "../css/ArticlesList.css";
import { ArticlesCard } from "./ArticlesCard.jsx";
import { Users } from "./Users.jsx";
import { TopicsList } from "./TopicsList.jsx";
import { useParams } from "react-router-dom";

export const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
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
  }, [topicSlug, searchParams]);

  if (isLoading) {
    return <h2 className="loading"> Loading articles ...</h2>;
  }

  return (
    articles && (
      <div>
        <TopicsList />

        <ul>
          {articles.map((article) => (
            <ArticlesCard article={article} key={article.article_id} />
          ))}
        </ul>
      </div>
    )
  );
};
