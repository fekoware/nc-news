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
import { Link } from "react-router-dom";

function App() {
  const [username, setUsername] = useState("jessjelly");
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetchUsers()
      .then((data) => {
        setUsers(data);
        data.map((user) => {
          if (username === user.username) {
            setUsername(user.username);
            setUser(user);
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
      <div class="grid grid-cols-2 gap-4 ">
        <div class="flex flex-wrap w-full">
          <Link to={"/"} > 
          <h2 class="font-bold p-4 text-xl "> Mayowa's News</h2>
          </Link>
        </div>

        <div class="flex flex-wrap w-full justify-end pr-4 items-center">
          <select class='w-auto'value={username} onChange={handleUserChange}>
            {users.map((user) => {
              return (
                <option value={user.username} key={user.username}>
                  {user.username}
                </option>
              );
            })}
          </select>

          <Link to={"/user-details"}>
            <button>
              <img className="w-10 h-10" src={user.avatar_url} />
            </button>
          </Link>
        </div>
      </div>

      <div class="flex flex-wrap w-full justify-end pr-4"></div>

      <div className="flex items-center justify-center w-full p-5 bg-red-500">
        <TopicsList />
      </div>

      <div className="flex text-center justify-center items-center">
        <Header user={user} username={username} setUsername={setUsername} />
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
