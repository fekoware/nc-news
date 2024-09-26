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
  const [isError, setIsError] = useState(false);

  useEffect(() => {
  setIsLoading(true)
    const sortBy = searchParams.get("sort_by") || "created_at";
    const order = searchParams.get("order") || "desc";


    fetchArticles({   sort_by: sortBy, order: order })
      .then((articles) => {
        
        let topicArticles = []
        articles.forEach((article) => {
          if (article.topic === topicSlug) {
            topicArticles.push(article)
          } 
        })
        setArticles(topicArticles);
        setIsLoading(false)

      })
      .catch((err) => {

        console.log(err)
        setIsError(true)
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
      <div class="flex flex-col justify-center items-center h-screen space-y-4">
        <h1 class="text-xl font-bold">
          Error loading articles, refresh this page
        </h1>
      </div>
    );
  }

  const handleSortByChange = (event) => {
    const sortBy = event.target.value;
    console.log(sortBy);
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
        <div className="flex flex-wrap items-center justify-center w-full p-5 bg-red-500">
          <TopicsList />
        </div>
  
        <form className="flex flex-wrap items-center justify-center w-full p-5">
          <div className="px-4">
            <label>Sort By: </label>
            <select
              className="hover:underline"
              value={searchParams.get("sort_by") || "created_at"}
              onChange={handleSortByChange}
            >
              <option>Select One</option>
              <option value="created_at">Date</option>
              <option value="votes">Likes</option>
            </select>
          </div>
  
          <div className="px-4">
            <label>Order: </label>
            <select
              className="hover:underline"
              value={searchParams.get("order") || "desc"}
              onChange={handleSortOrderChange}
            >
              <option>Select One</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </form>
  
        <div className="flex items-center justify-center">
          <ul className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 h-1/6 gap-4">
            {articles.map((article) => (
              <li key={article.article_id} className="flex justify-stretch">
                <div className="flex flex-col">
                  <ArticlesCard article={article} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  );
}  









/*

sorting articles by queries
  "author",
  "topic",
  "sort_by",
  "order"

order by ascending or descending

  components
  Articles List
    states = queryParam, setQueryParam
    searchParams

  props

  input

  process

  output

  there will be a dropdown list of options to sort by with default of ascending
  when a choice is pressed, onclick will handle the change to sort by the choice
  useeffect will have the handlechange function inside

  handleChange will sort the articles by the order and 



*/
