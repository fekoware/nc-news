import axios from "axios";
import { SingleArticle } from "./components/SingleArticle";
import { comment } from "postcss";

const apiClient = axios.create({
  baseURL: "https://nc-news-be-1.onrender.com/api",
});

export const fetchArticles = (params = {}) => {
  return apiClient
    .get("/articles", { params })

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

export const postComment = (username, body, article_id) => {
  const commentObj = {
    article_id: article_id,
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

export const postTopic = (slug, description) => {
  const topicObj = {
    slug: slug,
    description: description,
  };

  return apiClient
    .post("/topics", topicObj)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postArticle = (
  username,
  title,
  body,
  topic,
  article_img_url = null
) => {
  if (article_img_url === "" || !article_img_url.includes("https://")) {
    article_img_url = `https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=700&h=700`;
  }

  const articleObj = {
    author: username,
    title: title,
    body: body,
    topic: topic,
    article_img_url: article_img_url,
  };
  console.log(articleObj);

  return apiClient
    .post("/articles", articleObj)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteArticle = (article_id) => {
  const articleObj = {
    article_id: article_id,
  };
  console.log(article_id, "inside api");

  return apiClient
    .delete(`/articles/${article_id}`, article_id)
    .then((response) => {
      console.log(article_id, "inside axios");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateCommentVotes = (votes, article_id, comment_id) => {
  
console.log(article_id,votes, comment_id)

  return apiClient
    .patch(`/articles/${article_id}/comments/${comment_id}`, votes)
    .then((response) => {
      console.log(response.data.article.votes, "comment increment");
      return response.data.article.votes;
    }).catch((err) => {
      console.log(err)
    });
};
