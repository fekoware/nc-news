import axios from "axios";
import { SingleArticle } from "./components/SingleArticle";

const apiClient = axios.create({
  baseURL: "https://nc-news-3wpg.onrender.com/api",
});

export const fetchArticles = (params = {}) => {

  return apiClient
    .get("/articles", { params })
    
    .then((response) => {
    
      console.log(params, "fetch artiles")
      console.log(response.data.articles)
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
    description: description
  }

  return apiClient.post('/topics', topicObj).then((response) => {
    console.log(response.data)
    return response.data
  }).catch((err) => {
    console.log(err)
  })
}


export const postArticle = (author, title, body, topic, article_img_url = null) => {
  const articleObj = {
    author: author,
    title: title,
    body: body,
    topic: topic,
    article_img_url: article_img_url
  }

  return apiClient.post('/articles', articleObj).then((response) => {
    console.log(reponse.data)
    return response.data
  }).catch((err) => {
    console.log(err)
  })
}
