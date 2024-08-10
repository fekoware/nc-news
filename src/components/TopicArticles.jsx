import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchArticles } from "../api";
import { ArticlesCard } from "./ArticlesCard";
import { TopicsList } from "./TopicsList";

export const TopicArticles = () => {
  const { topicSlug } = useParams();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles().then((allArticles) => {
      const filteredArticles = allArticles.filter(
        (article) => article.topic === topicSlug
      );
      setArticles(filteredArticles);
    });
  }, [topicSlug]);

  return (
    <div>
      <TopicsList />
      <h1>Articles for {topicSlug}</h1>
      <ul>
        {articles.map((article) => (
          <ArticlesCard article={article} key={article.article_id} />
        ))}
      </ul>
    </div>
  );
};
