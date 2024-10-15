import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchArticleById, updateVotesByArticleId } from "../api";
import { Link } from "react-router-dom";
import { ArticleCommentsList } from "./ArticleCommentsList";
import { formatDistanceToNow } from "date-fns";
import { CommentForm } from "./CommentForm";

export const SingleArticle = ({ username }) => {
  const { article_id, topicSlug } = useParams();
  const [article, setArticle] = useState("");
  const [count, setCount] = useState(0);
  const [error, setError] = useState(false);
  const [comments, setComments] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchArticleById(article_id).then((data) => {
      setIsLoading(false);
      setArticle(data);
    });
  }, [article_id, comments]);

  const incrementCount = (increment) => {
    setCount((currCount) => {
      setError(null);
      return currCount + increment;
    });

    updateVotesByArticleId(article.article_id, increment).catch(() => {
      setCount((currCount) => {
        setError("Like unsuccessful, try again");
        return currCount - increment;
      });
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center space-y-4">
        <h1 className="text-xl font-bold">Loading Article...</h1>
        <div className="w-16 h-16 border-8 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 w-full justify-center">
      <div className="grid grid-cols-1 lg:w-1/2 mx-auto p-4 bg-white rounded-md shadow-sm border border-gray-200">
        <Link className="w-full text-left mb-4" to={`/articles/${topicSlug}`}>
          <p className="text-lg hover:underline">
            {"< "}Back 
          </p>
        </Link>

        <p className="text-3xl font-bold mb-2">{article.title}</p>

        <img
          className="w-full object-cover rounded-lg mb-4"
          src={article.article_img_url}
          alt={article.title}
        />

        <p className="font-bold text-2xl mb-2">{article.author}</p>

        <div className="flex justify-between w-full mb-4 text-gray-500 text-sm">
          <p>{article.topic}</p>
          <p>
            {formatDistanceToNow(new Date(article.created_at), {
              addSuffix: true,
            })}
          </p>
        </div>

        <p className="text-left py-2 text-lg text-gray-700">{article.body}</p>

        <div className="flex justify-between items-center py-4">
          <p className="font-bold text-gray-700">{article.votes + count} likes</p>
        </div>

        <div className="flex flex-col items-start space-y-2 mb-6">
          <button
            onClick={() => incrementCount(1)}
            className="bg-green-700 w-full text-white font-semibold px-4 py-2 rounded-md transition-opacity duration-200 ease-in-out hover:opacity-80 active:opacity-100"
          >
            Like Article
          </button>
          <button
            className="bg-red-500 w-full text-white font-semibold px-4 py-2 rounded-md transition-opacity duration-200 ease-in-out hover:opacity-80 active:opacity-100"
            onClick={() => incrementCount(-1)}
          >
            Remove Like
          </button>
          {error && <p className="text-red-600">{error}</p>}
        </div>

        <hr className="border-t-2 border-gray-300 mb-6" />

        <CommentForm
          username={username}
          article={article}
          key={article.article_id}
          comments={comments}
          setComments={setComments}
        />

        <div className="pt-6">
          <p className="w-full font-bold text-lg mb-4">
            {article.comment_count} Comments
          </p>
          <ArticleCommentsList
            username={username}
            comments={comments}
            setComments={setComments}
          />
        </div>
      </div>
    </div>
  );
};
