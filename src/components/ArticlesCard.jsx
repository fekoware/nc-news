import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

import { useParams } from "react-router-dom";

export const ArticlesCard = ({ article }) => {
  const { topicSlug } = useParams();

  return (
    <div class=" flex flex-wrap items-center  my-4">
      <li key={article.article_id}>
        <img
          class={
            "transition duration-300 ease-in-out filter brightness-100 hover:brightness-110 border-b-4 border-transparent hover:border-red-500 ${isClicked ? 'border-red-500' : 'border-transparent'} "
          }
          src={article.article_img_url}
        />

        <p class="text-md font-bold">{article.title} </p>
        <p> {article.body.split(" ").slice(0, 10).join(" ")}...</p>

        <div class="flex w-full pt-3 text-sm ">
          <div class="flex flex-wrap w-full  justify-start">
            <p class="flex w-full">{article.comment_count} comments </p>
            <p class="flex w-full ">{article.votes} likes </p>
          </div>

          <div class="flex flex-wrap w-full justify-end">
            <p class="flex w-full justify-end">{article.topic}</p>
            <p class=" flex w-full justify-end">
              {formatDistanceToNow(new Date(article.created_at), {
                addSuffix: true,
              })}{" "}
            </p>
          </div>
        </div>

        <Link to={`/articles/${article.topic}/${article.article_id}`}>
          <button class="bg-red-500 w-full text-white px-4 py-2  transition-opacity duration-200 ease-in-out hover:opacity-80 active:opacity-100">
            {" "}
            View
          </button>
        </Link>
      </li>
    </div>
  );
};
