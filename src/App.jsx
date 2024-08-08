
import { Header } from "./components/Header";
import { ArticlesList } from "./components/ArticlesList";
import { Routes, Route } from "react-router-dom"
import { SingleArticle } from "./components/SingleArticle";
import { ArticlesCard } from "./components/ArticlesCard";
import { Users } from "./components/Users";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/users' element={<Users />}/>
        <Route path='/' element={<ArticlesList/>}/>
        <Route path='/:article_id' element={<SingleArticle/>} />
      </Routes>
    </>
  );
}

export default App;
