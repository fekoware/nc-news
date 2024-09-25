// TopicsList.js
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
    <div className="flex flex-wrap ">
      <ul className="flex flex-wrap">
        {topics.map((topic) => {
          return (
            <li key={topic.slug} >
              <TopicButton topic={topic} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
