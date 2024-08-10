import { useState } from "react";
import { useEffect } from "react";
import { fetchTopics } from "../api";
import { TopicButton } from "./TopicButton";
import { Link } from "react-router-dom";

export const TopicsList = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetchTopics().then((data) => {
      setTopics(data);
    });
  }, []);

  return (
    <ul>
      <li>
        <Link to='/articles'> <button>all</button></Link>

        {topics.map((topic) => {
          return <TopicButton topic={topic} key={topic.slug} />;
        })}
      </li>
    </ul>
  );
};
