import { Box, Heading } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Articlecard from "../component/article/articlecard";
import { Pagination } from "../component/article/pagination";
import { useSelector } from "react-redux";

export const Artikelsuka = () => {
  const [index, setIndex] = useState(1);
  const [page, setPage] = useState(0);
  const [likeArticle, setLikeArticle] = useState([]);
  const { article } = useSelector((state) => state.articleReducer);
  console.log(article);
  const fetchData = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog/pagLike?page=${index}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data.result);
      setLikeArticle(res.data.result);
      setPage(res.data.page);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box>
      <Heading>Ini Artikel Kesukaanmu</Heading>
      {article &&
        article.map((item) =>
          item.id === article.BlogId ? (
            <Articlecard key={item.id} article={item} />
          ) : null
        )}
    </Box>
  );
};
