import { Link } from "react-router-dom"
import "../css/ArticlesCard.css"

export const ArticlesCard = ({article}) => {
    

  return (
    
    <li className='article-card'key={article.article_id}>
        
    <Link to={`/${article.article_id}`}>
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