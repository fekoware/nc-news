
import { Header } from "./components/Header";
import { ArticlesList } from "./components/ArticlesList";
import { Routes, Route } from "react-router-dom"
import { SingleArticle } from "./components/SingleArticle";
import { ArticlesCard } from "./components/ArticlesCard";
import { Users } from "./components/Users";
import { TopicArticles } from "./components/TopicArticles";
import { ErrorPage } from "./components/ErrorPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/users' element={<Users />}/>
        <Route path='/' element={<ArticlesList/>}/>
        <Route path='/articles' element={<ArticlesList/>}/>
        <Route path="/articles/:topicSlug" element={<TopicArticles />} />
        <Route path='/articles/:topicSlug/:article_id' element={<SingleArticle/>} />
        <Route path='*' element={<ErrorPage/>}></Route>
      </Routes>
    </>
  );
}

export default App;
