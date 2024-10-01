import { TopicsList } from "./TopicsList";
import { useState } from "react";

export const ArticleForm = () => {
  const [titleInput, seTitleInput] = useState("");
  const [bodyInput, setBodyInput] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [topics, setTopics] =useState("");

  const handleTitleChange = (event) => {
    seTitleInput(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBodyInput(event.target.value);
  };

  const handleURLChange = (event) => {
    setBodyInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    postArticle(slugInput, descriptionInput)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="flex items-center justify-center w-full p-5 bg-red-500">
        <TopicsList />
      </div>

      <div class="flex flex-wrap w-full justify-center">
        <form
          onSubmit={handleSubmit}
          class="grid grid-cols-1 lg:w-1/2 w-full place-items-center gap-4"
        >
          <label class="flex justify-left w-full text-center">Title:</label>
          <input
            class="w-full border-green-800 border-2 mx-auto"
            onChange={handleTitleChange}
            value={titleInput}
          />

          <label class="flex justify-left w-full text-center">
            Article Body:
          </label>
          <input
            class="w-full border-green-800 border-2 mx-auto"
            onChange={handleBodyChange}
            value={bodyInput}
          />

          <label class="flex justify-left w-full text-center">
            Image URL (optional):
          </label>
          <input
            class="w-full border-green-800 border-2 mx-auto"
            onChange={handleURLChange}
            value={imageURL}
          />

          <label> Topic </label>

          <select>
            <option> Select Topic</option>

          </select>

          <button
            type="submit"
            class="bg-green-700 w-full text-white px-4 py-2  transition-opacity duration-200 ease-in-out hover:opacity-80 active:opacity-100 my-2"
          >
            Post Article
          </button>
        </form>
      </div>
    </div>
  );
};
