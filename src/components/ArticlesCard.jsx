import { Link } from "react-router-dom"
import "../css/ArticlesCard.css"
import { useParams } from "react-router-dom";

export const ArticlesCard = ({article}) => {
  const { topicSlug } = useParams();
    

  return (
    
    <li className='article-card'key={article.article_id}>
        
    <Link to={`/articles/${article.topic}/${article.article_id}`}>
   <img src={article.article_img_url} />
   <p>{article.author}</p>
   <p>{article.title} </p>
   <p>{article.topic}</p>
   <p>{article.votes} likes </p>
   <p>{article.category} </p>
   <p>{article.created_at} </p>
   <p>{article.comment_count} comments </p>
   </Link>
 </li>

    
  )

  

}