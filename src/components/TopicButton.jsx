import { Link } from "react-router-dom";

export const TopicButton = ({ topic }) => {
  const topicSlug = topic.slug;
  console.log(topicSlug)
  return (

    <Link to={`/articles/${topicSlug}`}>
      <button class=" px-4 text-white hover:underline">{topic.slug}</button>
    </Link>

  );
};