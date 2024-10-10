// TopicsList.js
import { useState } from "react";
import { useEffect } from "react";
import { fetchTopics } from "../api";
import { TopicButton } from "./TopicButton";
import { fetchArticles } from "../api";

export const TopicsList = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetchTopics().then((data) => {
      setTopics(data);
    });


  }, [topics]);

  return (
    <div className="flex flex-wrap ">
      <ul className="flex  text-white  flex-wrap">
        {topics.map((topic) => {
          return (
            <li key={topic.slug} > |
              <TopicButton topic={topic} />
              
            </li>
          );
        })}
        |
      </ul>
    </div>
  );
};
