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
  const { topicSlug } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const sortBy = searchParams.get("sort_by") || "created_at";
    const order = searchParams.get("order") || "desc";

    fetchArticles({ sort_by: sortBy, order: order })
      .then((articles) => {
        setArticles(articles);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      });
  }, [topicSlug, searchParams]);

  if (isLoading) {
    return <h2 className="loading"> Loading articles ...</h2>;
  }

  if (isError) {
    return <h2> Error loading articles, refresh the page</h2>
  }

  const handleSortByChange = (event) => {
    const sortBy = event.target.value;
    console.log(sortBy, "sort by handle");
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
      <div>
        
      <div class='flex w-screen bg-red-500'> 
        <TopicsList />
        </div>

        <form>
          <label>Sort By: </label>
          <select
            value={searchParams.get("sort_by") || "created_at"}
            onChange={handleSortByChange}
          >
            <option>Select One</option>
            <option value="created_at">Date</option>
            <option value="votes">Votes</option>
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






        <ul>
          {articles.map((article) => {
            return <ArticlesCard article={article} key={article.article_id} />;
          })}
        </ul>



      </div>
      
    )
  );
};

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
