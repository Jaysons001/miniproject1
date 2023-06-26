import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Articlecard from "../component/article/articlecard";
import { Pagination } from "../component/article/pagination";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { BsNewspaper } from "react-icons/bs";

export const Kategori = () => {
  const url = window.location.href.split("/");
  const kategori = url[url.length - 1];
  const [article, setArticle] = useState([]);
  const [page, setPage] = useState(1);
  const [index, setIndex] = useState(1);

  useEffect(() => {
    fetchData();
  }, [index]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog?id_cat=${kategori}&sort=ASC&page=${index}`
      );
      setArticle(response.data.result);
      setPage(response.data.page);
      console.log(response.data);
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
          Latest Post
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
