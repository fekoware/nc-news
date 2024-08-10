import { Link } from "react-router-dom";

export const TopicButton = ({ topic }) => {
  const topicSlug = topic.slug;

  return (
    <Link to={`/articles/${topicSlug}`}>
      <button>{topic.slug}</button>
    </Link>
  );
};