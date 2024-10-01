import { postTopic } from "../api";
import { useState } from "react";

export const TopicForm = () => {
  const [slugInput, setSlugInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");

  const handleSlugChange = (event) => {
    setSlugInput(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescriptionInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    postTopic(slugInput, descriptionInput).then((data) => {
      console.log(data);
    });
  };

  return (
    <div class='flex flex-wrap w-full justify-center'> 
    <form onSubmit={handleSubmit} class="grid grid-cols-1 lg:w-1/2 w-full place-items-center gap-4">

  <label class="flex justify-left w-full text-center">Topic:</label>
  <input
    class="w-full border-green-800 border-2 mx-auto"
    onChange={handleSlugChange}
    value={slugInput}
  />

  <label class="flex justify-left w-full text-center">Description:</label>
  <input
    class="w-full border-green-800 border-2 mx-auto"
    onChange={handleDescriptionChange}
    value={descriptionInput}
  />

  <button type="submit" class="bg-green-700 w-full text-white px-4 py-2  transition-opacity duration-200 ease-in-out hover:opacity-80 active:opacity-100 my-2">Post Topic</button>

</form>
</div>
  );
};

/*

addtopic fucntion

paramters - topic, and descripion
will take the form then post to database topic and description

then topics will have a state that rerenders with each topic added

functions needed for this

handle change of the topic so it can be reflected in the ui

handle change of the description so it can be reflected in the ui


handle submit that will post the data to the databaase

*/
