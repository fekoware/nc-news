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
      return response.data.article.votes;
    });
};

export const fetchUsers = () => {
  return apiClient
    .get("/users")
    .then((response) => {
      return response.data.users;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const postComment = (article_id, username, body) => {
  const commentObj = {
    username: username,
    body: body,
  };

  return apiClient
    .post(`/articles/${article_id}/comments`, commentObj)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteComment = (comment_id) => {
  const commentObj = {
    comment_id: comment_id,
  };
  console.log(comment_id, "inside api");

  return apiClient
    .delete(`/comments/${comment_id}`, comment_id)
    .then((response) => {
      console.log(comment_id, "inside axios");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchTopics = () => {
  return apiClient.get(`/topics`).then((response) => {
    return response.data.topics;
  });
};
/*

viewing articles by topic
sit as a child of articles list. 

button of different topics on home screen

when a button if pressed, articles are filtered by the button
seperate page for this


route topic element article list

function get articles by topic
  topic will be passed in as an argument
  fetch all articles
  create an empty array
  if srticle topic matches arguement passsed in, push object into array
  return this new array


  where will this sit? on articles page

*/
