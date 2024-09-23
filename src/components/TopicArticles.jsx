import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchArticles } from "../api";
import { ArticlesCard } from "./ArticlesCard";
import { TopicsList } from "./TopicsList";
import { useSearchParams } from "react-router-dom";

export const TopicArticles = () => {
  const { topicSlug } = useParams();
  const [articles, setArticles] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sortBy = searchParams.get("sort_by") || "created_at"; 
    const order = searchParams.get("order") || "desc"; 

    fetchArticles({ sort_by: sortBy, order: order}).then((allArticles) => {
      const filteredArticles = allArticles.filter(
        (article) => article.topic === topicSlug
      );
      setArticles(filteredArticles);
      setIsLoading(false);
    }).catch((err) => {
        console.log(err)
        setIsLoading(false);
    });
  }, [topicSlug, searchParams]);

  if (isLoading) {
    return <h2 className="loading"> Loading articles ...</h2>;
  }


  const handleSortByChange = (event) => {
    const sortBy = event.target.value;
    setSearchParams({
      sort_by: sortBy,
      order: searchParams.get("order") || "desc",
    });
    
  };

  const handleSortOrderChange = (event) => {
    const order = event.target.value;
    setSearchParams({
      sort_by: searchParams.get("sort_by") || "created_at",
      order: order,
    });
  };

  return (
    <div>
        <form>
          <label>Sort By: </label>
          <select
            value={searchParams.get("sort_by") || "created_at"}
            onChange={handleSortByChange}
          >
            <option>Select One</option>
            <option value="created_at">Date</option>

            <option value="votes">Votes</option>
            <option></option>
          </select>

          <label>Order: </label>
          <select
            value={searchParams.get("order") || "desc"}
            onChange={handleSortOrderChange}
          >
            <option>Select One</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </form>
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
