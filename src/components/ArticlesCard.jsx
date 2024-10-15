import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { deleteArticle } from "../api";

export const ArticlesCard = ({ username, article }) => {
  const { topicSlug } = useParams();
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = (event) => {
    event.preventDefault();
    deleteArticle(article.article_id)
      .then(() => {
        setIsDeleted(true);
        setTimeout(() => setIsDeleted(false), 3000);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="flex flex-col w-full items-center my-4">
      {!isDeleted ? (
        <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <img
            className="transition duration-300 ease-in-out w-full object-cover filter brightness-100 hover:brightness-110"
            src={article.article_img_url}
            alt={article.title}
          />

          <div className="p-4">
            <h2 className="text-md font-bold mb-2">{article.title}</h2>
            <p className="text-gray-700 mb-2">
              {article.body.split(" ").slice(0, 10).join(" ")}...
            </p>

            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <p>{article.comment_count} comments</p>
              <p>{article.votes} likes</p>
            </div>

            <div className="flex justify-between text-sm text-gray-600">
              <p>{article.topic}</p>
              <p>
                {formatDistanceToNow(new Date(article.created_at), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>

          <div className="p-2 flex w-full flex-col justify-center space-y-2">
            <Link to={`/articles/${article.topic}/${article.article_id}`}>
              <button className="flex bg-red-500 text-white w-full py-2 rounded transition-opacity duration-200 justify-center ease-in-out hover:opacity-80">
                View
              </button>
            </Link>

            {username === article.author && (
              <form>
                <button
                  className="bg-red-500 text-white w-full px-4 py-2 rounded transition-opacity duration-200 ease-in-out hover:opacity-80"
                  type="submit"
                  onClick={handleDelete}
                >
                  Delete Article
                </button>
              </form>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full p-4">
          <p>Article has been deleted.</p>
        </div>
      )}
    </div>
  );
};
