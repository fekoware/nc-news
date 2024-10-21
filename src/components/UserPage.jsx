import { fetchUsers, fetchArticles } from "../api"; 
import { useState, useEffect } from "react";
import { ArticlesCard } from "./ArticlesCard.jsx"; 

export const UserPage = ({ username }) => {
  const [user, setUser] = useState({});
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetchUsers()
      .then((users) => {
        const foundUser = users.find((user) => user.username === username);
        if (foundUser) {
          setUser(foundUser);
          return fetchArticles();
        } else {
          throw new Error("User not found");
        }
      })
      .then((allArticles) => {
        const userArticles = allArticles.filter(
          (article) => article.author === username
        );
        setArticles(userArticles);
      })
      .catch((err) => {
        console.error(err);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [username]);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen space-y-4">
        <h1 className="text-xl font-bold">Loading User Details...</h1>
        <div className="w-16 h-16 border-8 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center h-screen space-y-4">
        <h1 className="text-xl font-bold">
          Error loading user data, refresh this page
        </h1>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 pt-10 justify-items-center">
      <p className="text-3xl font-bold">{user.name}</p>
      <p className="text-2xl font-bold">{user.username}</p>
      <img
        className="flex w-1/5 h-auto pt-10"
        src={user.avatar_url}
        alt={`${user.name}'s avatar`}
      />

      <h2 className="text-2xl font-bold pt-10">
        Articles Posted by {user.username}
      </h2>
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
  );
};
