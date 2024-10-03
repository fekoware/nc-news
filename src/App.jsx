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

function App() {
  const [username, setUsername] = useState("jessjelly"); // Lifted username state

  return (
    <>
      <div className="flex text-center justify-center items-center">
        <Header username={username} setUsername={setUsername} /> {/* Pass username to Header */}
      </div>
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<ArticlesList />} />
        <Route path="/articles" element={<ArticlesList />} />
        <Route path="/articles/:topicSlug" element={<TopicArticles />} />
        <Route path="/articles/:topicSlug/:article_id" element={<SingleArticle />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/topics" element={<TopicListPage />} />
        <Route path="/add-article" element={<AddArticlePage username={username} />} /> {/* Pass username to AddArticlePage */}
      </Routes>
    </>
  );
}

export default App;
