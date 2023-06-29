import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  article: [],
  urLike: [],
};

export const ArticleReducer = createSlice({
  name: "ArticleReducer",
  initialState,
  reducers: {
    getArticle: (state, action) => {
      state.article = [...action.payload];
    },
    setUrLike: (state, action) => {
      state.urLike = [...action.payload];
    },
  },
});

export const makeArticle = (data, file) => {
  return async () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    console.log(data);
    formData.append("data", JSON.stringify(data));
    formData.append("file", file);

    try {
      const res = await axios.post(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog`,
        formData,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Berhasil Menulis Blog");
      document.location.href = "/";
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const likeArticle = (articleId) => {
  return async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog/like`,
        {
          BlogId: articleId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("article sudah di like");
    } catch (error) {
      alert(error.response.data.err);
    }
  };
};

export const dislikeArticle = (articleId) => {
  return async () => {
    const token = localStorage.getItem("token");
    console.log(articleId);

    try {
      const res = await axios.post(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog/unlike/2`,
        {
          BlogId: articleId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("article sudah di dislike");
    } catch (error) {
      console.log(error.response);
      alert(error.response.data);
    }
  };
};

export const getArticleNew = (id, title) => {
  return async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog?sortBy=title&size=20&search=${title}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const { getArticle, setUrLike } = ArticleReducer.actions;

export default ArticleReducer.reducer;
