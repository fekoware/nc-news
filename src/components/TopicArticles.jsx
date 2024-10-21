import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchArticles } from "../api";
import { ArticlesCard } from "./ArticlesCard";
import { useSearchParams } from "react-router-dom";

export const TopicArticles = ({username}) => {
  const { topicSlug } = useParams();
  const [articles, setArticles] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const sortBy = searchParams.get("sort_by") || "created_at";
    const order = searchParams.get("order") || "desc";

    fetchArticles({ sort_by: sortBy, order: order })
      .then((articles) => {
        const topicArticles = articles.filter(
          (article) => article.topic === topicSlug
        );
        setArticles(topicArticles);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsError(true);
      });
  }, [topicSlug, searchParams]);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen space-y-4">
        <h1 className="text-xl font-bold">Loading Articles...</h1>
        <div className="w-16 h-16 border-8 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center h-screen space-y-4">
        <h1 className="text-xl font-bold">
          Error loading articles, refresh the page
        </h1>
      </div>
    );
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
    articles && (
      <div className="w-full">
        
        <form className="flex items-center justify-center w-full py-4 px-2">
          <div className="px-4">
            <label className="font-semibold">Sort By: </label>
            <select
              className="border border-gray-300 px-2 py-1 rounded-lg hover:underline"
              value={searchParams.get("sort_by") || "created_at"}
              onChange={handleSortByChange}
            >
            <option value="" disabled hidden>Select One</option>
            <option value="created_at">Date</option>
              <option value="votes">Likes</option>
            </select>
          </div>

          <div className="px-4">
            <label className="font-semibold">Order: </label>
            <select
              className="border border-gray-300 px-2 py-1 rounded-lg hover:underline"
              value={searchParams.get("order") || "desc"}
              onChange={handleSortOrderChange}
            >
            <option value="" disabled hidden>Select One</option>
            <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </form>

        <div className="flex items-center justify-center">

          <ul className="grid grid-cols-1 gap-6 p-4">
            {articles.map((article) => (
              <li key={article.article_id} className="flex justify-stretch">
                <ArticlesCard username={username} article={article} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  );
};
