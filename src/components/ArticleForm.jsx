import { TopicsList } from "./TopicsList";
import { useState } from "react";
import { postArticle } from "../api";

export const ArticleForm = ({ username }) => {
  const [titleInput, setTitleInput] = useState("");
  const [bodyInput, setBodyInput] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [topicInput, setTopicInput] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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

  const handleInputResize = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!titleInput || !bodyInput || !topicInput) {
      setError("Title, Body, and Topic must not be empty.");
      setSuccessMessage(""); // Clear success message if there's an error
      return;
    }

    setError("");

    postArticle(username, titleInput, bodyInput, topicInput, imageURL)
      .then((data) => {
        console.log("Article posted:", data);
        setSuccessMessage("Article has been successfully posted!"); 
        setTitleInput("");
        setBodyInput("");
        setTopicInput("");
        setImageURL("");
      })
      .catch((err) => {
        console.log("Error posting article:", err);
        setError("Failed to post the article. Please try again."); 
      });
  };

  return (
    <div>
      <div className="flex flex-wrap w-full justify-center p-4">
        <form onSubmit={handleSubmit} className="w-full lg:w-1/2">
          <label className="w-full font-bold text-lg mb-2 block">Title</label>
          <input
            className="w-full border-2 border-blue-500 p-2 mb-4 rounded-lg"
            onChange={handleTitleChange}
            value={titleInput}
            placeholder="Article Title"
          />

          <label className="w-full font-bold text-lg mb-2 block">Body</label>
          <textarea
            className="w-full border-2 border-blue-500 p-2 mb-4 rounded-lg resize-none overflow-hidden"
            onChange={handleBodyChange}
            value={bodyInput}
            rows="4"
            onInput={handleInputResize}
            placeholder="Article Body"
          />

          <label className="w-full font-bold text-lg mb-2 block">
            Image URL (optional)
          </label>
          <input
            className="w-full border-2 border-blue-500 p-2 mb-4 rounded-lg"
            onChange={handleURLChange}
            value={imageURL}
            placeholder="Image URL"
          />

          <label className="w-full font-bold text-lg mb-2 block">Topic</label>
          <select
            className="w-full border-2 border-blue-500 p-2 mb-4 rounded-lg"
            onChange={handleTopicChange}
            value={topicInput}
          >
            <option value="" disabled hidden>Select Topic</option>
            <option value="cooking">Cooking</option>
            <option value="football">Football</option>
            <option value="coding">Coding</option>
          </select>

          {error && (
            <p className="text-red-600 mb-4">{error}</p>
          )}
          {successMessage && (
            <p className="text-green-600 mb-4">{successMessage}</p> 
          )}

          <button
            type="submit"
            className="bg-blue-500 w-full text-white font-semibold px-4 py-2 mb-10 rounded-md transition-opacity duration-200 ease-in-out hover:opacity-80 active:opacity-100"
          >
            Post Article
          </button>
        </form>
      </div>
    </div>
  );
};
