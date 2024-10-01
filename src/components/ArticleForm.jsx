import { TopicsList } from "./TopicsList";
export const ArticleForm = () => {
  return (
    <div>
      <div className="flex items-center justify-center w-full p-5 bg-red-500">
        <TopicsList />
      </div>

<form>
      <label> Title</label>
      <input />

      <label>Body</label>
      <input />

      <label> Image</label>
      <input />

      </form>
    </div>
  );
};
