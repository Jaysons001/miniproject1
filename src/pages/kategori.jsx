import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Articlecard from "../component/article/articlecard";
import { Pagination } from "../component/article/pagination";
import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { BsNewspaper } from "react-icons/bs";
import { ImageCarosel } from "../component/sliderforcarosel";

export const Kategori = () => {
  const url = window.location.href.split("/");
  const kategori = url[url.length - 1];
  const [article, setArticle] = useState([]);
  const [page, setPage] = useState(1);
  const [index, setIndex] = useState(1);
  const [articleFav, setArticleFav] = useState([]);
  const [cat, setCat] = useState("");

  useEffect(() => {
    fetchData();
  }, [index]);

  useEffect(() => {
    fetchDataLike();
  }, []);

  console.log(article);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog?id_cat=${kategori}&sort=DESC&page=${index}`
      );
      setArticle(response.data.result);
      setPage(response.data.page);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDataLike = async () => {
    try {
      const response = await axios.get(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog/pagFav?orderBy=total_fav&size=3&id_cat=${kategori}&sort=DESC`
      );
      setArticleFav(response.data.result);
      setCat(response.data.result[0].Category.name);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <Stack
      align={"left"}
      margin={"auto"}
      width={"750px"}
      gap={"20px"}
      mt={"50px"}
    >
      <Heading>Artikel Populer di {cat} </Heading>
      <Box mx={"auto"} width={"750px"} height={"375px"}>
        <ImageCarosel url={articleFav} />
      </Box>
      <Flex alignItems="center">
        <Box mx="10px">
          <BsNewspaper size={"20px"} color="red" />
        </Box>
        <Text
          padding="0 10px 0 2px"
          color={"red.600"}
          fontFamily={"Arial, sans-serif"}
          fontWeight={"bold"}
        >
          Latest Post di {cat}
        </Text>
        <Box flex="1" borderBottom={"1px solid red"} />
      </Flex>
      {article &&
        article.map((article) => (
          <Articlecard key={article.id} article={article} />
        ))}
      <Pagination page={page} index={index} setIndex={setIndex} />
    </Stack>
  );
};
