
import { Header } from "./components/Header";
import { ArticlesList } from "./components/ArticlesList";
import { Routes, Route } from "react-router-dom"
import { SingleArticle } from "./components/SingleArticle";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<ArticlesList/>}/>
        <Route path='/:article_id' element={<SingleArticle/>} />
      </Routes>
    </>
  );
}

export default App;
