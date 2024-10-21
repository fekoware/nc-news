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
      <div>



        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-wrap w-full">
            <Link to={"/"}>
              <h2 className="font-bold p-4 text-xl transition-colors duration-200 ease-in-out hover:underline cursor-pointer">
                Mayowa's News
              </h2>
            </Link>
          </div>

         

          <div className="flex flex-wrap w-full justify-end pr-4 items-center">
            <select
              className=" flex flex-wrap w-auto border-2 hover:underline border-gray-300 rounded-md p-2"
              value={username}
              onChange={handleUserChange}
            >
              {users.map((user) => (
                <option value={user.username} key={user.username}>
                  {user.username}
                </option>
              ))}
            </select>

            <Link to={"/user-details"}>
              <button className="flex flex-wrap ">
                <img
                  className="w-10 h-10 pl-2 rounded-full transition-transform duration-200 ease-in-out hover:scale-110 hover:opacity-80 cursor-pointer"
                  src={user.avatar_url}
                  alt="User Avatar"
                />
              </button>
            </Link>
          </div>

          


        </div>

        <div className="fixed bottom-0 left-0 right-0 flex p-4 flex-wrap items-center justify-end shadow-lg z-50">

            <Link to={"/add-article"}>
              <button className="bg-red-500 text-white font-semibold px-4 py-2 rounded-md transition-transform duration-200 ease-in-out hover:opacity-80">
                Add Article
              </button>
            </Link>
          </div>

        <div className="flex items-center justify-center w-full p-4 bg-red-500">
          <div class="grid grid-cols-1">
            <TopicsList />
          </div>
        </div>

        <div className="flex text-center justify-center items-center">
          <Header user={user} username={username} setUsername={setUsername} />
        </div>
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
