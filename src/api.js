import axios from "axios";

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
    return apiClient.get(`/articles/${article_id}`).then((response) => {
        return response.data.article
    }).catch((err) => {
        console.log(err)
    })
}