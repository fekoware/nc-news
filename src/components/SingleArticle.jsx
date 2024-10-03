import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchArticleById, updateVotesByArticleId } from "../api";
import { Link } from "react-router-dom";
import { ArticleCommentsList } from "./ArticleCommentsList";
import { Users } from "./Users";
import { TopicsList } from "./TopicsList";
import { formatDistanceToNow } from "date-fns";
import { CommentForm } from "./CommentForm";


export const SingleArticle = () => {
  const { article_id, topicSlug } = useParams();
  const [article, setArticle] = useState("");
  const [count, setCount] = useState(0);
  const [error, setError] = useState(false);
  const [comments, setComments] = useState("");
  const [username, setUsername] = useState("jessjelly");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchArticleById(article_id).then((data) => {
      setIsLoading(false)
      setArticle(data);
    });
  }, [article_id, comments]);

  const incrementCount = (increment) => {
    setCount((currCount) => {
      setError(null);
      return currCount + increment;
    });

    updateVotesByArticleId(article.article_id, increment).catch((err) => {
      //if unable to increment conditional rendering
      setCount((currCount) => {
        setError("Like unsuccesful, try again");
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
      <div className="flex items-center justify-center w-full p-5 bg-red-500">
        <TopicsList />
     
      </div>

      <div className="grid grid-cols-1 lg:w-1/2 mx-auto">
        <Link className="w-full text-left" to={`/articles/${topicSlug}`}>
          <p className="text-lg">Back</p>
        </Link>

        <p className="text-3xl font-bold">{article.title}</p>

        <img
          className="w-64 h-64 object-cover"
          src={article.article_img_url}
          alt={article.title}
        />
        {/*  */}

        
        <p class="font-bold text-2xl pb-1">{article.author}</p>

        <p className="text-left py-2 text-lg">{article.body}</p>

        <div className="flex w-full py-1">
          {/*  */}
       
          {/*  */}
          <div className="flex flex-wrap justify-end w-full">
            <p class="flex w-full justify-end">{article.topic}</p>
            <p className="flex flex-wrap justfify-end"> {article.created_at}</p>
          </div>
          {/*  */}
        </div>

        <div className="flex flex-col items-start">
          <button
            onClick={() => incrementCount(1)}
            class="bg-green-700 w-full text-white px-4 py-2  transition-opacity duration-200 ease-in-out hover:opacity-80 active:opacity-100 my-2"
          >
            Like Article
          </button>
          <button
            class="bg-red-500 w-full text-white px-4 py-2  transition-opacity duration-200 ease-in-out hover:opacity-80 active:opacity-100"
            onClick={() => incrementCount(-1)}
          >
            Remove Like
          </button>
          {error && <p>{error}</p>}
        </div>

        <div class="flex flex-wrap w-full  justify-start">
            <p class="flex w-full">{article.comment_count} comments</p>
            <p class="flex w-full ">{article.votes + count} likes</p>
          </div>

        <CommentForm
          username={username}
          setUsername={setUsername}
          article={article}
          key={article.article_id}
          comments={comments}
          setComments={setComments}
        />
        
        

        <div >
          <p class='w-full font-bold text-lg'> Comments</p>
          <ArticleCommentsList
            username={username}
            setUsername={setUsername}
            comments={comments}
            setComments={setComments}
          />
        </div>

      
      </div>
    </div>
  );
};
