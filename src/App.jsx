
import { Header } from "./components/Header";
import { ArticlesList } from "./components/ArticlesList";
import { Routes, Route } from "react-router-dom"
import { SingleArticle } from "./components/SingleArticle";
import { ArticlesCard } from "./components/ArticlesCard";
import { Users } from "./components/Users";
import { TopicArticles } from "./components/TopicArticles";
import { ErrorPage } from "./components/ErrorPage";
import { TopicListPage } from "./components/TopicListPage";
import { AddArticlePage } from "./components/AddArticlePage";

function App() {
  return (
    <>
    <div className='flex text-center justify-center items-center'> 
      <Header />
      </div>
      <Routes>
        <Route path='/users' element={<Users />}/>
        <Route path='/' element={<ArticlesList/>}/>
        <Route path='/articles' element={<ArticlesList/>}/>
        <Route path="/articles/:topicSlug" element={<TopicArticles />} />
        <Route path='/articles/:topicSlug/:article_id' element={<SingleArticle/>} />
        <Route path='*' element={<ErrorPage/>}></Route>
        <Route path='/topics' element={<TopicListPage/>} />
        <Route path='/add-article' element={< AddArticlePage/>} />
      </Routes>
    </>
  );
}

export default App;
