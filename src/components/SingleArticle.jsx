import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { fetchArticleById } from "../api";

export const SingleArticle = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState("");
  console.log(article_id, "HELLO");

  useEffect(() => {
    fetchArticleById(article_id).then((data) => {
        console.log(data)
        setArticle(data)
        console.log(article)
    })
  }, [article_id]);

  return (
    <>
    <img src={article.article_img_url} />
    <p>{article.author}</p>
    <p>{article.title} </p>
    <p>{article.topic}</p>
    <p>{article.votes} likes </p>
    <p>{article.category} </p>
    <p>{article.created_at} </p>
    <p>{article.comment_count} comments </p>

    <p> View other articles - links of other articles to be placed here</p>


    </>

    
  )
};
