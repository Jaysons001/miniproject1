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

export const makeArticle = (data, file, toast) => {
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
      toast({
        title: "Berhasil Menulis Artikel",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        document.location.href = "/";
      }, 2000);
    } catch (error) {
      toast({
        title: "Gagal Menulis, Silahkan dilengkapi",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };
};

export const likeArticle = (articleId, toast) => {
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
      toast({
        title: "Artikel Disukai",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Ada yang salah",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };
};

export const dislikeArticle = (articleId, toast) => {
  return async () => {
    const token = localStorage.getItem("token");
    console.log(articleId);

    try {
      const res = await axios.delete(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog/unlike/${articleId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast({
        title: "article sudah di dislike",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "article tidak bisa di dislike",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
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
