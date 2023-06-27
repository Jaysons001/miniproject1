import { Box, Card, Flex, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsNewspaper } from "react-icons/bs";
import Articlecard from "./articlecard";
import axios from "axios";
import { Pagination } from "./pagination";
import { useSelector } from "react-redux";

export const Article = () => {
  const [article, setArticle] = useState([]);
  const [index, setIndex] = useState(1);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchData();
  }, [index]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog?sort=DESC&page=${index}`
      );
      setArticle(response.data.result);
      setPage(response.data.page);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Stack align={"left"} margin={"auto"} width={"750px"} gap={"20px"}>
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
