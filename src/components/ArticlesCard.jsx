import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";

export const ArticlesCard = ({ article }) => {
  const { topicSlug } = useParams();

  return (
    <div class=' hover:underline my-4'>
      <li  key={article.article_id}>
        
          <img class={"transition duration-300 ease-in-out filter brightness-100 hover:brightness-110 border-b-4 border-transparent hover:border-red-500 ${isClicked ? 'border-red-500' : 'border-transparent'} "}  src={article.article_img_url} />
          <p>{article.author}</p>
          <p>{article.title} </p>
          <p>{article.topic}</p>
          <p>{article.votes} likes </p>
          <p>{article.category} </p>
          <p>{article.created_at} </p>
          <p>{article.comment_count} comments </p>
          <Link to={`/articles/${article.topic}/${article.article_id}`}>
          <button  className="bg-red-500 w-full text-white px-4 py-2  transition-opacity duration-200 ease-in-out hover:opacity-80 active:opacity-100" > View</button>
        </Link>
      </li>
    </div>
  );
};
