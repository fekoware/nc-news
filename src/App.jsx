import { useState } from "react";
import { Header } from "./components/Header";
import { ArticlesList } from "./components/ArticlesList";
import { Routes, Route } from "react-router-dom";
import { SingleArticle } from "./components/SingleArticle";
import { TopicArticles } from "./components/TopicArticles";
import { ErrorPage } from "./components/ErrorPage";
import { TopicListPage } from "./components/TopicListPage";
import { AddArticlePage } from "./components/AddArticlePage";
import { Users } from "./components/Users";
import { UserPage } from "./components/UserPage";
import { useEffect } from "react";
import { fetchUsers } from "./api";
import { TopicsList } from "./components/TopicsList";

function App() {
  const [username, setUsername] = useState("jessjelly");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers()
      .then((data) => {
        console.log(data, "data fetched")
        setUsers(data);
        data.map((user) => {
          console.log(user.username, "should be a single user")
          console.log(username, "user logged in")
          if (username === user.username) {
            setUsername(user.username);
          }
        });
      })
      .catch((err) => {
        console.log(err, "an error");
      });
  }, [username]);

  const handleUserChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <>
      <div class="py-4">
        <label class="font-bold"> Choose A User:</label>

        <select value={username} onChange={handleUserChange}>
          {users.map((user) => {
            return (
              <option value={user.username} key={user.username}>
                {user.username}
              </option>
            );
          })}
        </select>
        <br></br>
      </div>

      <div className="flex text-center justify-center items-center">
        <Header username={username} setUsername={setUsername} />
      </div>

      <div className="flex items-center justify-center w-full p-5 bg-red-500">
        <TopicsList />
      </div>
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<ArticlesList username={username} />} />
        <Route
          path="/articles"
          element={<ArticlesList username={username} />}
        />
        <Route
          path="/articles/:topicSlug"
          element={<TopicArticles username={username} />}
        />
        <Route
          path="/articles/:topicSlug/:article_id"
          element={<SingleArticle username={username} />}
        />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/topics" element={<TopicListPage />} />
        <Route
          path="/add-article"
          element={<AddArticlePage username={username} />}
        />
        <Route
          path="/user-details"
          element={<UserPage username={username} setUsername={setUsername} />}
        />
      </Routes>
    </>
  );
}

export default App;
