import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  article: [],
};

export const ArticleReducer = createSlice({
  name: "ArticleReducer",
  initialState,
  reducers: {
    getArticle: (state, action) => {
      state.article = [...state.article, ...action.payload];
    },
  },
});

export const makeArticle = (data, file) => {
  return async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    console.log(data);
    try {
      const res = await axios.post(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog`,
        {
          data: data,
          file: file,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Blog Sudah Masuk");
      // document.location.href = "/profile";
    } catch (error) {
      alert(error);
    }
  };
};

export const { getArticle } = ArticleReducer.actions;

export default ArticleReducer.reducer;
