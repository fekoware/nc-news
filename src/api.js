import axios from "axios";
import { SingleArticle } from "./components/SingleArticle";

const apiClient = axios.create({
  baseURL: "https://nc-news-3wpg.onrender.com/api",
});

export const fetchArticles = () => {
  return apiClient
    .get("/articles")
    .then((response) => {
      return response.data.articles;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchArticleById = (article_id) => {
  return apiClient
    .get(`/articles/${article_id}`)
    .then((response) => {
      return response.data.article;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchCommentsByArticleId = (article_id) => {
  return apiClient
    .get(`/articles/${article_id}/comments`)
    .then((response) => {
      return response.data.comments;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateVotesByArticleId = (article_id, votes) => {
  const voteObj = {
    vote: votes,
  };

  return apiClient
    .patch(`/articles/${article_id}`, voteObj)
    .then((response) => {
      console.log(response.data.article.votes, "from api prmoise");
      return response.data.article.votes;
    });
};
