import { TopicsList } from "./TopicsList";
import { useState } from "react";
import { postArticle } from "../api";
import { TopicForm } from "./TopicForm";

export const ArticleForm = ({ username }) => {
  const [titleInput, setTitleInput] = useState("");
  const [bodyInput, setBodyInput] = useState("");
  const [imageURL, setImageURL] = useState("");


  const [topicInput, setTopicInput] = useState("");

  const handleTitleChange = (event) => {
    setTitleInput(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBodyInput(event.target.value);
  };

  const handleURLChange = (event) => {
    setImageURL(event.target.value);
  };

  const handleTopicChange = (event) => {
    setTopicInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    postArticle(username, titleInput, bodyInput, topicInput, imageURL)
      .then((data) => {

        console.log(username, titleInput, bodyInput, topicInput, imageURL)
        console.log("Article posted:", data);
      })
      .catch((err) => {
        console.log("Error posting article:", err);
      });

      setTitleInput("");
      setBodyInput("");
      setTopicInput("");
      setImageURL("");
  };

  return (
    <div>
      <div className="flex items-center justify-center w-full p-5 bg-red-500">
        <TopicsList />
      </div>

      <div className="flex flex-wrap w-full justify-center">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:w-1/2 w-full place-items-center gap-4"
        >
          <label className="flex justify-left w-full text-center">Title:</label>
          <input
            className="w-full border-green-800 border-2 mx-auto"
            onChange={handleTitleChange}
            value={titleInput}
          />

          <label className="flex justify-left w-full text-center">
            Article Body:
          </label>
          <input
            className="w-full border-green-800 border-2 mx-auto"
            onChange={handleBodyChange}
            value={bodyInput}
          />

          <label className="flex justify-left w-full text-center">
            Image URL (optional):
          </label>
          <input
            className="w-full border-green-800 border-2 mx-auto"
            onChange={handleURLChange}
            value={imageURL}
          />


          <label>Topic:</label>
          <select onChange={handleTopicChange} value={topicInput}>
            <option value="">Select Topic</option>
            <option value="cooking">cooking</option>
            <option value="topic2">Topic 2</option>
          </select>

          <button
            type="submit"
            className="bg-green-700 w-full text-white px-4 py-2 transition-opacity duration-200 ease-in-out hover:opacity-80 active:opacity-100 my-2"
          >
            Post Article
          </button>
        </form>
      </div>
    </div>
  );
};
