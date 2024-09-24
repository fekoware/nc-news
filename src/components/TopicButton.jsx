import { Link } from "react-router-dom";

export const TopicButton = ({ topic }) => {
  const topicSlug = topic.slug;

  return (
    <div class='pl-4 pr-4'> 
    <Link to={`/articles/${topicSlug}`}>
      <button>{topic.slug}</button>
    </Link>
    </div>
  );
};