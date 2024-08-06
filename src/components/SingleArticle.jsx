import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { fetchArticleById } from "../api";
import { Link } from "react-router-dom";
import { ArticleCommentsList } from "./ArticleCommentsList";
import '../css/SingleArticle.css'

export const SingleArticle = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState("");
  console.log(article_id, "HELLO");

  useEffect(() => {
    fetchArticleById(article_id).then((data) => {
        setArticle(data)
    })
  }, [article_id]);

  return (
    <>
    <Link to='/'>Go Back</Link>
    <img src={article.article_img_url} />
    <p>{article.author}</p>
    <p>{article.topic}</p>
    <p>{article.votes} likes </p>
    <p>{article.category} </p>
    <p>{article.created_at} </p>
    <p>{article.comment_count} comments </p>
    <p>{article.title} </p>
    <p>{article.body} </p>
    <ArticleCommentsList/>

    <p> View other articles - links of other articles to be placed here</p>


    </>

    
  )
};
